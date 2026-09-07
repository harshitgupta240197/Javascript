# React Objects in State

You can hold objects in state with `useState`, but there's one governing rule: **treat state objects as read-only.** Never mutate them in place — always produce a new object.

---

## Why immutability is required

React decides whether to re-render by comparing the new state to the old one with `Object.is` — a **reference** comparison, not a deep value comparison. Mutating an object leaves the reference unchanged, so React sees "same value" and bails out. Your data changed; your UI didn't.

```jsx
const [user, setUser] = useState({ name: "Alex", age: 25 });

// ❌ same reference -> React sees no change -> no re-render
user.name = "Sam";
setUser(user);

// ✅ new reference -> React re-renders
setUser({ name: "Sam", age: 25 });
```

This is also why `setUser(user)` after a mutation *still* doesn't work. The problem isn't that you forgot to call the setter — it's that you handed React the same object back.

> [!note] Mutation before state is fine
> The rule applies to objects already *in* state. An object you just created locally is yours to modify freely:
> ```jsx
> const next = { ...user };
> next.name = "Sam";
> next.age += 1;
> setUser(next); // fine — `next` was never state
> ```

---

## Updating with spread

Copy the existing properties, then overwrite the ones you're changing.

```jsx
const [user, setUser] = useState({
  name: "Alex",
  email: "alex@example.com",
  role: "Admin",
});

setUser({
  ...user,                    // copy everything
  email: "sam@example.com",   // overwrite this one
});
```

Order matters — later keys win. `{ email: "x", ...user }` would let the old email overwrite your new one.

### Prefer the updater form

When the new state depends on the old, or when several updates fire in one handler, use the updater function:

```jsx
setUser(prev => ({
  ...prev,
  role: "Editor",
}));
```

> [!tip] Those extra parentheses
> `prev => ({ ... })` — without the wrapping `()`, JavaScript reads `{` as the start of a function body, not an object literal. Details in [[React Updater Functions]].

---

## Nested objects

Spread is a **shallow** copy — it only duplicates the top level. Every layer you touch has to be spread.

```jsx
const [profile, setProfile] = useState({
  username: "coder123",
  metadata: { theme: "dark", notifications: true },
});

setProfile(prev => ({
  ...prev,                    // copy top level
  metadata: {
    ...prev.metadata,         // copy the nested object
    theme: "light",           // overwrite
  },
}));
```

Miss the inner spread and you silently delete `notifications`. Three or four levels deep, this gets genuinely unpleasant — which is usually a signal that the state shape is wrong, not that you need a better copying technique. See *Flatten instead* below.

---

## Common operations

### Dynamic keys (form handling)

Computed property names let one handler serve every field:

```jsx
function handleChange(e) {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
}

<input name="email" value={form.email} onChange={handleChange} />
<input name="role"  value={form.role}  onChange={handleChange} />
```

The brackets are essential. `{ name: value }` creates a literal key called `"name"`.

### Removing a key

```jsx
setUser(prev => {
  const { role, ...rest } = prev;   // pull `role` out
  return rest;                      // return everything else
});
```

### Updating an object inside an array

```jsx
setTodos(prev =>
  prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
);
```

`map` gives you the new array; the spread gives you the new object. You need both — returning the mutated original item won't trigger anything downstream that compares references.

### Toggling a nested boolean

```jsx
setProfile(prev => ({
  ...prev,
  metadata: { ...prev.metadata, notifications: !prev.metadata.notifications },
}));
```

---

## Copying pitfalls

- `structuredClone(obj)` gives you a real deep copy, and handles `Date`, `Map`, `Set`, and cyclic references. It **cannot** clone functions, DOM nodes, or class prototypes.
- `JSON.parse(JSON.stringify(obj))` silently destroys `Date` (becomes a string), `undefined`, `Infinity`, `NaN`, `Map`, and `Set`. Avoid it.
- Deep-cloning the whole tree on every keystroke is wasteful anyway. Spread only the path you're changing.

---

## When to split state instead

A single object isn't always right. Split into separate `useState` calls when fields change independently and rarely together:

```jsx
// often better
const [name, setName] = useState("");
const [email, setEmail] = useState("");

// better as one object — these always move together
const [position, setPosition] = useState({ x: 0, y: 0 });
```

Group fields that update in the same event. Split fields that don't.

Also: don't store anything you can compute. If `fullName` is just `first + " " + last`, derive it during render rather than keeping it in the object and syncing it by hand.

## Flatten instead of nesting

Deeply nested state is the actual problem behind painful spread chains. Normalizing — keeping a flat lookup keyed by id — removes the nesting entirely:

```jsx
// ❌ painful
{ boards: { 1: { columns: { 2: { tasks: { 3: { title: "..." } } } } } } }

// ✅ flat, indexed by id
{
  tasks:   { 3: { id: 3, title: "...", columnId: 2 } },
  columns: { 2: { id: 2, title: "Doing", boardId: 1 } },
}
```

Updating one task is now a two-level spread instead of a five-level one.

---

## Strategy comparison

| Strategy | Complexity | Best for | Caveats |
|---|---|---|---|
| Spread (`...`) | Low | Flat objects, simple updates | Repetitive on deep structures |
| Updater function | Medium | Updates based on previous state; multiple updates per handler | The `({ ... })` parentheses trip people up |
| `useReducer` | Medium | Many distinct transitions on one object | More boilerplate for simple cases |
| Immer / `useImmer` | Low (after setup) | Genuinely deep, unavoidable nesting | External dependency |

### Immer, briefly

Immer lets you write mutating syntax against a draft and produces an immutable result underneath:

```jsx
import { useImmer } from "use-immer";

const [profile, updateProfile] = useImmer({
  username: "coder123",
  metadata: { theme: "dark", notifications: true },
});

updateProfile(draft => {
  draft.metadata.theme = "light";   // looks like mutation, isn't
});
```

Reach for it when nesting is inherent to the domain, not as a way to avoid learning spread.

---

## Performance note

Every update creates a new object reference, so any child receiving that object as a prop re-renders — `React.memo` won't stop it, since the reference genuinely changed. Same for `useEffect` / `useMemo` dependency arrays: an object in the deps list re-fires on every parent update. If that becomes a real problem, pass primitives (`user.name`) rather than the whole object, or split the state.

---

## Quick reference

| Goal | Pattern |
|---|---|
| Update one field | `setX(prev => ({ ...prev, key: value }))` |
| Update by dynamic key | `{ ...prev, [name]: value }` |
| Update nested field | Spread every level down to it |
| Remove a key | `const { key, ...rest } = prev; return rest;` |
| Update object in array | `prev.map(o => o.id === id ? { ...o, ...changes } : o)` |
| Deep clone | `structuredClone(obj)` — never `JSON.parse(JSON.stringify())` |
| Deep nesting hurts | Flatten the shape, or use Immer |

---

## Sources

- [Updating objects in state — React docs](https://react.dev/learn/updating-objects-in-state)
- [Choosing the state structure — React docs](https://react.dev/learn/choosing-the-state-structure)
- [Immer](https://immerjs.github.io/immer/)