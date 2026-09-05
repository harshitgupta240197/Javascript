# React — Complete Overview

> **What it is:** A free, open-source JavaScript **library** for building dynamic, interactive user interfaces.
> **Created by:** Facebook (Meta), open-sourced 2013. Now stewarded by the **React Foundation** under the Linux Foundation (announced Oct 2025).
> **Current version:** React 19 (19.2.x as of mid-2026). No React 20 announced.
> **Used for:** Single-page applications (SPAs), server-rendered apps, and — via React Native — mobile apps.

React's core idea: break the UI into small, isolated, reusable pieces of code, and let React figure out how to keep the screen in sync with your data.



## Table of Contents

1. [Core Concepts](#-core-concepts)
2. [Essential Terminology](#-essential-terminology)
3. [Hooks Reference](#-hooks-reference)
4. [How Rendering Actually Works](#-how-rendering-actually-works)
5. [Component Patterns](#-component-patterns)
6. [Data Fetching & Side Effects](#-data-fetching--side-effects)
7. [Forms](#-forms)
8. [Error Handling & Suspense](#-error-handling--suspense)
9. [What's New in Modern React](#-whats-new-in-modern-react)
10. [The Broader Ecosystem](#-the-broader-ecosystem)
11. [Tooling & Project Setup](#-tooling--project-setup)
12. [Common Pitfalls](#-common-pitfalls)
13. [React vs Other Frameworks](#-react-vs-other-frameworks)
14. [Version History](#-version-history)
15. [Learning Path](#-learning-path)
16. [Resources](#-resources)

---

## 🌟 Core Concepts

### Component-Based Architecture

UIs are split into independent, reusable building blocks called **components**. Think Lego bricks — build a `Button` once, reuse it everywhere.

```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

Components compose into trees. A page is a component made of components made of components.

### Declarative Programming

Instead of writing step-by-step instructions for *how* to update the DOM (imperative), you describe *what* the UI should look like for a given state. React works out the transition.

```js
// Imperative (vanilla JS) — you manage the steps
const el = document.getElementById("count");
el.textContent = count;
if (count > 10) el.classList.add("warning");

// Declarative (React) — you describe the result
<span className={count > 10 ? "warning" : ""}>{count}</span>
```

The mental model is often written as: **UI = f(state)**.

### The Virtual DOM & Reconciliation

Directly mutating the browser's real DOM is expensive. React keeps a lightweight in-memory representation (the **Virtual DOM**). When state changes:

1. React re-runs the component function to produce a new virtual tree.
2. It **diffs** the new tree against the previous one (**reconciliation**).
3. It computes the minimal set of real DOM operations and **commits** only those.

> ⚠️ **Nuance worth knowing:** the Virtual DOM is not inherently faster than hand-written DOM code. It's faster than *naive* re-rendering, and — more importantly — it makes declarative code *possible* without you paying a performance penalty. Frameworks like Svelte and Solid skip the VDOM entirely using compile-time reactivity.

### JSX (JavaScript XML)

A syntax extension that lets you write HTML-like markup inside JavaScript.

```jsx
const element = <h1 className="title">Hello World</h1>;
```

JSX is not HTML. It compiles down to function calls:

```js
// What the above actually becomes (roughly)
const element = jsx("h1", { className: "title", children: "Hello World" });
```

**JSX rules to remember:**

| Rule | Example |
|---|---|
| `class` → `className` | `<div className="box">` |
| `for` → `htmlFor` | `<label htmlFor="email">` |
| Attributes are camelCase | `onClick`, `tabIndex`, `strokeWidth` |
| Must return a single root | Wrap in `<>...</>` (Fragment) |
| Self-close every void tag | `<img />`, `<br />`, `<input />` |
| `{}` embeds any JS expression | `{user.name}`, `{items.length > 0 && <List />}` |
| Inline styles are objects | `style={{ color: "red", fontSize: 14 }}` |
| Comments inside JSX | `{/* like this */}` |

---

## 🧱 Essential Terminology

### Props

Short for "properties." Read-only data passed **down** from parent to child. A component must never mutate its own props.

```jsx
<UserCard name="Harshit" role="BI Engineer" />

function UserCard({ name, role }) {
  return <p>{name} — {role}</p>;
}
```

Special props: `children` (whatever is nested inside the tag) and `key` (see below).

### State

Data that is **local and mutable** to a component. When state updates, React re-renders that component and its children.

```jsx
const [count, setCount] = useState(0);
setCount(count + 1);        // fine for one-off updates
setCount(c => c + 1);       // safer — uses the latest value
```

**Props vs State:**

| | Props | State |
|---|---|---|
| Owned by | Parent | The component itself |
| Mutable? | No (read-only) | Yes (via setter) |
| Triggers re-render | When parent re-renders | When updated |
| Analogy | Function arguments | Function's local variables that persist |

### Hooks

Special functions (prefixed `use`) that let function components access React features. They replaced the older class-based architecture.

**The Rules of Hooks:**
1. Only call hooks at the **top level** — never inside loops, conditions, or nested functions.
2. Only call hooks from **React function components** or **custom hooks**.

Why? React tracks hooks by *call order*, not by name. Conditional calls shift the order and corrupt state.

### Unidirectional Data Flow

Data flows strictly parent → child. To send data *upward*, the parent passes down a callback:

```jsx
function Parent() {
  const [value, setValue] = useState("");
  return <Child onChange={setValue} />;   // child calls onChange to talk up
}
```

This predictability is the whole point — you can always trace where a piece of data came from.

### Keys

When rendering lists, each item needs a stable, unique `key` so React can match elements between renders.

```jsx
{tasks.map(task => <TaskRow key={task.id} task={task} />)}
```

> ⚠️ Never use array index as a key if the list can reorder, filter, or have items inserted — it causes state to attach to the wrong item.

### Lifting State Up

When two sibling components need the same data, move that state to their nearest common parent and pass it down. This is the default answer before reaching for a state library.

### Controlled vs Uncontrolled Components

- **Controlled:** React state is the single source of truth. `value={x}` + `onChange`.
- **Uncontrolled:** The DOM holds the value; you read it with a `ref` or via form data.

```jsx
// Controlled
<input value={email} onChange={e => setEmail(e.target.value)} />

// Uncontrolled
<input ref={inputRef} defaultValue="hello" />
```

### Pure Components

A React component should be a **pure function** of its props and state: same inputs → same JSX, no side effects during render. Mutating variables outside the component, writing to the DOM, or fetching data during render all break this contract. React's StrictMode double-invokes render in development specifically to surface impurity.

---

## 🪝 Hooks Reference

### State & Reducers

| Hook | Purpose |
|---|---|
| `useState` | Local component state |
| `useReducer` | State with complex transition logic (Redux-style, built in) |
| `useSyncExternalStore` | Subscribe to an external (non-React) store safely |

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "increment" });
```

### Side Effects

| Hook | Purpose |
|---|---|
| `useEffect` | Sync with external systems after render (subscriptions, timers, non-React DOM) |
| `useLayoutEffect` | Same, but fires synchronously before paint — for DOM measurement |
| `useInsertionEffect` | For CSS-in-JS libraries injecting styles |

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);   // cleanup — runs on unmount & before re-run
}, []);                              // dependency array
```

**Dependency array behaviour:**
- `[]` → run once on mount
- `[a, b]` → re-run whenever `a` or `b` changes
- omitted → run after *every* render

### Performance

| Hook | Purpose |
|---|---|
| `useMemo` | Cache an expensive computed value |
| `useCallback` | Cache a function identity across renders |
| `memo` (HOC, not a hook) | Skip re-rendering a component if props are unchanged |
| `useTransition` | Mark an update as non-urgent so it can be interrupted |
| `useDeferredValue` | Defer re-rendering of a slow part of the UI |

> 🆕 With **React Compiler** stable, `useMemo` / `useCallback` / `memo` are largely obsolete for new code — the compiler inserts memoization automatically.

### Refs & DOM

| Hook | Purpose |
|---|---|
| `useRef` | A mutable box that persists across renders without triggering re-renders |
| `useImperativeHandle` | Customise what a parent gets when it refs your component |

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />;
inputRef.current.focus();
```

In React 19, `ref` is a normal prop on function components — `forwardRef` is no longer required.

### Context

| Hook | Purpose |
|---|---|
| `useContext` | Read a value from the nearest matching Provider |

```jsx
const ThemeContext = createContext("light");

// React 19: <ThemeContext> works directly as the provider
<ThemeContext value="dark">
  <App />
</ThemeContext>

function Button() {
  const theme = useContext(ThemeContext);
}
```

Context solves **prop drilling** (passing props through many intermediate layers). It is *not* a state manager — every consumer re-renders when the value changes.

### Forms & Async (React 19)

| Hook | Purpose |
|---|---|
| `useActionState` | Manage form state + pending + errors from an action function |
| `useFormStatus` | Read the submit status of the enclosing form from a child |
| `useOptimistic` | Show an optimistic UI update while an async action is in flight |
| `use` | Read a Promise or Context — *can* be called conditionally |

### Custom Hooks

Any function starting with `use` that calls other hooks. This is React's primary code-reuse mechanism.

```jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

Custom hooks share *logic*, not *state* — each call gets its own independent state.

---

## ⚙️ How Rendering Actually Works

React's work happens in three phases:

1. **Trigger** — an update is scheduled (initial mount, or a `setState` call).
2. **Render** — React calls your component functions to build the new element tree, then diffs. *No DOM is touched here.* This phase is interruptible in Concurrent React.
3. **Commit** — React applies the minimal DOM mutations, then runs layout effects, paints, then runs passive effects (`useEffect`).

**Key facts people get wrong:**

- Calling `setState` does **not** update the variable immediately — it schedules a re-render. Reading the state right after the setter gives you the old value.
- Multiple `setState` calls in one event handler are **batched** into a single re-render (automatic batching, React 18+, including inside promises and timeouts).
- A parent re-rendering causes children to re-render by default, even if their props are identical — unless memoized (or the Compiler handles it).
- "Re-render" ≠ "DOM update." Most re-renders result in zero DOM changes after diffing.

---

## 🧩 Component Patterns

| Pattern | What it is | When to use |
|---|---|---|
| **Composition / `children`** | Pass JSX into a slot instead of configuring via props | Layouts, cards, modals, wrappers |
| **Custom Hooks** | Extract stateful logic into a reusable function | Shared behaviour across components |
| **Container / Presentational** | Split "fetches data" from "renders markup" | Testability; less common post-hooks |
| **Compound Components** | Related components sharing implicit state via context | `<Tabs>`, `<Tab>`, `<TabPanel>` |
| **Render Props** | Pass a function as a prop that returns JSX | Mostly superseded by hooks |
| **Higher-Order Component (HOC)** | Function that wraps a component and returns a new one | Legacy; hooks are preferred |
| **Portals** | Render into a DOM node outside the parent hierarchy | Modals, tooltips, dropdowns |

```jsx
// Composition beats configuration
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

---

## 🔄 Data Fetching & Side Effects

React itself has no opinion on data fetching. The options, in rough order of maturity:

1. **`useEffect` + `fetch`** — fine for learning, but you hand-roll loading states, errors, caching, race conditions, and refetching.
2. **TanStack Query (React Query)** — the de facto standard for server state. Caching, deduping, background refetch, stale-while-revalidate, mutations.
3. **SWR** — lighter alternative from Vercel.
4. **RTK Query** — if you're already on Redux Toolkit.
5. **Server Components / framework loaders** — fetch on the server before the component ever reaches the browser (Next.js, React Router 7).

> 📌 **The important distinction:** *server state* (data from an API — async, shared, cacheable, can go stale) is fundamentally different from *client state* (UI toggles, form drafts, modals). Using `useState`/Redux for server state is the single most common architectural mistake in React apps.

**The `useEffect` race condition trap:**

```jsx
useEffect(() => {
  let cancelled = false;
  fetch(`/api/user/${id}`)
    .then(r => r.json())
    .then(data => { if (!cancelled) setUser(data); });
  return () => { cancelled = true; };   // ignore stale responses
}, [id]);
```

---

## 📝 Forms

```jsx
// Classic controlled form
function LoginForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // submit
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}
```

```jsx
// React 19 Actions — pending state and errors handled for you
function LoginForm() {
  const [state, formAction, isPending] = useActionState(async (prev, formData) => {
    const res = await login(formData.get("email"));
    return res.error ? { error: res.error } : { success: true };
  }, null);

  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={isPending}>{isPending ? "..." : "Log in"}</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

**Libraries:** React Hook Form (performance-focused, uncontrolled by default) + Zod (schema validation) is the common pairing for anything non-trivial.

---

## 🛡️ Error Handling & Suspense

### Error Boundaries

Components that catch JavaScript errors in their child tree and render a fallback instead of crashing the whole app. Currently only available as class components (or via `react-error-boundary`).

```jsx
<ErrorBoundary fallback={<p>Something went wrong.</p>}>
  <Dashboard />
</ErrorBoundary>
```

They do **not** catch errors in event handlers, async code, or SSR — use `try/catch` there.

### Suspense

Declaratively show a fallback while something is loading — lazy-loaded components, or data in a Suspense-enabled framework.

```jsx
const Settings = lazy(() => import("./Settings"));

<Suspense fallback={<Spinner />}>
  <Settings />
</Suspense>
```

Combined with **code splitting**, this is how you keep initial bundle size down.

---

## 🚀 What's New in Modern React

React 19 (stable since Dec 2024) shifted the emphasis toward automated performance and server integration.

### React Compiler

A build-time tool that automatically memoizes components and hooks — no rewrites needed. It reached **stable 1.0 in October 2025**, works with React and React Native, supports React 17+, and is battle-tested on Meta's production apps. Meta has reported meaningful improvements in load and interaction performance from adoption.

Practically: you stop writing `useMemo` and `useCallback` by hand and just write the straightforward logic.

```jsx
// Before: manual memoization
const activeUsers = useMemo(() => users.filter(u => u.isActive), [users]);

// After: compiler handles it
const activeUsers = users.filter(u => u.isActive);
```

The compiler's lint rules ship inside `eslint-plugin-react-hooks`, so linting and compiling share one source of truth. Expo, Vite, and Next.js can all start new apps with it enabled.

> ⚠️ Pin an exact compiler version if your test coverage is thin — memoization behaviour can shift on a patch bump.

### Server Components (RSC)

Components that render on the server, ahead of bundling — at build time or per request. They ship zero JavaScript to the client, can query a database directly, and improve initial load and SEO. **Server Functions** marked `"use server"` are callable directly from Client Components.

The asterisk: Server Components are stable and won't break between minors, but the *bundler-facing* APIs used to implement them don't follow semver and can break between 19.x minors. Pin your React version if you maintain that layer.

Everything else is a **Client Component** — opt in with `"use client"` at the top of the file when you need state, effects, or event handlers.

### Actions

A unified way to handle data mutations, async operations, and form submissions — with pending states, errors, and optimistic updates built in. Backed by `useActionState`, `useFormStatus`, and `useOptimistic`.

### Other React 19 changes worth knowing

- `ref` is now a regular prop — `forwardRef` is no longer needed.
- `<Context>` can be used directly as a provider instead of `<Context.Provider>`.
- Document metadata (`<title>`, `<meta>`, `<link>`) can be rendered anywhere and gets hoisted to `<head>`.
- Better hydration error messages with a diff of what mismatched.
- `ref` callbacks can return a cleanup function.
- Improved support for custom elements / Web Components.

---

## 🛠️ The Broader Ecosystem

React is a **UI library**, not a framework. Real applications assemble a stack:

### Frameworks (routing + SSR + build)

| Tool | Notes |
|---|---|
| **Next.js** | Most popular. App Router, RSC, file-based routing, deep Vercel integration |
| **React Router 7 / Remix** | Web-standards-first; Remix merged into React Router |
| **TanStack Start** | Newer, type-safe full-stack framework |
| **Astro** | Content-focused; ships React islands with minimal JS |
| **Expo** | The standard framework for React Native |

### Routing (without a framework)

- React Router — the long-standing default
- TanStack Router — fully type-safe routing and search params

### State Management

| Tool | Best for |
|---|---|
| `useState` / `useReducer` / Context | Start here — most apps never need more |
| **Zustand** | Small, simple global client state. Very popular default |
| **Jotai / Recoil** | Atomic state model |
| **Redux Toolkit** | Large apps, strict conventions, excellent devtools |
| **XState** | Complex state machines and workflows |
| **TanStack Query** | Server state (not a general state manager — use alongside) |

### Styling

- **Tailwind CSS** — utility-first; dominant in modern React
- **CSS Modules** — scoped CSS, zero runtime
- **styled-components / Emotion** — CSS-in-JS (declining, poor RSC fit)
- **vanilla-extract** — type-safe zero-runtime CSS

### Component Libraries

**shadcn/ui** (copy-paste, Radix + Tailwind), **MUI**, **Mantine**, **Chakra UI**, **Ant Design**, **Radix UI** / **React Aria** (headless, accessibility-first).

### Beyond the Web

- **React Native** — native iOS and Android from React skills
- **React Three Fiber** — Three.js in React
- **Ink** — React for command-line interfaces
- **Electron / Tauri** — desktop apps

### Testing

- **Vitest** / **Jest** — test runners
- **React Testing Library** — test behaviour, not implementation
- **Playwright** / **Cypress** — end-to-end
- **MSW** — mock the network layer

---

## 📦 Tooling & Project Setup

```bash
# Recommended: Vite
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev

# Full-stack framework
npx create-next-app@latest

# Mobile
npx create-expo-app@latest
```

> ⚠️ **Create React App (CRA) is deprecated.** The React team no longer recommends it. Use Vite for SPAs or a framework like Next.js for anything server-rendered.

**Typical supporting tooling:** TypeScript, ESLint (with `eslint-plugin-react-hooks`), Prettier or Biome, and React DevTools (browser extension — includes a Profiler for finding slow renders).

---

## ⚠️ Common Pitfalls

| Pitfall | Fix |
|---|---|
| Mutating state directly (`arr.push(x)`) | Create new values: `setArr([...arr, x])` |
| Using array index as `key` in dynamic lists | Use a stable unique ID |
| Missing `useEffect` dependencies | Trust the lint rule; don't silence it |
| Infinite effect loops (object/array in deps) | Memoize the dependency or move it inside |
| Stale closures capturing old state | Use the functional updater: `setX(prev => ...)` |
| `useEffect` for derived data | Just compute it during render |
| Fetching in `useEffect` without cleanup | Cancel with a flag or `AbortController` |
| Using state for values that don't affect UI | Use `useRef` |
| Prop drilling five levels deep | Context, composition, or lift differently |
| Premature `useMemo` everywhere | Measure first; or let the Compiler do it |
| Effects firing twice in dev | That's StrictMode surfacing missing cleanup — fix the effect |
| Storing server data in Redux | Use TanStack Query |

---

## ⚖️ React vs Other Frameworks

| | React | Vue | Angular | Svelte | Solid |
|---|---|---|---|---|---|
| Type | Library | Framework (progressive) | Full framework | Compiler | Library |
| Learning curve | Moderate | Gentle | Steep | Gentle | Moderate |
| Reactivity | Re-run component, VDOM diff | Proxy-based, VDOM | Zone.js / Signals | Compile-time | Fine-grained signals |
| Templating | JSX | SFC templates | HTML templates + TS | `.svelte` files | JSX |
| Bundle size | Medium | Medium | Large | Very small | Very small |
| Job market | Largest | Strong | Strong (enterprise) | Growing | Niche |

**Why React usually wins the pick:** ecosystem depth, hiring pool, React Native, and the sheer volume of learning material. **Where it loses:** it's unopinionated, so you assemble your own stack and inherit those decisions.

---

## 📅 Version History

| Version | Date | Highlights |
|---|---|---|
| 0.3 | 2013 | Initial open-source release |
| 15 | 2016 | Last pre-Fiber architecture |
| 16 | 2017 | Fiber rewrite, Error Boundaries, Portals, Fragments |
| 16.8 | 2019 | **Hooks** — the biggest shift in React's history |
| 17 | 2020 | "No new features" — gradual upgrade enabler |
| 18 | 2022 | Concurrent rendering, automatic batching, `useTransition`, Suspense SSR |
| 19 | Dec 2024 | Actions, `use`, ref as prop, metadata hoisting, stable RSC |
| Compiler 1.0 | Oct 2025 | Automatic memoization, stable |
| 19.2.x | 2025–2026 | Ongoing patches; current line |

---

## 🎯 Learning Path

**Prerequisites — do not skip:** modern JavaScript (ES6+), especially destructuring, spread/rest, arrow functions, `map`/`filter`/`reduce`, promises and `async/await`, modules, and template literals. Most "React is hard" complaints are actually JavaScript gaps.

1. **Fundamentals** — JSX, components, props, `useState`, conditional rendering, lists and keys, event handling
2. **Effects & lifecycle** — `useEffect`, cleanup, dependency arrays, the render/commit cycle
3. **Forms** — controlled inputs, validation, submission
4. **Composition** — `children`, lifting state, splitting components well
5. **Routing** — React Router; nested routes, params, navigation
6. **Data fetching** — start with `fetch` + effects, then move to TanStack Query
7. **State at scale** — Context, then Zustand or Redux Toolkit if genuinely needed
8. **Performance** — the Profiler, code splitting, `lazy` + `Suspense`
9. **TypeScript with React** — typing props, hooks, events, generics
10. **A framework** — Next.js or React Router 7, plus Server Components
11. **Testing** — React Testing Library
12. **Ship something real** — a CRUD app with auth, a database, and deployment

> The single highest-leverage habit: build a real project you actually use. Tutorial completion correlates weakly with capability; debugging your own broken app correlates strongly.

---

## 📚 Resources

**Official**
- [react.dev](https://react.dev) — the rewritten docs; genuinely excellent, start here
- [React Blog](https://react.dev/blog) — release notes and RFCs
- [React GitHub](https://github.com/facebook/react)

**Learning**
- react.dev's own "Learn React" tutorial and challenges
- Josh Comeau — *The Joy of React*
- Kent C. Dodds — *Epic React*
- Dan Abramov's *Overreacted* blog (deep mental models)

**Reference**
- [Patterns.dev](https://www.patterns.dev/react/)
- [TanStack Query docs](https://tanstack.com/query)
- [Next.js docs](https://nextjs.org/docs)

---

## Sources (from original)

- [GeeksforGeeks — ReactJS Introduction](https://www.geeksforgeeks.org/reactjs/reactjs-introduction/)
- [Code Institute — What is React JS](https://codeinstitute.net/global/blog/what-is-react-js/)
- [Patterns.dev — React](https://www.patterns.dev/react/)
- [Strapi — What is React JS](https://strapi.io/blog/what-is-react-js)
- [Sanity Glossary — React JS](https://www.sanity.io/glossary/react-js)
- [W3Schools — React Intro](https://www.w3schools.com/react/react_intro.asp)
- [dev.to — Everything About React JS](https://dev.to/pratham10/everything-about-react-js-a-comprehensive-guide-about-react-including-concepts-and-examples-1534)
- [Scrimba — React 19: What's New for Developers (2026)](https://scrimba.com/articles/react-19-whats-new-for-developers/)
- [React Compiler v1.0 announcement](https://react.dev/blog/2025/10/07/react-compiler-1)
- [React Versions](https://react.dev/versions)