---
title: React Passing Functions as Props
tags: [react, props, components, events]
created: 2026-09-07
related: ["[[React Updater Functions]]", "[[React Arrays in State]]", "[[React Objects in State]]"]
---

# Passing Functions as Props

Data flows **down** in React (parent → child via props). Functions are how information flows back **up**: the parent hands the child a function, the child calls it, and the parent decides what to do.

The child doesn't know or care what happens next. It just reports "the button was clicked" or "delete this item." All the state stays with the parent.

> [!note] This pattern has a name
> Moving state to the closest common parent so children can share it is called **lifting state up**. Passing functions down is the second half of it — the part that lets the children write back.

---

## 1. No parameters

Pass the function **reference**, not a call.

```jsx
// Parent.jsx
import Child from "./Child";

function Parent() {
  const handleAlert = () => {
    alert("Button clicked inside the child component!");
  };

  return <Child onButtonClick={handleAlert} />;
}
```

```jsx
// Child.jsx
function Child({ onButtonClick }) {
  return <button onClick={onButtonClick}>Click Me</button>;
}
```

`onButtonClick={handleAlert}` hands over the function itself. `onButtonClick={handleAlert()}` would call it during render and pass the *return value* instead.

---

## 2. Passing arguments back up

When the child needs to send data, wrap the call in an inline arrow function.

```jsx
// Parent.jsx
function Parent() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  const handleDelete = (itemToRemove) => {
    setItems(prev => prev.filter(item => item !== itemToRemove));
  };

  return <Child items={items} onDeleteItem={handleDelete} />;
}
```

```jsx
// Child.jsx
function Child({ items, onDeleteItem }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item}>
          {item}{" "}
          <button onClick={() => onDeleteItem(item)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

The arrow function is what gets registered as the click handler. It sits there doing nothing until the click, and only then calls `onDeleteItem(item)` — with `item` captured from the closure.

Note `setItems(prev => ...)` rather than `setItems(items.filter(...))` — the updater form avoids reading a stale snapshot. See [[React Updater Functions]].

---

## The immediate-invocation trap

```jsx
<button onClick={onDelete(id)}>   // ❌
```

This calls `onDelete(id)` **while rendering**, and assigns whatever it returns (usually `undefined`) as the click handler. Two consequences:

- The action fires the moment the component renders, not on click.
- Since `onDelete` sets state, that render triggers another render, which calls it again → **infinite loop**.

If the function *didn't* touch state you'd get no loop, just a silent bug: the action runs once at the wrong time and the button does nothing. Either way:

```jsx
<button onClick={() => onDelete(id)}>   // ✅
```

---

## The hidden event argument

React passes the event object as the first argument to any handler you attach directly:

```jsx
<button onClick={onButtonClick} />
// calls onButtonClick(eventObject)
```

Harmless when your function ignores its parameters. It bites when the parameter means something else:

```jsx
// ❌ passes the click event as the item to delete
<button onClick={onDeleteItem} />

// ❌ classic: setCount receives the event object
<button onClick={setCount} />

// ✅
<button onClick={() => onDeleteItem(item)} />
```

If you need both the event and your own data:

```jsx
<button onClick={(e) => onDeleteItem(e, item)} />
```

---

## Naming conventions

Two different prefixes, and they're not interchangeable:

| Role | Prefix | Example |
|---|---|---|
| The **prop** the child receives | `on` | `onDelete`, `onSubmit`, `onToggle` |
| The **function** the parent defines | `handle` | `handleDelete`, `handleSubmit` |

```jsx
// parent defines handleDelete, passes it as onDelete
<TaskCard onDelete={handleDelete} />
```

This mirrors native DOM events (`onClick`, `onChange`) and makes it obvious at a glance which side of the boundary you're on.

---

## Alternatives to the inline arrow

The inline arrow is the standard answer, but two others come up.

**Curried handler** — the parent returns a function pre-loaded with the argument:

```jsx
// Parent
const handleDelete = (id) => () => setItems(prev => prev.filter(i => i.id !== id));

// Child
<button onClick={onDelete(item.id)} />   // returns a function, doesn't run it
```

Reads oddly next to the trap above, but it's legitimate — `onDelete(id)` returns a handler here rather than performing the deletion.

**Push it into a child component** — often the cleanest fix. Give each row its own component so the argument comes from *its* props:

```jsx
function Item({ item, onDelete }) {
  const handleClick = () => onDelete(item.id);   // no inline arrow in JSX
  return <button onClick={handleClick}>Delete</button>;
}
```

---

## Passing the setter directly

You *can* pass `setItems` straight down:

```jsx
<Child setItems={setItems} />   // works, but think first
```

It's occasionally fine, but usually worse than a named handler: the child now needs to know the shape of the parent's state and how to update it correctly. Passing `onDelete` keeps that knowledge in the parent and leaves the child ignorant — which is what makes it reusable.

---

## Performance

Inline arrows create a new function object on every render. This is **fine** almost always — allocating a closure is trivially cheap.

It only matters when the child is wrapped in `React.memo`, because a new function reference makes the props "different" and defeats the memoisation entirely:

```jsx
const Row = React.memo(function Row({ item, onDelete }) { /* ... */ });

// ❌ new function each render -> Row re-renders anyway, memo wasted
<Row item={item} onDelete={() => handleDelete(item.id)} />

// ✅ stable reference
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id));
}, []);

<Row item={item} onDelete={handleDelete} />   // child calls onDelete(item.id)
```

Note the empty dependency array works here *because* the updater form means `handleDelete` doesn't close over `items`. Another payoff of `prev => ...`.

Don't reach for `useCallback` by default. Add it when you've memoised a child and measured a problem.

---

## When passing gets deep

Threading a function through three or four layers of components that don't use it is **prop drilling**. It works, but it's noisy and every intermediate component gets coupled to something it doesn't care about.

Escape hatches, in order of weight:

1. **Restructure** — can the deep component be passed as `children` instead, so it's created where the function already lives?
2. **Context** — `createContext` + `useContext` to skip the middle layers.
3. **`useReducer` + Context** — pass a single `dispatch` down instead of a dozen handlers. Scales much better once the number of actions grows.

```jsx
// instead of onAdd, onDelete, onToggle, onReorder...
<TaskList dispatch={dispatch} />
// child: dispatch({ type: "deleted", id })
```

---

## Quick reference

| Situation | Write |
|---|---|
| No arguments | `onClick={onAction}` |
| With arguments | `onClick={() => onAction(id)}` |
| Event + arguments | `onClick={(e) => onAction(e, id)}` |
| Never | `onClick={onAction(id)}` — runs during render |
| Prop name | `onSomething` |
| Handler name | `handleSomething` |
| Memoised child | `useCallback` the handler |
| Many layers deep | Context, or `dispatch` from `useReducer` |

---

## Sources

- [Responding to events — React docs](https://react.dev/learn/responding-to-events)
- [Sharing state between components — React docs](https://react.dev/learn/sharing-state-between-components)
- [Passing data deeply with context — React docs](https://react.dev/learn/passing-data-deeply-with-context)