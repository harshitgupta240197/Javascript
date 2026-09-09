# The `useEffect` Hook

`useEffect` is a built-in React Hook that lets you **synchronize a component with an external system**. Side effects are tasks that interact with things outside React's scope: fetching data from an API, manipulating the DOM directly, setting up timers, or subscribing to events.

> **The single most important framing:** `useEffect` is *not* a lifecycle hook. It is not "componentDidMount". It is a synchronization primitive — "keep this external thing in sync with this React state". If you think of it as lifecycle, the dependency array will feel arbitrary and hostile. If you think of it as sync, it falls into place.

---

## ⚙️ Core Syntax

The hook accepts a setup function (the effect) and an optional dependency array:

```javascript
import { useEffect } from 'react';

useEffect(() => {
  // 1. Your side effect logic goes here

  return () => {
    // 2. Optional cleanup function goes here
  };
}, [dependencies]); // 3. Optional dependency array
```

---

## 🔄 Controlling Execution (The Dependency Array)

The second argument tells React when to re-run the effect:

| Dependency Array | When It Runs | Common Use Case |
|---|---|---|
| **No array** (`undefined`) | After every single render | Rare. Usually a bug or temporary debugging. |
| **Empty array** (`[]`) | Once after mount (twice in dev Strict Mode — see below) | Setting up a global listener, one-time init |
| **With values** (`[query, userId]`) | On mount, and whenever any listed value changes | Re-fetch when an ID changes, sync state to `localStorage` |

**How React compares dependencies:** with `Object.is`, item by item. This is a *reference* comparison for objects, arrays, and functions — which is the source of most infinite-loop bugs (see below).

---

## 🧹 The Cleanup Function

If your effect sets up an ongoing process (a subscription, a `setInterval`, an event listener), you **must** return a cleanup function.

React calls cleanup:
- right before the component unmounts, **and**
- right before re-running the effect after a dependency change.

That second one is the part people forget. The order is always: **old cleanup → new effect**. Never two effects running at once.

```jsx
import { useState, useEffect } from 'react';

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array: set up the listener once

  return <p>Window width: {width}px</p>;
}
```

A useful test: **could this effect run twice in a row without breaking anything?** If the answer is no, the cleanup is wrong or missing.

---

## 🚫 You Might Not Need an Effect

This is the biggest omission from most `useEffect` tutorials, and the thing that separates working React from *good* React. Most effects in real codebases shouldn't exist. Two rules cover nearly all of it:

### 1. Don't use an Effect to transform data for rendering

If something can be **calculated from existing props or state**, calculate it during render. Do not mirror it into state via an effect.

```jsx
// ❌ Redundant state + effect. Two renders, and a frame where the value is stale.
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(firstName + ' ' + lastName);
}, [firstName, lastName]);

// ✅ Just calculate it.
const fullName = firstName + ' ' + lastName;
```

Same for filtered lists, totals, derived flags. If it's expensive, wrap it in `useMemo` — not an effect.

```jsx
// ❌
const [visible, setVisible] = useState([]);
useEffect(() => { setVisible(todos.filter(t => !t.done)); }, [todos]);

// ✅
const visible = useMemo(() => todos.filter(t => !t.done), [todos]);
```

### 2. Don't use an Effect to handle user events

If the code should run **because the user did something**, it belongs in the event handler — where you know *what* happened.

```jsx
// ❌ Why did this fire? On mount? On a refresh? Unclear.
useEffect(() => {
  if (submitted) {
    postToServer(form);
  }
}, [submitted]);

// ✅ The cause is explicit.
function handleSubmit() {
  postToServer(form);
}
```

### Other patterns that don't need an Effect

| Instead of… | Do this |
|---|---|
| Effect that resets state when a prop changes | Pass a `key` to the component — React remounts it and resets state for free |
| Effect chains (`setA` → effect → `setB` → effect → `setC`) | Calculate everything you can during render; do the rest in one event handler |
| Effect to notify a parent of a state change | Lift the state up, or call the parent's callback in the same handler that sets state |
| Effect to initialize expensive state | `useState(() => expensiveInit())` — the lazy initializer |
| Effect to subscribe to an external store | `useSyncExternalStore` (see below) |

**Effects that *are* legitimate:** anything genuinely outside React — network requests, `document.title`, `localStorage`, WebSockets, a non-React chart or map library, browser APIs, analytics on mount, timers.

---

## ⚡ Strict Mode Runs Your Effect Twice

In development, React 18+ Strict Mode deliberately mounts, unmounts, and remounts every component. Your `[]` effect runs **twice**.

This is not a bug and you should not "fix" it with a `useRef` guard. It is a stress test: if double-running breaks something, your cleanup is inadequate, and that same bug will surface in production the first time a dependency changes.

```jsx
// ❌ Papering over the symptom
const ran = useRef(false);
useEffect(() => {
  if (ran.current) return;
  ran.current = true;
  fetchData();
}, []);

// ✅ Write cleanup that makes double-running harmless
useEffect(() => {
  const controller = new AbortController();
  fetchData({ signal: controller.signal });
  return () => controller.abort();
}, []);
```

Production runs it once. Dev runs it twice on purpose.

---

## 🌐 Fetching Data Properly

Two traps here.

### Trap 1: you can't pass an `async` function to `useEffect`

An `async` function returns a Promise, and React expects the return value to be a *cleanup function*. Define the async function inside instead:

```jsx
// ❌ React will try to call a Promise as cleanup
useEffect(async () => {
  const data = await fetch(url);
}, [url]);

// ✅
useEffect(() => {
  async function load() {
    const res = await fetch(url);
    setData(await res.json());
  }
  load();
}, [url]);
```

### Trap 2: race conditions

If `userId` changes from `1` to `2` quickly, both requests are in flight. If request 1 resolves *after* request 2, you render user 1's data on user 2's page. This is a real bug that ships constantly.

Two fixes — the `ignore` flag is the React docs' recommendation because it works even when the request can't be cancelled:

```jsx
useEffect(() => {
  let ignore = false;

  async function load() {
    const res = await fetch(`/api/users/${userId}`);
    const json = await res.json();
    if (!ignore) setUser(json);   // stale response discarded
  }
  load();

  return () => { ignore = true; };
}, [userId]);
```

Or `AbortController`, which additionally cancels the network request:

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then(r => r.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);  // don't report our own cancel
    });

  return () => controller.abort();
}, [userId]);
```

### Trap 3: you probably shouldn't hand-roll this at all

Raw `useEffect` fetching gives you no caching, no deduplication, no retry, no loading/error state, and a network waterfall on every nested component. For anything beyond a toy, use **TanStack Query** or **SWR**, or your framework's data loader. They exist because this problem is genuinely hard.

---

## ♾️ Infinite Loops and the Object Dependency Trap

The classic:

```jsx
// ❌ Effect sets state → state change re-renders → no dep array → effect runs again → …
useEffect(() => {
  setCount(count + 1);
});
```

The subtler and far more common version — a **non-primitive dependency recreated every render**:

```jsx
// ❌ `options` is a brand new object on every render.
//    Object.is(prevOptions, options) is always false → effect runs forever.
const options = { userId, includeArchived: true };

useEffect(() => {
  fetchTasks(options);
}, [options]);
```

Three ways out, in order of preference:

```jsx
// 1. Move the object inside the effect, depend on primitives
useEffect(() => {
  const options = { userId, includeArchived: true };
  fetchTasks(options);
}, [userId]);

// 2. Memoize the object (only if it must live outside)
const options = useMemo(() => ({ userId, includeArchived: true }), [userId]);

// 3. Memoize functions passed down as props
const handleChange = useCallback((v) => { /* … */ }, []);
```

Same rule applies to functions and arrays declared in the component body — every render creates a new reference.

---

## 🕰️ Stale Closures

An effect captures the values from the render it was created in. If the dependency array doesn't include a value the effect reads, the effect keeps seeing the *old* one forever.

```jsx
// ❌ `count` is frozen at 0 from the first render. The interval always sets 1.
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []);

// ✅ Functional updater — reads the latest value, no dependency needed
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(id);
}, []);
```

The functional updater (`setState(prev => …)`) is the standard escape hatch: it lets you drop a dependency honestly rather than lying to the linter.

---

## ⏱️ `useEffect` vs `useLayoutEffect`

| Hook | Timing | Use when |
|---|---|---|
| `useEffect` | **After** the browser paints. Asynchronous, non-blocking. | 99% of cases |
| `useLayoutEffect` | **After** DOM mutation, **before** paint. Blocks painting. | You must measure the DOM and adjust before the user sees a flicker — tooltip positioning, scroll restoration |
| `useInsertionEffect` | Before DOM mutation | CSS-in-JS library authors only |

`useLayoutEffect` blocks the browser, so overusing it hurts performance. It also doesn't run during SSR and will warn — guard it or use `useEffect` on the server.

**Symptom that means you want `useLayoutEffect`:** a visible flash of the wrong position/size before it corrects itself.

---

## 📡 `useSyncExternalStore`

For subscribing to something outside React — a browser API, a Redux-like store, `localStorage`, media queries — this is the purpose-built hook. It's tear-free, SSR-aware, and avoids the mount-then-update flash.

The `WindowWidth` example above is actually its textbook case:

```jsx
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function WindowWidth() {
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,        // client snapshot
    () => 1024                      // server snapshot (SSR fallback)
  );

  return <p>Window width: {width}px</p>;
}
```

Not a replacement for `useEffect` generally — just strictly better for the "subscribe to an external source and read its value" shape.

---

## 🎯 Effect Events (`useEffectEvent`)

A recurring frustration: an effect needs to *read* a value without *re-running* when it changes.

```jsx
// ❌ Reconnects the chat every time the theme changes. Absurd.
useEffect(() => {
  const conn = createConnection(roomId);
  conn.on('connected', () => showToast('Connected!', theme));
  conn.connect();
  return () => conn.disconnect();
}, [roomId, theme]);
```

`useEffectEvent` extracts the non-reactive part — it always sees the latest values but never appears in the dependency array:

```jsx
const onConnected = useEffectEvent(() => {
  showToast('Connected!', theme);   // reads latest theme
});

useEffect(() => {
  const conn = createConnection(roomId);
  conn.on('connected', onConnected);
  conn.connect();
  return () => conn.disconnect();
}, [roomId]);   // theme is correctly absent
```

> **Version check:** this has spent a long time in canary/experimental and has landed in recent React 19.x releases. Confirm it exists in your installed version before relying on it. The `useRef`-holding-the-latest-callback pattern is the manual equivalent if it isn't available.

---

## 🧩 Extract Effects into Custom Hooks

Once an effect has a name, it stops being a mystery. A component full of raw `useEffect` blocks is much harder to read than one calling `useChatRoom(roomId)`.

```jsx
function useDebouncedValue(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);   // cancel on every keystroke
  }, [value, delay]);

  return debounced;
}

// Usage — one search request after typing stops, not one per character
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    if (debouncedQuery) searchAPI(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

---

## 📖 Quick Cookbook

**Document title**
```jsx
useEffect(() => { document.title = `${count} unread`; }, [count]);
```

**Sync state to `localStorage`**
```jsx
useEffect(() => {
  localStorage.setItem('prefs', JSON.stringify(prefs));
}, [prefs]);
```
Reading it back belongs in the lazy initializer, not an effect: `useState(() => JSON.parse(localStorage.getItem('prefs')) ?? {})`.

**Interval timer**
```jsx
useEffect(() => {
  const id = setInterval(() => setTicks(t => t + 1), 1000);
  return () => clearInterval(id);
}, []);
```

**Close a dropdown on outside click**
```jsx
useEffect(() => {
  if (!isOpen) return;   // early return is fine — nothing set up, nothing to clean

  const onClick = (e) => {
    if (!ref.current?.contains(e.target)) setIsOpen(false);
  };
  document.addEventListener('mousedown', onClick);
  return () => document.removeEventListener('mousedown', onClick);
}, [isOpen]);
```

---

## ⚠️ Rules & Best Practices

1. **Top level only.** Call `useEffect` at the top level of your component or custom hook — never inside loops, conditions, or nested functions. React tracks hooks by call order.

2. **Include all reactive dependencies.** Every prop, state value, or derived value the effect reads must be in the array. Omitting them causes stale-data bugs.

3. **Never silence the linter.** `react-hooks/exhaustive-deps` is right almost every time. If you're tempted to add `// eslint-disable-next-line`, the real fix is one of: use a functional updater, move the value inside the effect, memoize the dependency, or extract an Effect Event. A disable comment is a bug with a note attached.

4. **Don't fetch directly in the component body.** Async work during render triggers infinite loops and blocks rendering.

5. **Always clean up subscriptions, timers, and listeners.** No cleanup means memory leaks and duplicate handlers.

6. **Don't set state unconditionally in an effect that depends on that state.** That's an infinite loop.

7. **`refs` are not reactive.** Mutating `ref.current` won't re-run an effect, and refs don't belong in dependency arrays. That's often exactly what you want.

8. **`"use client"` in Next.js / RSC frameworks.** Hooks including `useEffect` only run in Client Components. Add the directive at the top of the file.

9. **The React Compiler doesn't remove effects.** It automates memoization (`useMemo`/`useCallback`), which reduces the *dependency-reference* class of bug. It does not decide whether your effect should exist. That's still on you.

---

## ✅ Before You Write an Effect

- [ ] Can this be calculated during render instead? → don't use an effect
- [ ] Is this responding to a user action? → put it in the event handler
- [ ] Am I resetting state on a prop change? → use a `key` instead
- [ ] Am I subscribing to an external store? → `useSyncExternalStore`
- [ ] Does it set up anything ongoing? → return a cleanup function
- [ ] Would running it twice in a row break anything? → fix the cleanup
- [ ] Does it fetch? → handle the race condition with `ignore` or `AbortController`
- [ ] Is every value it reads in the dependency array?
- [ ] Are any dependencies objects/arrays/functions created during render?
- [ ] Is the linter silent without a disable comment?