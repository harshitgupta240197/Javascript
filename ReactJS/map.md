# Rendering Lists in React

To render an array in React you use the plain JavaScript `.map()` method inside JSX. It loops through the array and transforms each item into a JSX element. React accepts an array of elements as a valid child, so the result drops straight into your markup.

---

## 1. Rendering a Simple Array (Strings or Numbers)

```jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

  return (
    <div>
      <h2>My Fruit List</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default FruitList;
```

Note the key here is `fruit`, not `index` — for a list of unique strings the value itself is a perfectly good stable key. Reach for `index` only when there's genuinely nothing else (see the keys section below).

---

## 2. Rendering an Array of Objects

In real apps the data is almost always objects, and objects usually carry an `id` — which is exactly the stable key you want.

```jsx
function UserList() {
  const users = [
    { id: 1, name: 'John Doe',  role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer'  },
    { id: 3, name: 'Alex Jones', role: 'Manager'   },
  ];

  return (
    <div className="user-container">
      <h2>Team Members</h2>
      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <h3>{user.name}</h3>
          <p>Role: {user.role}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 3. Extract the Row into Its Own Component

Once a row has more than a few lines of markup, pull it out. Note where the `key` goes — **on the element inside `map()`**, not inside the child component.

```jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Role: {user.role}</p>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### ⚠️ `key` is not a prop

`key` is consumed by React itself and is **not** forwarded to your component. Inside `UserCard`, `props.key` is `undefined`. If you need the value, pass it separately:

```jsx
<UserCard key={user.id} id={user.id} user={user} />
```

---

## Why `.map()` and not `.forEach()`

`.map()` returns a new array; `.forEach()` returns `undefined`. JSX needs a value, so `forEach` renders nothing at all — a silent blank section with no error.

```jsx
{items.forEach(item => <li>{item}</li>)}  // ❌ renders nothing
{items.map(item => <li>{item}</li>)}      // ✅
```

Same trap with a `for` loop inside JSX — statements aren't expressions. If you must use a loop, build the array above the `return` and interpolate the variable.

---

## Keys: the rules that actually matter

A `key` gives each element a stable identity so React can tell "this row moved" apart from "this row's content changed."

- **Unique among siblings only.** Two different lists on the same page can both use keys `1, 2, 3`. It doesn't need to be globally unique.
- **Stable across renders.** The same item must get the same key every time.
- **Goes on the outermost element** returned by the `map()` callback.

### ⚠️ Never generate keys at render time

```jsx
{items.map(item => <Row key={Math.random()} item={item} />)}  // ❌
{items.map(item => <Row key={crypto.randomUUID()} item={item} />)}  // ❌
```

Every render produces new keys, so React unmounts and remounts every row on every render. You lose all component state, all focus, all scroll position, and you get worse performance than having no key at all. If your data genuinely lacks IDs, generate them **once** when the data is created, not during render.

### ⚠️ Why index keys break — concretely

The advice "only use `index` for static lists" is right, but here's the actual failure mode. Say you render a list of inputs keyed by index:

```jsx
{todos.map((todo, index) => (
  <li key={index}>
    <input defaultValue={todo.text} />
  </li>
))}
```

You type into the third input, then delete the **first** todo. React sees keys `0, 1, 2` before and `0, 1` after — so it thinks the last item was removed and the first two just changed their props. The DOM nodes stay put, and your typed text is now sitting next to the wrong todo. Same bug with checkbox states, focus, and CSS animations.

With `key={todo.id}`, React sees that key `1` disappeared and removes precisely that node.

**Index keys are safe when** the list is never reordered, filtered, prepended to, or deleted from, and the items hold no internal state. That's rarer than it sounds.

---

## Handling the empty case

`[].map()` returns `[]`, which renders nothing — so an empty list silently shows blank markup. Handle it explicitly:

```jsx
function UserList({ users }) {
  if (users.length === 0) {
    return <p className="empty">No team members yet.</p>;
  }

  return <div>{users.map(u => <UserCard key={u.id} user={u} />)}</div>;
}
```

Inline version:

```jsx
{users.length > 0
  ? users.map(u => <UserCard key={u.id} user={u} />)
  : <p>No team members yet.</p>}
```

### ⚠️ The `0` trap

```jsx
{users.length && <UserList users={users} />}   // ❌ renders a literal "0"
{users.length > 0 && <UserList users={users} />}  // ✅
```

`&&` returns the left operand when it's falsy, and React renders the number `0`. Always make the left side a real boolean.

---

## Filtering, sorting and chaining

`.filter()` returns an array too, so it chains naturally before `.map()`:

```jsx
{users
  .filter(user => user.role === 'Developer')
  .map(user => <UserCard key={user.id} user={user} />)}
```

### ⚠️ `sort()` and `reverse()` mutate in place

Calling `.sort()` on a prop or a state array mutates the original. With state that means React may not detect a change, and you get subtle bugs where the UI doesn't update. Copy first:

```jsx
{[...users].sort((a, b) => a.name.localeCompare(b.name))
           .map(u => <UserCard key={u.id} user={u} />)}
```

Modern alternative — `toSorted()` and `toReversed()` return a new array and are safe to call directly:

```jsx
{users.toSorted((a, b) => a.name.localeCompare(b.name))
      .map(u => <UserCard key={u.id} user={u} />)}
```

(Available in all current browsers and Node 20+.)

---

## Conditional rendering inside `map()`

Return `null` to skip an item without breaking the loop:

```jsx
{users.map(user =>
  user.isActive ? <UserCard key={user.id} user={user} /> : null
)}
```

Usually `.filter()` before `.map()` reads better, but `null` is useful when the decision needs data you compute inside the callback.

---

## Keyed Fragments

When each item needs multiple sibling elements with no wrapper — a `<dl>`, or table cells — you need a Fragment that can hold a key. The shorthand `<>` **cannot** take one, so use the long form:

```jsx
import { Fragment } from 'react';

{entries.map(entry => (
  <Fragment key={entry.id}>
    <dt>{entry.term}</dt>
    <dd>{entry.definition}</dd>
  </Fragment>
))}
```

---

## Nested lists

Each level needs its own keys; the inner keys only need to be unique within their own list.

```jsx
{categories.map(category => (
  <section key={category.id}>
    <h2>{category.name}</h2>
    <ul>
      {category.items.map(item => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  </section>
))}
```

---

## Implicit vs. Explicit Return

If the arrow body uses curly braces `{}`, you must write `return`. Parentheses `()` or a single-line body return implicitly.

```jsx
// Implicit return — parentheses wrap the JSX
users.map(user => (
  <p key={user.id}>{user.name}</p>
))

// Explicit return — braces open a function body
users.map(user => {
  const label = `${user.name} (${user.role})`;
  return <p key={user.id}>{label}</p>;
})
```

Forgetting the `return` in the braces version is one of the most common React bugs — it renders nothing, with no error. Use the braces form when you need to compute something first; otherwise stick with parentheses.

---

## A note on long lists

`.map()` renders every item. At a few hundred rows that's fine; at several thousand it will visibly stall. At that point paginate, or use windowing (`react-window` / `@tanstack/react-virtual`) which renders only the rows currently on screen. Not something to reach for early — just know the ceiling exists.

---

## Quick checklist

- [ ] Using `.map()`, not `.forEach()` or a `for` loop
- [ ] `key` on the outermost element inside the callback
- [ ] Key is a stable ID, not an index or `Math.random()`
- [ ] Empty state handled, and the `&&` left side is a boolean
- [ ] `sort()` / `reverse()` called on a copy, not on state
- [ ] `return` present if the arrow body uses `{}`

---

## Sources

- [React docs — Rendering Lists](https://react.dev/learn/rendering-lists)
- [React docs — Keeping list items in order with `key`](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
- [React docs — Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [MDN — `Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN — `Array.prototype.toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- [GeeksforGeeks — Render an array of objects in ReactJS](https://www.geeksforgeeks.org/reactjs/how-to-render-an-array-of-objects-in-reactjs/)