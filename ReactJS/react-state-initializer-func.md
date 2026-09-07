# React State Initializer Functions

A **state initializer function** (a.k.a. *lazy state initialization*) is a pure function passed into `useState` to compute the initial value. React calls it **exactly once**, on the initial mount, and ignores it on every subsequent render.

---

## The problem

If you pass a function *call* into `useState`, JavaScript evaluates it on every single render. React discards the result after the first render, but the CPU work already happened.

```jsx
// ❌ getExpensiveData() runs on EVERY render
const [data, setData] = useState(getExpensiveData());
```

The mistake is subtle because the code *works* — the state is correct. It just quietly burns cycles forever.

## The solution

Pass a function, not its result. React sees a function and defers the call to mount time.

```jsx
// ✅ runs ONCE on mount
const [data, setData] = useState(() => getExpensiveData());

// ✅ also fine — passing the reference directly
const [data, setData] = useState(getExpensiveData);
```

---

## Requirements

The initializer must be:

1. **Pure** — no side effects (API calls, mutations, DOM writes). Same inputs, same output.
2. **Argument-free** — React calls it with no arguments. If your function has parameters, they'll be `undefined`.
3. **Synchronous** — it must return the value immediately. It cannot return a Promise. For async initial data, mount with a placeholder and fetch in `useEffect`.

> [!warning] StrictMode calls it twice
> In development, React invokes the initializer twice to surface impurity. If your initializer increments a counter, writes to `localStorage`, or logs something you depend on, you'll see it happen twice. That's the point — fix the impurity, don't disable StrictMode.

---

## Value vs. initializer

| | `useState(calculate())` | `useState(() => calculate())` |
|---|---|---|
| **Execution** | Every render | Once, on mount |
| **Good for** | Strings, numbers, booleans, small literals | `localStorage` reads, parsing, filtering large arrays, `crypto.randomUUID()` |
| **Overhead** | High if the function is heavy | Minimal |

For a plain literal — `useState(0)`, `useState("")`, `useState([])` — wrapping it in an arrow function is pure noise. There's nothing to defer.

---

## The function-as-state trap

This is the one that actually bites people. If the value you want to *store* is itself a function, the reference form calls it instead of storing it:

```jsx
// ❌ React calls myHandler and stores its return value
const [handler, setHandler] = useState(myHandler);

// ✅ the initializer returns the function
const [handler, setHandler] = useState(() => myHandler);
```

The same trap exists in the setter — `setHandler(myFn)` treats `myFn` as an updater. You need `setHandler(() => myFn)` there too.

---

## Props as initial state

Because the initializer runs only on mount, state derived from a prop **will not update when that prop changes**:

```jsx
function Editor({ initialText }) {
  const [text, setText] = useState(() => initialText);
  // parent changes initialText later -> text does NOT change
}
```

Two conventions handle this:

- **Name the prop `initialX`** to signal that later changes are ignored by design.
- **Reset via `key`** — when the parent renders `<Editor key={docId} initialText={...} />`, changing `docId` unmounts and remounts the component, so the initializer runs again with the fresh value.

---

## Real-world: reading from localStorage

`localStorage` is a synchronous read that hits disk. Doing it on every render causes visible stutter.

```jsx
import { useState, useEffect } from "react";

function UserProfile() {
  // Runs once. Skipped entirely on re-renders.
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("user-theme") ?? "light";
    } catch {
      return "light"; // private mode / storage disabled / SSR
    }
  });

  // The initializer only READS. Persisting is a side effect -> useEffect.
  useEffect(() => {
    localStorage.setItem("user-theme", theme);
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}>
        Toggle Theme
      </button>
    </div>
  );
}
```

Three things worth noting in that example:

- The `try/catch` matters — `localStorage` throws in some privacy modes and doesn't exist during server-side rendering.
- If you're storing JSON, wrap `JSON.parse` in the same guard; a corrupted entry will otherwise crash the mount.
- The toggle uses the **updater** form (`prev => ...`), not `theme === "light" ? ...`. See [[React Updater Functions]].

> [!note] SSR / hydration
> With Next.js or any SSR setup, the server has no `localStorage`, so it renders the fallback while the client renders the stored value — a hydration mismatch. The usual fix is to initialize with the fallback and sync from storage inside `useEffect`, accepting one extra render.

---

## Initializer vs. updater

These look nearly identical and do completely different jobs:

```jsx
useState(() => expensiveCalc());   // INITIALIZER — once, on mount, no args
setState(prev => prev + 1);        // UPDATER — every call, receives pending state
```

Rule of thumb: a function in the **`useState` call** is an initializer; a function in the **setter** is an updater.

---

## `useReducer` has one too

`useReducer` takes an optional third argument, `init`, which serves the same purpose — and lets you reuse the same logic to reset state later:

```jsx
function init(initialCount) {
  return { count: initialCount };
}

const [state, dispatch] = useReducer(reducer, initialCount, init);
```

Unlike `useState`'s initializer, this one **does** receive an argument: the second parameter passed to `useReducer`.

---

## Quick reference

| Situation | Write |
|---|---|
| Plain literal | `useState(0)` |
| Expensive computation | `useState(() => calc())` |
| Existing zero-arg function | `useState(myFn)` |
| Storing a function *as* the value | `useState(() => myFn)` |
| Async initial data | `useState(null)` + `useEffect` fetch |
| Reset on identity change | `key` prop on the component |

---

## Sources

- [useState — React docs](https://react.dev/reference/react/useState)
- [useReducer — React docs](https://react.dev/reference/react/useReducer)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)