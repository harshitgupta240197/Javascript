# State in React (`useState`)

State is data that is local and private to a component instance — a component's memory. When state changes, React re-renders that component and its children so the UI matches the new data.

---

## Why Not a Regular Variable?

```jsx
function Broken() {
  let count = 0;                          // ❌
  return <button onClick={() => count++}>{count}</button>;
}
```

Two things go wrong:

1. **No re-render.** React has no idea the value changed, so the screen never updates.
2. **Value is lost.** When the component re-renders for any other reason, `let count = 0` runs again and resets.

State fixes both: it **persists across renders** and **triggers a re-render** when updated.

### The one exception

If a value genuinely doesn't affect what's on screen — a timer ID, a previous scroll position, a debounce handle — it doesn't belong in state. Use a `useRef`, which persists across renders but does *not* trigger one.

| Need | Use |
| --- | --- |
| Persists + re-renders | `useState` |
| Persists, no re-render | `useRef` |
| Recomputed every render | a plain variable |

---

## Syntax

```jsx
import { useState } from 'react';

const [stateVariable, setStateVariable] = useState(initialValue);
```

- **`stateVariable`** — the current value for this render
- **`setStateVariable`** — the setter; the only legitimate way to change it
- **`initialValue`** — used on the first render only, ignored thereafter

The array destructuring means you pick the names. Convention is `x` / `setX`.

### ⚠️ `initialValue` is ignored after the first render

```jsx
function Profile({ user }) {
  const [name, setName] = useState(user.name);  // won't update when `user` changes
}
```

This catches everyone. If `user` changes later, `name` keeps the old value — `useState` only reads its argument on mount. If you need it to reset, change the component's `key` (see the key note) rather than reaching for `useEffect`.

### Lazy initialization

If the initial value is expensive to compute, pass a **function** instead of a value. React calls it once, on mount.

```jsx
const [data, setData] = useState(expensiveParse(raw));      // ❌ runs every render
const [data, setData] = useState(() => expensiveParse(raw)); // ✅ runs once
```

The first version still only *uses* the result once, but the computation happens on every single render and is thrown away.

---

## Practical Example: A Counter

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

---

## State Acts Like a Snapshot

Calling a setter does **not** change the variable in the code you're currently running. It schedules a re-render. Within the current function call, `count` keeps its old value until the next render.

```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count);   // still the OLD value
}
```

### ⚠️ The consequence: sequential updates

```jsx
// ❌ Increments by 1, not 3 — all three read the same stale `count`
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);

// ✅ Updater function receives the latest pending value
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
```

**Rule: whenever the next state depends on the previous state, use the updater form `setX(prev => ...)`.** It's never wrong, so many people use it by default.

### Batching

React groups multiple state updates within the same event handler into a single re-render — so three `setCount` calls produce one render, not three. Since React 18 this batching also applies inside promises, `setTimeout`, and native event handlers ("automatic batching"). It's a performance win and the reason the snapshot behaviour exists.

---

## ⚠️ Never Mutate State Directly

React compares the old value to the new one by reference (`Object.is`). Mutating in place means the reference is unchanged, so React concludes nothing happened and skips the re-render.

```jsx
count = count + 1;              // ❌ nothing happens
user.name = 'Alex';             // ❌ same object reference
setUser(user);                  // ❌ still the same reference
items.push(newItem);            // ❌ same array reference
```

Always create a **new** object or array.

### Updating objects

```jsx
const [user, setUser] = useState({ name: 'Ana', role: 'dev', age: 30 });

setUser({ ...user, name: 'Alex' });          // spread, then override
setUser(prev => ({ ...prev, age: prev.age + 1 }));  // updater form
```

Note the parentheses in `prev => ({ ... })` — without them, JS reads `{` as a function body, not an object.

**Nested objects need spreading at every level:**

```jsx
setUser(prev => ({
  ...prev,
  address: { ...prev.address, city: 'Lucknow' },
}));
```

If you find yourself three levels deep, that's a signal to flatten your state shape — or reach for a library like Immer.

### Updating arrays

Learn these by which operation you need:

| Operation | ❌ Mutating | ✅ Immutable |
| --- | --- | --- |
| Add to end | `arr.push(x)` | `[...arr, x]` |
| Add to start | `arr.unshift(x)` | `[x, ...arr]` |
| Remove | `arr.splice(i, 1)` | `arr.filter(item => item.id !== id)` |
| Replace one | `arr[i] = x` | `arr.map(item => item.id === id ? x : item)` |
| Sort | `arr.sort(fn)` | `[...arr].sort(fn)` or `arr.toSorted(fn)` |
| Reverse | `arr.reverse()` | `[...arr].reverse()` or `arr.toReversed()` |

A concrete update-one-field-in-one-row, which comes up constantly:

```jsx
setTasks(prev =>
  prev.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  )
);
```

Note that a shallow copy is enough — you only need new references along the path you changed. Untouched items can be shared.

---

## State Is Local and Isolated

Render `<Counter />` three times and you get three independent counts. State belongs to a component **instance**, tied to its position in the tree.

Two consequences worth knowing:

- **Unmounting destroys state.** Conditionally removing a component and bringing it back gives you a fresh one.
- **Changing a component's `key` resets its state**, because React treats it as a different instance. That's the deliberate reset technique.

---

## Where Should State Live?

The single most useful structural idea in React: **lift state up** to the closest common parent of every component that needs it.

```jsx
// Both children need to know the filter → it lives in the parent
function TaskBoard() {
  const [filter, setFilter] = useState('all');
  return (
    <>
      <FilterBar value={filter} onChange={setFilter} />
      <TaskList filter={filter} />
    </>
  );
}
```

The child receives the value as a prop and a setter as a callback prop. Data flows down, events flow up.

### Don't put derived values in state

If something can be **calculated** from existing state or props, calculate it during render. Storing it creates two sources of truth that drift apart.

```jsx
// ❌ Redundant state that can go stale
const [tasks, setTasks] = useState([]);
const [taskCount, setTaskCount] = useState(0);

// ✅ Just derive it
const taskCount = tasks.length;
const completed = tasks.filter(t => t.done);
```

Only reach for `useMemo` if the calculation is genuinely expensive and you've measured it.

---

## Choosing State Structure

A few principles that keep components manageable:

- **Group related state.** Two values that always change together belong in one object.
- **Avoid contradictions.** `isLoading` + `isError` + `isSuccess` as three booleans allows impossible combinations. One `status` string (`'idle' | 'loading' | 'success' | 'error'`) can't contradict itself.
- **Avoid duplication.** Store a `selectedId`, not a copy of the selected object — otherwise editing the original leaves the copy stale.
- **Keep it flat.** Deeply nested state means deeply nested spreads.

---

## Multiple State Variables vs. One Object

```jsx
// Usually better — independent values, independent updates
const [name, setName] = useState('');
const [email, setEmail] = useState('');

// Better when the values always move together
const [form, setForm] = useState({ name: '', email: '' });
```

Note that unlike class components' `this.setState`, `useState`'s setter **replaces** rather than merges. `setForm({ name: 'Ana' })` wipes out `email`. Always spread.

---

## State vs. Props

| | State | Props |
| --- | --- | --- |
| **What is it** | A component's private, internal memory | Arguments passed in by the parent |
| **Who owns it** | The component itself | The parent |
| **Mutability** | Changeable via the setter | Read-only inside the receiving component |
| **Direction** | Stays local unless passed down | Flow down: parent → child |
| **On change** | Triggers a re-render of this component | Triggers a re-render when the parent re-renders |

They work together: a parent holds state and passes it down as props, along with a setter so children can request changes.

---

## Rules of Hooks (applies to `useState`)

- Call hooks only at the **top level** of a component — never inside `if`, loops, or nested functions.
- Call them only from **React components or custom hooks**.
- **Every hook must sit above every early `return`**, or a conditional return will skip it and crash.

React tracks hooks by call order, which is why the order must be identical on every render.

---

## Quick checklist

- [ ] Using the setter, never assigning directly
- [ ] Spreading objects/arrays instead of mutating them
- [ ] `setX(prev => ...)` whenever new state depends on old
- [ ] No values in state that could be derived from other state
- [ ] `useState(() => expensive())` for costly initial values
- [ ] Not expecting the variable to change immediately after calling the setter
- [ ] Hooks at the top level, above any early return

---

## Sources

- [React docs — State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [React docs — State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React docs — Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [React docs — Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [React docs — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React docs — Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React docs — `useState` reference](https://react.dev/reference/react/useState)
- [React docs — Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)