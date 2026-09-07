# React Updater Functions

An **updater function** is a callback passed into a state setter (`useState`'s setter, or class-based `this.setState`) that computes the next state from the previous *pending* value.

```jsx
setCount(count + 1);              // direct value
setCount(prev => prev + 1);       // updater function
```

---

## Why use one?

### 1. Batching and stale snapshots

React batches state updates. Calling a setter doesn't change the variable in the current execution block — it schedules a re-render. Within one event handler, `count` is a frozen snapshot from that render.

**Problem — direct values:**

```jsx
function handleClick() {
  setCount(count + 1); // count is 0 -> queues "set to 1"
  setCount(count + 1); // count is still 0 -> queues "set to 1"
  setCount(count + 1); // count is still 0 -> queues "set to 1"
}
// Result: 1, not 3
```

**Fix — updater functions:**

```jsx
function handleClick() {
  setCount(prev => prev + 1); // reads 0, queues 1
  setCount(prev => prev + 1); // reads pending 1, queues 2
  setCount(prev => prev + 1); // reads pending 2, queues 3
}
// Result: 3
```

### 2. Freshest state inside async closures

Inside `setTimeout`, `setInterval`, or a `.then()` block, the state variable captured by the closure is a stale snapshot from the render that created it. The updater form reads whatever is actually pending when the queue runs.

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);   // correct: always increments
    // setCount(count + 1);       // wrong: count is frozen at 0 forever
  }, 1000);
  return () => clearInterval(id);
}, []); // empty deps is now safe
```

> [!tip] Side benefit
> Because the updater doesn't reference the state variable, you can drop it from the dependency array of `useEffect` / `useCallback` / `useMemo`. This kills a whole category of "effect re-subscribes every render" bugs.

---

## The queue mental model

React maintains a queue per state variable for the duration of an event handler. After the handler finishes, React walks the queue in order:

| Queued item | How React processes it |
|---|---|
| A value (`setCount(5)`) | Replaces whatever is pending — earlier queued work is discarded |
| An updater (`setCount(n => n + 1)`) | Called with the pending value, its return becomes the new pending value |

Mixing them is legal and predictable:

```jsx
setCount(5);                 // pending = 5
setCount(prev => prev + 1);  // pending = 6
// Final: 6

setCount(prev => prev + 1);  // pending = 1 (from 0)
setCount(42);                // pending = 42 — updater result thrown away
// Final: 42
```

---

## Common patterns

### Primitives

```jsx
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);

setCount(prev => prev + 1);
setIsOpen(prev => !prev);
```

### Objects

State is treated as read-only — always return a **new** object. Spread carries over unchanged keys.

```jsx
const [user, setUser] = useState({ name: "Alex", age: 25 });

setUser(prev => ({
  ...prev,
  age: prev.age + 1,
}));
```

> [!note] Why the extra parentheses?
> `prev => ({ ... })` — without the wrapping `()`, JavaScript reads `{` as the start of a function body, not an object literal.

**Nested objects** need spreading at every level you change:

```jsx
const [form, setForm] = useState({
  name: "",
  address: { city: "", pin: "" },
});

setForm(prev => ({
  ...prev,
  address: { ...prev.address, city: "Lucknow" },
}));
```

### Arrays

No `push`, `pop`, `splice`, `sort`, or `reverse` on state — those mutate. Return a new array.

```jsx
const [todos, setTodos] = useState([]);

// add to end
setTodos(prev => [...prev, newTodo]);

// add to front
setTodos(prev => [newTodo, ...prev]);

// remove by id
setTodos(prev => prev.filter(t => t.id !== id));

// update one item (this is the big one for task apps)
setTodos(prev =>
  prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
);

// insert at index
setTodos(prev => [...prev.slice(0, i), newTodo, ...prev.slice(i)]);

// sort / reverse — copy first
setTodos(prev => [...prev].sort((a, b) => a.priority - b.priority));
```

---

## Rules and gotchas

**Must be pure.** React may call your updater more than once (it does exactly this in StrictMode during development, deliberately, to surface impure updaters). Compute and return — no `fetch`, no logging you depend on, no mutating anything outside.

```jsx
// WRONG — mutates the previous state object
setTodos(prev => {
  prev.push(newTodo);
  return prev;
});
// Same reference -> React bails out -> no re-render, or worse, a silent stale UI
```

**Returning the same value bails out.** React compares with `Object.is`. If your updater returns the identical reference/value, React may skip the re-render entirely. This is why mutation-then-return silently does nothing.

**Naming.** Convention is `prev` + state name: `prevCount`, `prevUser`, `prevTodos`. Short forms like `n` or `c` are fine for trivial math.

**When you don't need it.** If the next state doesn't depend on the current state, skip it:

```jsx
setFilter("");           // fine
setSelectedId(id);       // fine
setFilter(prev => "");   // pointless noise
```

**Don't confuse it with the lazy initializer.** These look similar and do completely different things:

```jsx
useState(() => expensiveCalc());  // lazy INITIALIZER — runs once, on mount
setState(prev => prev + 1);       // UPDATER — runs on every queued update
```

**`useState` replaces, `this.setState` merges.** In class components, `this.setState({ age: 26 })` shallow-merges into existing state. With `useState`, whatever you return *is* the entire new state — hence the spread.

---

## When updaters aren't enough

Once a single piece of state has many transition types (add / toggle / reorder / bulk-clear / undo), the updater callbacks scattered across handlers start to duplicate logic. That's the signal to move to **`useReducer`** — same "compute next state from previous state" principle, but the transitions live in one named place.

```jsx
function todosReducer(state, action) {
  switch (action.type) {
    case "added":   return [...state, action.todo];
    case "toggled": return state.map(t =>
                      t.id === action.id ? { ...t, done: !t.done } : t);
    case "deleted": return state.filter(t => t.id !== action.id);
    default:        throw new Error(`Unknown action: ${action.type}`);
  }
}

const [todos, dispatch] = useReducer(todosReducer, []);
dispatch({ type: "toggled", id: 3 });
```

---

## Quick reference

| Situation | Use |
|---|---|
| Next state depends on current | Updater: `setX(prev => ...)` |
| Next state is independent | Direct: `setX(value)` |
| Multiple updates in one handler | Updater (mandatory) |
| Inside `setTimeout` / `setInterval` / `.then()` | Updater (mandatory) |
| Want to drop state from a deps array | Updater |
| Expensive initial value | Lazy initializer: `useState(() => calc())` |
| Many distinct transitions on one state | `useReducer` |

---

## Sources

- [useState — React docs](https://react.dev/reference/react/useState)
- [Queueing a series of state updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Updating arrays in state](https://react.dev/learn/updating-arrays-in-state)
- [Updating objects in state](https://react.dev/learn/updating-objects-in-state)