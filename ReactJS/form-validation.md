# Form Validation in React

Form validation ensures user input is accurate and complete before it is processed or sent to a server. There are two main routes:

1. **Native / state-based** — plain React hooks, no dependencies.
2. **Library-based** — React Hook Form + a schema validator (Zod). Scales better for production apps.

> **Rule zero:** client-side validation is a UX feature, not a security feature. Anyone can bypass it with curl or devtools. **Always re-validate on the server.**

---

## Method 1: Native State-Based Validation

Uses `useState` to track form data and its associated errors.

```jsx
import { useState } from 'react';

export default function SimpleForm() {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [errors, setErrors] = useState({});

  // 1. Update state as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Use the functional updater — avoids stale state when
    // several updates are batched in the same tick.
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Validate rules manually
  const validate = () => {
    const tempErrors = {};

    if (!formData.username.trim()) {
      tempErrors.username = 'Username is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Email format is invalid';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 3. Handle submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted Successfully:', formData);
      // Proceed with API call
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Two fixes worth internalising

**`noValidate` on the `<form>`** — without it the browser's own validation popups fire first and fight with your custom messages. Turn the native layer off when you own the error UI.

**Functional `setState`** — `setFormData({ ...formData, [name]: value })` closes over `formData` from the current render. It works for typing in one field, but breaks the moment two updates land in the same tick. `setFormData(prev => ({ ...prev, [name]: value }))` always reads the latest value.

---

## Validation Timing: the `touched` problem

The code above only validates on submit. If you validate on every keystroke instead, the user sees *"Email is required"* the instant they focus the field — before they've typed anything. That is hostile.

The standard fix is a **`touched`** map: only show an error once the user has left the field.

```jsx
const [touched, setTouched] = useState({});

const handleBlur = (e) => {
  setTouched((prev) => ({ ...prev, [e.target.name]: true }));
};

// in JSX
<input name="email" onChange={handleChange} onBlur={handleBlur} />
{touched.email && errors.email && <p>{errors.email}</p>}
```

The behaviour people actually expect:

| Stage | Validate? | Show error? |
|---|---|---|
| While typing, field never blurred | no | no |
| On blur | yes | yes |
| While typing, **after** first error shown | yes (re-validate live) | yes — clears as they fix it |
| On submit | validate everything | show everything, focus the first bad field |

React Hook Form calls this `mode: 'onTouched'`, and it is the sane default.

---

## Method 2: Industry Standard (React Hook Form + Zod)

React Hook Form keeps inputs **uncontrolled** and subscribes to them via refs, so typing in one field does not re-render the whole form. Zod supplies the rules as a schema.

### Install

```bash
npm install react-hook-form zod @hookform/resolvers
```

### Code

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

export default function OptimizedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    console.log('Validated Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <input {...register('username')} placeholder="Username" />
        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
      </div>

      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
```

> **Zod version note:** in Zod 4 the string formats moved to the top level — `z.email()`, `z.url()`, `z.uuid()` — and `z.string().email()` is deprecated (still functional). If you're on Zod 3, keep the chained form. Check your `package.json` before copying either style around.

---

## `formState` — the flags you'll actually use

`useForm` returns far more than `errors`:

| Flag | Meaning | Typical use |
|---|---|---|
| `errors` | current error map | render messages |
| `isSubmitting` | async submit in flight | disable the button, show a spinner |
| `isValid` | whole form passes | disable submit up front (needs `mode: 'onChange'` or `'onTouched'`) |
| `isDirty` | anything changed from defaults | "unsaved changes" guard, disable Save on an edit form |
| `dirtyFields` | which fields changed | send a PATCH with only the changed keys |
| `touchedFields` | which fields were blurred | custom display logic |
| `submitCount` | how many submit attempts | switch to aggressive validation after the first failure |

`isDirty` and `dirtyFields` are the ones people discover late and then use constantly — an edit form that only PATCHes changed columns falls straight out of `dirtyFields`.

---

## Cross-field validation

Single-field rules are easy. The interesting ones compare two fields — password confirmation, start date before end date. In Zod, use `.refine()` and point the error at a specific field with `path`:

```js
const passwordSchema = z
  .object({
    password: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // attach the error here, not to the root
  });
```

For several cross-field rules at once, `.superRefine()` lets you add multiple issues in one pass:

```js
.superRefine((data, ctx) => {
  if (data.startDate > data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Start date must be before end date',
      path: ['startDate'],
    });
  }
});
```

**Gotcha:** `.refine()` only runs after the base object parses successfully. If `password` fails `min(8)`, the match check never executes — which is usually what you want anyway.

---

## Async validation (does this username exist?)

Some rules need the server. Three options, roughly in order of preference:

**1. Per-field `validate` in `register`** — simple, debounce it yourself:

```jsx
<input
  {...register('username', {
    validate: async (value) => {
      const res = await fetch(`/api/users/check?u=${encodeURIComponent(value)}`);
      const { available } = await res.json();
      return available || 'That username is taken';
    },
  })}
/>
```

**2. Zod `.refine()` with an async function** — requires `parseAsync`, which `zodResolver` handles automatically.

**3. Let the server decide on submit** and map the response back with `setError` (below). Least chatty, and the only one that's actually race-free.

---

## Surfacing server errors

The server is the real authority. When it rejects a submit, push those errors back into the form instead of dumping a toast:

```jsx
const { setError } = useForm({ resolver: zodResolver(schema) });

const onSubmit = async (data) => {
  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      // e.g. { fieldErrors: { email: "Already registered" } }
      Object.entries(body.fieldErrors ?? {}).forEach(([field, message]) => {
        setError(field, { type: 'server', message });
      });
      return;
    }
    // success path
  } catch {
    setError('root.serverError', {
      type: 'network',
      message: 'Could not reach the server. Try again.',
    });
  }
};
```

`root.serverError` is RHF's convention for form-level (non-field) errors — read it back as `errors.root?.serverError?.message`.

---

## Sharing one schema between client and server

This is the real payoff of Zod, and the reason it's worth the dependency. Define the schema once, import it in both the React app and the Express route:

```js
// shared/schemas/task.js
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  status: z.enum(['todo', 'in_progress', 'done']),
  estimateMinutes: z.coerce.number().int().positive().optional(),
});
```

```jsx
// client
useForm({ resolver: zodResolver(taskSchema) });
```

```js
// server — Express
app.post('/api/tasks', (req, res) => {
  const parsed = taskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
  }
  // parsed.data is now typed and trusted — safe to bind into SQL
  // (still use parameterised queries; validation is not escaping)
});
```

Two details that matter:

- **`z.coerce.number()`** — HTML inputs always give you strings. `<input type="number">` included. Coerce, or every numeric rule fails against `"42"`.
- `error.flatten()` gives `{ formErrors, fieldErrors }`, which maps cleanly onto the `setError` loop above.

---

## Dynamic fields (`useFieldArray`)

For repeatable rows — line items, subtasks, tags:

```jsx
const { fields, append, remove } = useFieldArray({ control, name: 'subtasks' });

{fields.map((field, index) => (
  <div key={field.id}>  {/* field.id, NOT index */}
    <input {...register(`subtasks.${index}.title`)} />
    <button type="button" onClick={() => remove(index)}>Remove</button>
  </div>
))}
<button type="button" onClick={() => append({ title: '' })}>Add subtask</button>
```

Use `field.id` as the React key. Using the array index breaks reordering and removal in exactly the way you'd expect.

Schema side: `z.array(subtaskSchema).min(1, 'Add at least one subtask')`.

---

## Controlled components (`Controller`)

`register` works by attaching a ref, so it only works on real DOM inputs. Third-party components — MUI Select, react-select, a date picker — need the `Controller` wrapper:

```jsx
import { Controller } from 'react-hook-form';

<Controller
  name="assignee"
  control={control}
  render={({ field, fieldState }) => (
    <>
      <Select {...field} options={users} />
      {fieldState.error && <p>{fieldState.error.message}</p>}
    </>
  )}
/>
```

---

## Accessibility

Error text in a red `<p>` is invisible to a screen reader and to anyone with red-green colour blindness. The minimum viable version:

```jsx
<label htmlFor="email">Email</label>
<input
  id="email"
  {...register('email')}
  aria-invalid={errors.email ? 'true' : 'false'}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email.message}
  </p>
)}
```

- `htmlFor` / `id` pairing — clicking the label focuses the input.
- `aria-invalid` — announces the field as errored.
- `aria-describedby` — ties the message to the field so it's read aloud on focus.
- `role="alert"` — announces the message the moment it appears.
- Don't rely on colour alone. Add an icon or the word "Error".
- On failed submit, move focus to the first invalid field. RHF does this for you via `shouldFocusError` (on by default).

---

## Native vs. Library

| Criteria | Native (`useState`) | React Hook Form + Zod |
|---|---|---|
| **Performance** | Re-renders the whole form on every keystroke | Uncontrolled inputs; isolates re-renders |
| **Boilerplate** | Manual regex, handlers, touched tracking | Schema-driven; most of it is declarative |
| **Cross-field rules** | Hand-rolled, gets messy fast | `.refine()` / `.superRefine()` |
| **Dynamic fields** | Manual array state juggling | `useFieldArray` |
| **Type safety** | None | `z.infer<typeof schema>` gives you the TS type free |
| **Server reuse** | Rules duplicated on both sides | One schema, both sides |
| **Bundle cost** | 0 KB | ~9 KB (RHF) + ~13 KB (Zod), gzipped |
| **Best for** | 1–3 simple fields, a search box, a login form | Multi-step wizards, dynamic rows, anything in production |

**Practical heuristic:** if the form has more than three fields, any cross-field rule, or ever hits an API, reach for the library. Below that, `useState` is genuinely fine and one less dependency.

---

## Alternatives worth knowing

| Tool | Note |
|---|---|
| **Formik** | Was the default for years. Still widely seen in older codebases; slower (controlled) and no longer actively developed. Don't start new work with it. |
| **TanStack Form** | Newer, headless, framework-agnostic, excellent TypeScript. Worth watching. |
| **Yup** | Zod's predecessor. Similar chained API, weaker TS inference. |
| **Valibot** | Zod-like API at a fraction of the bundle size. Good when KB matter. |
| **HTML5 constraints** | `required`, `pattern`, `minLength`, `type="email"` — free, zero JS, but the styling and messages are the browser's. Fine for a newsletter box. |

---

## Checklist before shipping a form

- [ ] Server re-validates everything the client validated
- [ ] `noValidate` on the `<form>` if you own the error UI
- [ ] Errors appear on blur, not on first keystroke
- [ ] Submit button disabled while `isSubmitting`
- [ ] Double-submit is impossible (disabled button + server idempotency)
- [ ] Server-side field errors map back onto their fields
- [ ] Network failure has a visible, recoverable error state
- [ ] Every input has an associated `<label>`
- [ ] `aria-invalid` and `aria-describedby` wired up
- [ ] Focus jumps to the first invalid field on failed submit
- [ ] Numeric inputs coerced from string before validation
- [ ] Strings trimmed before length checks (`z.string().trim().min(1)`)
- [ ] Form is fully operable by keyboard alone