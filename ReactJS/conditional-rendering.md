# Conditional Rendering in React

Conditional rendering lets you display different UI elements or components based on specific conditions. There is no special React syntax for it — you use the same control flow you already know from plain JavaScript (`if`, ternaries, `&&`, `switch`), and JSX is just an expression that those constructs return.

---

## First: what React actually renders

Before the patterns, know how React treats each value it's asked to render. This explains most of the bugs in this topic.

| Value returned | What React renders |
| --- | --- |
| `null` | Nothing |
| `undefined` | Nothing |
| `false` / `true` | Nothing |
| `0` | **`0`** — it renders! |
| `NaN` | **`NaN`** — it renders! |
| `''` (empty string) | Nothing visible, but it *is* a valid child |
| `'text'`, numbers, JSX, arrays | Rendered normally |

Rule of thumb: `null`, `undefined`, and booleans vanish. Numbers do not.

---

## 1. The Ternary Operator (`? :`)

Ideal for inline binary choices inside JSX. It's a concise `if/else` that returns a value, which is why it works inside `{}`.

```jsx
function WelcomeMessage({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
    </div>
  );
}
```

You can also render nothing on one branch by returning `null`:

```jsx
{error ? <p className="error">{error}</p> : null}
```

**Avoid deep nesting.** Two levels is already hard to read:

```jsx
{/* Don't do this */}
{isLoading ? <Spinner /> : error ? <Error /> : data ? <List /> : <Empty />}
```

Once you need three or more branches, use an early return, a `switch`, or a lookup object instead.

---

## 2. Logical AND Operator (`&&`)

Use the short-circuit `&&` when you want to render something only if a condition is true, and render nothing when it's false.

```jsx
function NotificationBadge({ unreadCount }) {
  return (
    <div>
      <h2>Inbox</h2>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
}
```

### ⚠️ Gotcha: numbers on the left side

If the left operand is `0`, `&&` returns `0` — and React renders it. You get a stray `0` in your UI.

```jsx
{unreadCount && <Badge />}      // ❌ renders "0" when count is 0
{unreadCount > 0 && <Badge />}  // ✅ left side is a boolean
{Boolean(items.length) && <List />}  // ✅ alternative
{!!items.length && <List />}         // ✅ alternative
```

The same applies to `items.length &&` — a very common source of a phantom `0` in lists.

### Related: `||` and `??` for fallback *values*

`&&` picks an element to show. `||` and `??` pick a value to use.

```jsx
<h1>{user.name || 'Anonymous'}</h1>   // falls back on '' , 0, null, undefined
<h1>{user.name ?? 'Anonymous'}</h1>   // falls back only on null / undefined
```

Use `??` when an empty string or `0` is a legitimate value you want to keep.

---

## 3. Early Return with `if`

When you want to stop a component from rendering altogether, or return an entirely different layout, use a standard `if` statement above the main `return`. This keeps the happy path flat and readable.

```jsx
function Dashboard({ isLoading, error, data }) {
  if (isLoading) return <div>Loading your profile...</div>;
  if (error) return <ErrorState message={error.message} />;
  if (!data) return null;              // render nothing

  return (
    <main>
      <h1>Welcome, {data.name}</h1>
    </main>
  );
}
```

Order matters: put the most specific/blocking conditions first (loading → error → empty → success).

### ⚠️ Gotcha: early returns and the Rules of Hooks

Hooks must run in the same order on every render. An early return placed **above** a hook will skip it and crash the app.

```jsx
// ❌ Broken — useEffect is skipped when isLoading is true
function Profile({ isLoading, userId }) {
  const [user, setUser] = useState(null);
  if (isLoading) return <Spinner />;
  useEffect(() => { fetchUser(userId).then(setUser); }, [userId]);
  ...
}

// ✅ All hooks first, then conditionals
function Profile({ isLoading, userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => { fetchUser(userId).then(setUser); }, [userId]);

  if (isLoading) return <Spinner />;
  ...
}
```

**Every hook goes above every early return.** No exceptions.

---

## 4. Switch Statements

When multiple outcomes hang off a single state variable — a wizard step, a status tag, a request state — a `switch` keeps things organised.

```jsx
function StatusTag({ status }) {
  switch (status) {
    case 'success':
      return <span className="tag-green">Completed</span>;
    case 'warning':
      return <span className="tag-orange">Pending Approval</span>;
    case 'error':
      return <span className="tag-red">Failed</span>;
    default:
      return <span className="tag-gray">Unknown State</span>;
  }
}
```

Always include a `default` case — it protects you from an unexpected value silently rendering nothing.

---

## 5. Object Lookup Map (the cleanest alternative to `switch`)

For simple one-to-one mappings, a plain object is shorter than a `switch` and can live outside the component so it isn't recreated on every render.

```jsx
const STATUS_TAGS = {
  success: { label: 'Completed',        className: 'tag-green'  },
  warning: { label: 'Pending Approval', className: 'tag-orange' },
  error:   { label: 'Failed',           className: 'tag-red'    },
};

const FALLBACK = { label: 'Unknown State', className: 'tag-gray' };

function StatusTag({ status }) {
  const { label, className } = STATUS_TAGS[status] ?? FALLBACK;
  return <span className={className}>{label}</span>;
}
```

The same trick works for whole components:

```jsx
const STEPS = {
  1: PersonalDetails,
  2: AddressForm,
  3: ReviewAndSubmit,
};

function Wizard({ step }) {
  const StepComponent = STEPS[step] ?? NotFound;
  return <StepComponent />;
}
```

Note the capitalised variable name — React treats lowercase JSX tags as HTML elements, so `<stepComponent />` would silently render a literal `<stepcomponent>` tag.

---

## 6. Assigning JSX to a Variable

JSX is just a value, so you can build it up with `if` blocks and then drop the variable into your markup. Useful when the condition is complex but only affects one slice of the UI.

```jsx
function Toolbar({ role }) {
  let adminControls;

  if (role === 'admin') {
    adminControls = <AdminPanel />;
  } else if (role === 'editor') {
    adminControls = <EditorPanel />;
  }
  // otherwise stays undefined → renders nothing

  return (
    <div className="toolbar">
      <SearchBar />
      {adminControls}
    </div>
  );
}
```

---

## Beyond elements: conditional props, attributes and classes

Conditional rendering isn't only about *which element* — often the element is fixed and only an attribute changes.

```jsx
// Conditional className
<button className={`btn ${isActive ? 'btn-active' : ''}`}>Save</button>

// Conditional attribute value
<button disabled={isSubmitting}>Submit</button>

// Conditionally spread a group of props
<input {...(isReadOnly && { readOnly: true, tabIndex: -1 })} />

// Conditional inline style
<div style={{ opacity: isDisabled ? 0.5 : 1 }} />
```

For anything more than one or two toggled classes, reach for a small helper like `clsx` or `classnames`.

---

## ⚠️ Gotcha: conditional rendering and component state

React preserves a component's state based on its **position in the tree**, not its props. Swapping between two different components at the same position destroys state; swapping between the *same* component keeps it.

```jsx
// Typing in one input, then flipping the flag: state is LOST
{isEditing ? <TextInput /> : <TextArea />}

// Same component in the same slot: state is PRESERVED (often surprising)
{isEditing ? <TextInput label="Edit" /> : <TextInput label="View" />}
```

If you need the state reset, give the two branches different `key` values:

```jsx
{isEditing
  ? <TextInput key="edit" label="Edit" />
  : <TextInput key="view" label="View" />}
```

---

## Direct Syntax Comparison

| Method | Best used for | Usable inside JSX? |
| --- | --- | --- |
| **Ternary (`? :`)** | Direct A-or-B UI switches | ✅ Yes |
| **Logical AND (`&&`)** | Showing or hiding a single element | ✅ Yes |
| **Early return (`if`)** | Loading/error states, or a completely different layout | ❌ No — must sit above `return` |
| **Switch case** | 3+ distinct states off one variable | ❌ No — outside `return`, or in a helper |
| **Object lookup** | 3+ distinct states with a simple, data-shaped mapping | ✅ Yes (the lookup expression) |
| **JSX variable** | Complex condition affecting one slice of the markup | ✅ Yes (the variable) |

---

## Quick decision guide

- **Show it or don't?** → `&&` (check the left side is a boolean)
- **This or that?** → ternary
- **Whole component behaves differently?** → early return
- **Three or more named states?** → object lookup, falling back to `switch`
- **Only an attribute changes?** → conditional prop/`className`, not a whole branch

---

## Sources

- [React docs — Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [Legacy React docs — Conditional Rendering](https://legacy.reactjs.org/docs/conditional-rendering.html)
- [React docs — Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React docs — Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [GeeksforGeeks — ReactJS Conditional Rendering](https://www.geeksforgeeks.org/reactjs/reactjs-conditional-rendering/)
- [SitePoint — Conditional Rendering in React](https://www.sitepoint.com/conditional-rendering-in-react/)