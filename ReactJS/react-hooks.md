# React Hooks

Hooks are built-in functions that let you use state and other React features inside **functional components**, without writing classes. Introduced in React 16.8, they let you extract stateful logic into reusable units and keep components readable.

Every hook name starts with `use` — that's not just convention, it's how the linter and React itself identify them.

---

## The Rules of Hooks

### 1. Only call hooks at the top level

Never inside loops, conditions, nested functions, or event handlers.

### 2. Only call hooks from React functions

React function components, or your own custom hooks. Not plain JS functions, not class components, not event handlers.

### Why the rules exist

React doesn't know your hooks by name. It tracks them by **call order** — first `useState` in a component is slot 0, second is slot 1, and so on. On the next render it walks the same list in the same order and hands back the matching values.

```jsx
// ❌ On renders where isLoggedIn is false, useState shifts from slot 1 to slot 0
function Profile({ isLoggedIn }) {
  if (isLoggedIn) {
    useEffect(() => { track('view'); });
  }
  const [name, setName] = useState('');
}
```

Skip a hook on one render and every subsequent hook shifts position, so React hands your `useState` the value that belonged to something else. Hence the top-level rule.

### ⚠️ The corollary everyone forgets: hooks go above early returns

```jsx
// ❌ Broken — useEffect is skipped when isLoading is true
function Profile({ isLoading, userId }) {
  const [user, setUser] = useState(null);
  if (isLoading) return <Spinner />;
  useEffect(() => { fetchUser(userId).then(setUser); }, [userId]);
}

// ✅ All hooks first, then conditionals
function Profile({ isLoading, userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => { fetchUser(userId).then(setUser); }, [userId]);

  if (isLoading) return <Spinner />;
}
```

**Let the linter enforce this.** `eslint-plugin-react-hooks` catches both rules plus missing effect dependencies, and it ships enabled in the Vite React template. Don't disable its warnings — they're almost always pointing at a real bug.

---

## Core Built-in Hooks

### State hooks

| Hook | Purpose |
| --- | --- |
| `useState` | Local state. Returns the current value and a setter; the setter triggers a re-render. |
| `useReducer` | Alternative for complex state logic. State transitions go through a reducer function driven by dispatched actions. |

Reach for `useReducer` when several state values change together, when the next state depends on intricate rules, or when you have half a dozen `useState` calls that keep changing in concert.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'added':   return [...state, action.task];
    case 'toggled': return state.map(t =>
                      t.id === action.id ? { ...t, done: !t.done } : t);
    case 'deleted': return state.filter(t => t.id !== action.id);
    default: throw new Error(`Unknown action: ${action.type}`);
  }
}

const [tasks, dispatch] = useReducer(reducer, []);
dispatch({ type: 'toggled', id: 3 });
```

The win is that all the transition logic sits in one testable function outside the component.

### Effect hooks

| Hook | Purpose |
| --- | --- |
| `useEffect` | Synchronise with systems outside React — network, subscriptions, timers, non-React widgets. Runs after paint. |
| `useLayoutEffect` | Same, but runs synchronously **before** the browser paints. Only for measuring layout to avoid a visible flicker. |

### Performance hooks

| Hook | Purpose |
| --- | --- |
| `useMemo` | Caches the **result** of an expensive calculation between renders. |
| `useCallback` | Caches the **function definition** itself, so a child doesn't see a new reference each render. |

### Ref and context hooks

| Hook | Purpose |
| --- | --- |
| `useRef` | Holds a mutable value that persists across renders and does **not** trigger a re-render. Used for DOM nodes, timer IDs, previous values. |
| `useContext` | Reads a context value from a distant ancestor, avoiding prop drilling. |

---

## `useEffect` in Practice

This is where most React bugs live, so it's worth more than one line.

```jsx
useEffect(() => {
  // the effect
  return () => {
    // optional cleanup
  };
}, [dependencies]);
```

### The dependency array has three forms

```jsx
useEffect(() => { ... });              // after EVERY render — almost always wrong
useEffect(() => { ... }, []);          // once, on mount
useEffect(() => { ... }, [userId]);    // on mount, and whenever userId changes
```

Omitting the array entirely and calling `setState` inside gives you an infinite loop — a very common beginner crash.

### Cleanup prevents leaks

Return a function and React runs it before the next effect and on unmount:

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

Anything you set up — interval, event listener, subscription, WebSocket — should be torn down in cleanup. For fetches, use an `AbortController` or an `ignore` flag so a slow response from an old request can't overwrite newer data:

```jsx
useEffect(() => {
  let ignore = false;
  fetchUser(userId).then(data => { if (!ignore) setUser(data); });
  return () => { ignore = true; };
}, [userId]);
```

### ⚠️ Effects run twice in development

React 18+ StrictMode mounts, unmounts, and remounts every component in dev. If your effect misbehaves when run twice — double API call, duplicate listener — that's the point: it's surfacing a missing cleanup. Don't disable StrictMode; fix the effect.

### ⚠️ You probably need fewer effects than you think

The most common `useEffect` mistake is using it for things that aren't side effects at all:

```jsx
// ❌ Deriving state in an effect — extra render, easy to desync
const [fullName, setFullName] = useState('');
useEffect(() => { setFullName(first + ' ' + last); }, [first, last]);

// ✅ Just calculate during render
const fullName = first + ' ' + last;
```

Reach for `useEffect` only when you're synchronising with something **outside React**. Not for transforming data, not for responding to a user event (put that in the event handler), not for updating state from other state.

---

## `useRef`: Two Distinct Uses

```jsx
// 1. Access a DOM node
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();

// 2. Hold a mutable value that shouldn't cause a re-render
const timerRef = useRef(null);
timerRef.current = setInterval(tick, 1000);
```

Mutating `ref.current` never re-renders. That's the whole point — and also why you must never read a ref to decide what to render, since the screen won't update when it changes.

---

## `useMemo` and `useCallback`: Use Sparingly

Both exist to preserve **referential identity** across renders. Neither makes code faster by default — they add their own bookkeeping cost.

```jsx
// Worth it: genuinely expensive computation
const sorted = useMemo(() => hugeList.toSorted(compare), [hugeList]);

// Worth it: stable reference for a memo'd child or an effect dependency
const handleSelect = useCallback((id) => setSelected(id), []);
```

Wrapping every function in `useCallback` is a common anti-pattern — it clutters the code, and without a `React.memo` child on the receiving end it accomplishes nothing. Measure with the React DevTools Profiler before optimising.

Worth knowing: the **React Compiler** (stable as of React 19.1) applies this memoisation automatically, which makes manual `useMemo`/`useCallback` largely unnecessary in projects that enable it.

---

## Custom Hooks

The real payoff of hooks: extract stateful logic into a reusable function. Any function whose name starts with `use` and which calls other hooks is a custom hook.

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// Usage
const [isOpen, toggleOpen] = useToggle();
```

A more useful one:

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

Custom hooks share **logic**, not state. Two components calling `useToggle()` each get their own independent state. If you need shared state, that's context or a state library.

---

## Newer Hooks Worth Knowing

The source list stops at the 2019 set. These are current:

| Hook | Purpose |
| --- | --- |
| `useId` | Generates a stable unique ID for accessibility attributes (`htmlFor`/`aria-describedby`). Never use it for list keys. |
| `useTransition` | Marks a state update as non-urgent so typing stays responsive during a heavy re-render. Gives you an `isPending` flag. |
| `useDeferredValue` | Renders a stale value while an expensive update is in progress. |
| `useSyncExternalStore` | Subscribes to an external store safely under concurrent rendering. Mostly for library authors. |
| `useOptimistic` | Shows an optimistic UI state while an async action is pending. |
| `useActionState` | Manages form state and pending status around an async action (React 19). |
| `useFormStatus` | Reads the submission status of a parent form (React 19). |
| `useImperativeHandle` | Customises what a parent gets via a ref. Rare. |
| `useDebugValue` | Labels a custom hook in React DevTools. |
| `use` | Not a hook exactly — reads a promise or context, and *can* be called conditionally (React 19). |

---

## What to Learn When

If you're working through React now, a reasonable order:

1. **`useState`** — everything else assumes it
2. **`useEffect`** — with a strong bias toward using it less than you'd expect
3. **`useRef`** — DOM access and mutable non-rendering values
4. **`useContext`** — once prop drilling gets annoying
5. **`useReducer`** — once a component has 5+ related state values
6. **Custom hooks** — once you notice yourself copying logic between components
7. **`useMemo` / `useCallback`** — last, and only when profiling says so

`useTransition`, `useOptimistic`, and the form hooks are worth knowing exist; you can pick them up when a specific need arises.

---

## Common Mistakes

- Calling a hook inside `if`, a loop, or below an early return
- No dependency array on an effect that sets state → infinite loop
- Suppressing the exhaustive-deps lint warning instead of fixing the cause
- Using `useEffect` to derive state that could be computed during render
- Missing cleanup for intervals, listeners, and subscriptions
- Reaching for `useMemo`/`useCallback` everywhere without measuring
- Expecting `ref.current` changes to update the screen

---

## Sources

- [React docs — Built-in Hooks reference](https://react.dev/reference/react/hooks)
- [React docs — Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [React docs — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React docs — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React docs — Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React docs — `useReducer`](https://react.dev/reference/react/useReducer)
- [React docs — Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)