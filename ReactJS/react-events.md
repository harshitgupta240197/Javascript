# Handling Events in React

React event handling looks a lot like DOM event handling, with a few syntax and architectural differences. Handlers let your UI respond to clicks, typing, form submissions, keyboard input, and focus changes.

---

## Core Concepts & Syntax

### 1. camelCase naming

| HTML | React |
| --- | --- |
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `onsubmit` | `onSubmit` |
| `onmouseenter` | `onMouseEnter` |

### 2. Pass the function reference, don't call it

In JSX you pass a function inside curly braces, not a string. Omit the parentheses, or the function runs during render instead of on click.

```jsx
<button onClick={handleClick}>Click Me</button>     // ✅ reference
<button onClick={handleClick()}>Click Me</button>   // ❌ runs at render time
```

The failure mode is confusing: the handler fires immediately on mount, and if it calls `setState` you get an infinite render loop. If you need to pass arguments, wrap it in an arrow function (see below).

### 3. Synthetic events

React wraps the browser's native event in a `SyntheticEvent` — a normalised object with the same API across browsers. `e.target`, `e.preventDefault()`, `e.stopPropagation()` all work as expected. The real browser event is available at `e.nativeEvent` if you ever need it.

Under the hood React doesn't attach a listener to each element. It attaches one listener per event type at the root container and delegates, which is why handlers are cheap even on large lists.

### ⚠️ `e.persist()` is obsolete

Older tutorials tell you to call `e.persist()` before using an event asynchronously, because React pooled and reused event objects. **Pooling was removed in React 17.** You can hold onto an event object freely now. If you see `e.persist()` in a tutorial, that tutorial predates 2020.

---

## `e.target` vs `e.currentTarget`

This distinction causes real bugs and gets skipped in most introductions.

- **`e.target`** — the element that actually triggered the event. Could be a nested `<span>` or `<svg>` inside your button.
- **`e.currentTarget`** — the element the handler is attached to. Always what you expect.

```jsx
<button onClick={(e) => {
  console.log(e.target);        // maybe the <span>, if the user clicked the text
  console.log(e.currentTarget); // always the <button>
}}>
  <span>Click Me</span>
</button>
```

Rule of thumb: **`e.target` for reading input values, `e.currentTarget` for identifying the element you attached to.**

---

## Naming conventions

Worth adopting early — it's what every React codebase does:

- **`handleX`** for the function definition: `handleClick`, `handleSubmit`, `handleNameChange`
- **`onX`** for the prop when passing a handler to your own component: `onDelete`, `onSelect`

```jsx
function TaskRow({ task, onDelete }) {
  return <button onClick={() => onDelete(task.id)}>Delete</button>;
}

function TaskList({ tasks }) {
  const handleDelete = (id) => setTasks(ts => ts.filter(t => t.id !== id));
  return tasks.map(t => <TaskRow key={t.id} task={t} onDelete={handleDelete} />);
}
```

`onClick` on a `<button>` is a real DOM event. `onDelete` on `<TaskRow>` is just a prop that happens to hold a function — React gives it no special treatment.

---

## Common Events

| Event | Fires when |
| --- | --- |
| `onClick` | An element is clicked |
| `onChange` | An input, checkbox, or select value changes |
| `onSubmit` | A form is submitted |
| `onKeyDown` / `onKeyUp` | A key is pressed / released |
| `onFocus` / `onBlur` | An element gains / loses focus |
| `onMouseEnter` / `onMouseLeave` | Pointer enters / leaves (these don't bubble) |
| `onDoubleClick` | Double click |
| `onContextMenu` | Right click |

### ⚠️ React's `onChange` is not HTML's `onchange`

In plain HTML, `change` fires when the input loses focus. React's `onChange` fires on **every keystroke** — it's wired to the native `input` event. This is deliberate and is what makes controlled inputs work. If you genuinely want the on-blur behaviour, use `onBlur`.

---

## Code Examples

### Separate handler function

```jsx
function ClickButton() {
  const handleClick = (event) => {
    console.log(event.currentTarget);
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Inline handler

Fine for short, single-line actions.

```jsx
<button onClick={() => setCount(count + 1)}>Increment</button>
```

### Passing arguments

Wrap in an arrow function so it only runs on click:

```jsx
function ItemList({ items }) {
  const deleteItem = (id) => console.log(`Deleting ${id}`);

  return items.map(item => (
    <button key={item.id} onClick={() => deleteItem(item.id)}>
      Delete
    </button>
  ));
}
```

If you need both the argument and the event:

```jsx
<button onClick={(e) => deleteItem(item.id, e)}>Delete</button>
```

**On performance:** inline arrows create a new function each render. This is fine in almost every case — don't contort your code to avoid it. It only matters when passing handlers to `React.memo`'d children, where a new function reference defeats the memoisation. `useCallback` exists for that specific case, not as a default habit.

---

## ⚠️ The stale closure trap

A handler captures the values from the render it was created in. Update state based on its previous value and you can read a stale one:

```jsx
// ❌ Both calls see the same `count` — increments by 1, not 2
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
};

// ✅ Updater function always receives the latest value
const handleClick = () => {
  setCount(c => c + 1);
  setCount(c => c + 1);
};
```

**Rule: whenever the next state depends on the previous state, use the updater function form.** This bites hardest inside `setTimeout`, async handlers, and event listeners added in `useEffect`.

---

## Forms

Put `onSubmit` on the `<form>`, not `onClick` on the button. That way Enter-to-submit works, which matters for both usability and accessibility.

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();          // stop the page reload
    console.log('Submitting', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
}
```

Two things that trip people up:

- **Every `<button>` inside a form defaults to `type="submit"`.** A "Cancel" or "Add row" button that submits your form unexpectedly needs `type="button"`.
- **Without `e.preventDefault()` the page reloads** and your state is wiped, which looks like "my form doesn't work."

### Reading many fields at once

Instead of a `useState` per field, `FormData` reads the whole form:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));
  console.log(data);   // { email: '...', password: '...' }
};
```

Each input needs a `name` attribute. Handy for larger forms where controlled state per field is overkill.

---

## Propagation and Default Behaviour

### Stopping bubbling

Events bubble up through parents. If a card and a button inside it both have click handlers, clicking the button fires both.

```jsx
const handleButtonClick = (e) => {
  e.stopPropagation();   // parent's onClick won't fire
  console.log('Button clicked');
};
```

Common real case: a delete button inside a clickable card, where you don't want the card's navigate-on-click to also fire.

### Capture phase

Add `Capture` to the event name to run a handler on the way *down* the tree, before it reaches the target:

```jsx
<div onClickCapture={handleCapture}>
  <button onClick={handleClick}>Click</button>
</div>
```

`handleCapture` runs first. Rare, but useful for analytics or intercepting clicks globally.

### Preventing default behaviour

```jsx
const handleSubmit = (e) => {
  e.preventDefault();   // stop the form reloading the page
};

<a href="/docs" onClick={(e) => e.preventDefault()}>Won't navigate</a>
```

`preventDefault()` cancels the browser's built-in action. `stopPropagation()` cancels the journey up the tree. They are unrelated — don't reach for one expecting the other.

---

## Keyboard events

```jsx
<input
  onKeyDown={(e) => {
    if (e.key === 'Enter') submit();
    if (e.key === 'Escape') cancel();
  }}
/>
```

Use `e.key` (a readable string like `'Enter'`, `'a'`, `'ArrowUp'`). `e.keyCode` is deprecated. Modifier flags are available as `e.shiftKey`, `e.ctrlKey`, `e.metaKey`, `e.altKey`.

---

## Accessibility: use the right element

```jsx
<div onClick={handleClick}>Delete</div>       // ❌ not focusable, no keyboard, no screen-reader role
<button onClick={handleClick}>Delete</button>  // ✅
```

A `<div>` with `onClick` cannot be tabbed to and doesn't respond to Enter or Space. If you absolutely must make a non-interactive element clickable you'd need `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler — at which point you should have used a `<button>`. Same for navigation: use `<a>` or a router `<Link>`, not a `div` with an `onClick` that calls `navigate()`.

---

## Quick checklist

- [ ] Passing the reference, not calling it — no `()` unless wrapping in an arrow
- [ ] `e.target.value` for input values; `e.currentTarget` to identify the element
- [ ] `e.preventDefault()` in every form `onSubmit`
- [ ] `onSubmit` on the `<form>`, not `onClick` on the button
- [ ] Updater function `setX(prev => ...)` whenever new state depends on old
- [ ] `<button>` for click targets, not `<div>`
- [ ] Not using `e.persist()` — that advice is five years out of date

---

## Sources

- [React docs — Responding to Events](https://react.dev/learn/responding-to-events)
- [React docs — SyntheticEvent reference](https://react.dev/reference/react-dom/components/common#react-event-object)
- [React 17 release notes — no more event pooling](https://legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html#no-event-pooling)
- [Legacy React docs — Handling Events](https://legacy.reactjs.org/docs/handling-events.html)
- [MDN — `KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
- [MDN — `FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [GeeksforGeeks — React JS Events](https://www.geeksforgeeks.org/reactjs/react-js-events/)