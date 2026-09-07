# React Arrays in State

Arrays in state are **read-only**. To update one, hand the setter a *new* array — never modify the existing one with `push`, `pop`, `splice`, or index assignment.

---

## Why: reference comparison

React decides whether to re-render by comparing old state to new with `Object.is` — a reference check, not a deep value check.

```js
const arr = [1, 2];
arr.push(3);
// arr is now [1, 2, 3], but it's still the SAME array in memory
```

Mutating leaves the reference identical, so React concludes nothing changed and skips the render. Your data updated; your UI didn't. Creating a fresh array gives a new reference, and React notices.

This is also why `todos.push(x); setTodos(todos);` fails — the setter *was* called, you just gave React back the same object.

---

## Method cheat sheet

| Operation | 🚫 Mutates | ✅ Returns a copy |
|---|---|---|
| Add | `push()`, `unshift()` | `[...arr, item]`, `[item, ...arr]`, `concat()` |
| Remove | `pop()`, `shift()`, `splice()` | `filter()`, `slice()` |
| Replace | `arr[i] = value` | `map()` |
| Insert at index | `splice()` | `slice()` + spread |
| Sort | `sort()` | `[...arr].sort()` |
| Reverse | `reverse()` | `[...arr].reverse()` |

`sort` and `reverse` are the sneaky ones — they read like they return a new array (they do return *an* array), but they sort in place and hand back the same reference. Always copy first.

`concat()` and `slice()` are safe alternatives to spread and filter — `arr.concat(item)` does the same job as `[...arr, item]`, and `slice()` returns a section without touching the original. They're worth recognising in other people's code, but spread and `filter` read better and are what you'll see in modern React. Note how close `slice()` (safe, returns a copy) and `splice()` (mutates in place) look — a genuine source of bugs.

> [!tip] Modern non-mutating methods (ES2023)
> `toSorted()`, `toReversed()`, `toSpliced()`, and `with()` are immutable by design — no copy needed. Widely supported in current browsers and Node 20+.
> ```js
> setTodos(prev => prev.toSorted((a, b) => a.priority - b.priority));
> setTodos(prev => prev.with(2, updatedTodo));  // replace index 2
> ```

---

## The patterns

All examples use the **updater form** (`prev => ...`). It matters more here than anywhere, because array updates often fire several times in one handler — see [[React Updater Functions]].

```jsx
import { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy groceries", done: false },
    { id: 2, text: "Walk the dog",  done: false },
  ]);
```

### Add

```jsx
  const addTodo = (text) => {
    const newTodo = { id: crypto.randomUUID(), text, done: false };
    setTodos(prev => [...prev, newTodo]);      // append
    // setTodos(prev => [newTodo, ...prev]);   // prepend
  };
```

### Remove

```jsx
  const removeTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };
```

`filter` keeps everything matching the condition, so the test is `!==` — "keep the ones that aren't this."

### Update one item

```jsx
  const updateTodo = (id, text) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text } : t))
    );
  };
```

Two copies happen here, and you need both: `map` produces a new array, and `{ ...t }` produces a new object for the item you changed. Untouched items are returned by reference, which is correct and cheap.

### Toggle a flag

```jsx
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };
```

### Nested structures inside array items

When an array item holds its own object or array, every level you touch needs its own copy. `map` handles the outer array, then you spread down the path.

```jsx
const [tasks, setTasks] = useState([
  {
    id: "a1",
    title: "Ship tracker",
    meta: { priority: "high", tags: ["react"] },
    subtasks: [{ id: "s1", text: "Set up Vite", done: false }],
  },
]);

// change a nested field: tasks -> item -> meta -> priority
const setPriority = (taskId, priority) =>
  setTasks(prev =>
    prev.map(t =>
      t.id === taskId
        ? { ...t, meta: { ...t.meta, priority } }   // copy item AND meta
        : t
    )
  );

// toggle a subtask: tasks -> item -> subtasks -> subtask
const toggleSubtask = (taskId, subId) =>
  setTasks(prev =>
    prev.map(t =>
      t.id === taskId
        ? {
            ...t,
            subtasks: t.subtasks.map(s =>
              s.id === subId ? { ...s, done: !s.done } : s
            ),
          }
        : t
    )
  );
```

Read the second one as a chain: `map` the array → spread the matching task → `map` its subtasks → spread the matching subtask. One copy per level, and every level you *don't* touch is passed through by reference.

Miss a spread anywhere in that chain and you mutate live state. Three levels is roughly where this stops being readable — at that point, flatten the shape (see [[React Objects in State]]) or reach for `useImmer`.

### Insert at a position

```jsx
  const insertAt = (index, todo) => {
    setTodos(prev => [...prev.slice(0, index), todo, ...prev.slice(index)]);
  };
```

### Move / reorder

```jsx
  const move = (from, to) => {
    setTodos(prev => {
      const next = [...prev];            // copy first
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;                       // mutating `next` is fine — it's not state
    });
  };
```

Mutating methods are allowed *after* you've made your own copy. The rule only protects objects that are currently state.

### Bulk operations

```jsx
  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.done));
  const markAllDone   = () => setTodos(prev => prev.map(t => ({ ...t, done: true })));
  const clearAll      = () => setTodos([]);   // no updater needed — independent of previous
```

---

## Gotchas

### Spread is shallow

`[...arr]` copies the array but **not** the objects inside it. Both arrays point at the same item objects.

```js
const copy = [...todos];
copy[0].text = "changed";   // ❌ mutated the original todo — still in state
```

This is why updating an item needs `map` + object spread, not a copied array plus an index write.

### `Date.now()` as an id

```jsx
id: Date.now()   // two items added in the same millisecond collide
```

Use `crypto.randomUUID()` (built into browsers and Node 19+), or a counter, or ids from your backend. Duplicate keys produce genuinely confusing React bugs.

### Index as a `key`

```jsx
{todos.map((t, i) => <Todo key={i} ... />)}   // ❌
{todos.map(t => <Todo key={t.id} ... />)}     // ✅
```

With index keys, deleting the first item shifts every other item's key. React thinks item 0 changed content rather than that item 0 was removed, so component state (focus, input values, animations) sticks to the wrong row. Index keys are only safe when the list is static and never reordered, filtered, or added to.

### Don't store derived arrays

Filtered and sorted views are computable from the source. Keeping them in separate state means keeping them in sync by hand.

```jsx
// ❌ two states that can drift
const [todos, setTodos] = useState([]);
const [visible, setVisible] = useState([]);

// ✅ one source of truth, derived during render
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState("all");
const visible = todos.filter(t => filter === "all" || (filter === "done") === t.done);
```

---

## Performance

`map` and `filter` allocate a new array on every update. For lists in the hundreds or low thousands, this is not worth thinking about — React's render is the expensive part, not the array copy.

If a list is genuinely large and re-rendering is slow, the fixes in order: stable `key`s, `React.memo` on the row component with a `useCallback`'d handler, then virtualisation (`react-window`). Micro-optimising the copy is almost never the answer.

For deeply nested arrays-inside-objects-inside-arrays, `useImmer` removes the spread chains — but consider flattening the state shape first (see [[React Objects in State]]).

---

## Quick reference

| Goal | Pattern |
|---|---|
| Append | `setX(prev => [...prev, item])` |
| Prepend | `setX(prev => [item, ...prev])` |
| Remove by id | `setX(prev => prev.filter(o => o.id !== id))` |
| Update by id | `setX(prev => prev.map(o => o.id === id ? { ...o, ...changes } : o))` |
| Update nested field | `map` the array, then spread each level down to it |
| Insert at index | `[...prev.slice(0, i), item, ...prev.slice(i)]` |
| Sort | `setX(prev => [...prev].sort(fn))` or `prev.toSorted(fn)` |
| Reorder | Copy, then `splice` the copy |
| Empty it | `setX([])` |
| Filtered view | Compute during render — don't store |

---

## Sources

- [Updating arrays in state — React docs](https://react.dev/learn/updating-arrays-in-state)
- [Rendering lists — React docs](https://react.dev/learn/rendering-lists)
- [Choosing the state structure — React docs](https://react.dev/learn/choosing-the-state-structure)