# The `key` Prop in React

`key` is a special, reserved attribute you pass to elements rendered inside an array or loop. Its job is to give each element a **stable identity** so React's reconciliation can tell which items changed, moved, were added, or were removed — instead of guessing from position.

---

## 1. Why React Needs Keys

When an array changes — sorted, filtered, appended to, deleted from — React has to match old UI elements against new data.

**Without keys**, React falls back to comparing by index position. Insert an item at the top of a list and React concludes that *every* item's content changed, because position `0` now holds different text, position `1` holds what used to be at `0`, and so on. It patches every node instead of inserting one.

**With keys**, React sees that the existing items simply moved. It reorders the DOM nodes it already has and inserts exactly one new one.

### The underlying rule

React's reconciler decides what to do with an element by looking at **type + key at the same position**:

| Old vs. new | What React does |
| --- | --- |
| Same type, same key | Keeps the DOM node and the component state; updates props |
| Same type, **different key** | Destroys the old component and mounts a fresh one |
| Different type | Destroys and mounts, regardless of key |

That single rule explains both the bug in the next section and the deliberate technique in section 6. State follows the key.

---

## 2. Best Practices for Choosing Keys

### Use a stable, unique ID from your data

The best key comes from the data itself — a database ID, a slug, a UUID that was assigned when the record was created.

```jsx
{users.map(user => <UserCard key={user.id} user={user} />)}
```

### Keys only need to be unique among siblings

Two different lists on the same page can both use `1, 2, 3`. Uniqueness is scoped to the array being rendered, not the whole app.

```jsx
<ul>{fruits.map(f => <li key={f.id}>{f.name}</li>)}</ul>
<ul>{drinks.map(d => <li key={d.id}>{d.name}</li>)}</ul>  // ids may repeat, fine
```

### ⚠️ Duplicate keys within one list

If two siblings share a key, React warns in the console and behaviour becomes unpredictable — items can render in the wrong slot, or one can swallow the other's state. If your IDs aren't actually unique, build a composite key (see section 4).

### Avoid array indexes unless the list is truly static

Index keys are safe **only** when the list is never reordered, sorted, filtered, prepended to, or deleted from, and the items hold no state of their own. That's a narrow set of cases.

### Never generate keys at render time

```jsx
{items.map(item => <Row key={Math.random()} />)}       // ❌
{items.map(item => <Row key={Date.now()} />)}          // ❌
{items.map(item => <Row key={crypto.randomUUID()} />)} // ❌
```

Every render produces new keys, so React destroys and rebuilds every row every time. You lose component state, input focus, scroll position, and any in-flight CSS transition — and it performs *worse* than having no key at all.

---

## 3. What Actually Breaks With Index Keys

The abstract warning is easy to nod at and forget. Here's the concrete failure.

```jsx
{todos.map((todo, index) => (
  <li key={index}>
    <input defaultValue={todo.text} />
    <span>{todo.title}</span>
  </li>
))}
```

You have three todos. You type into the **third** input. Then you delete the **first** todo.

- Before: keys `0, 1, 2`
- After: keys `0, 1`

React sees that key `2` vanished and that keys `0` and `1` are still present with changed props. So it keeps the first two DOM nodes, updates their text, and removes the last one. Your typed text — which lived in the DOM node at index `2`… or got shuffled into `1` — is now attached to the wrong todo, or gone.

With `key={todo.id}`, React sees that the key for the deleted todo disappeared and removes precisely that node. Everything else is untouched.

The same mechanism corrupts checkbox states, focus, uncontrolled inputs, video playback position, and animation state. It is one of the most common "React is behaving weirdly" bugs.

---

## 4. When Your Data Has No IDs

### Use the value itself, if unique

```jsx
const colors = ['pink', 'yellow', 'brown', 'white'];
{colors.map(color => <li key={color}>{color}</li>)}
```

Fine for a list of unique primitives. Breaks the moment duplicates are possible.

### Build a composite key

Combine fields that are collectively unique:

```jsx
{rows.map(row => (
  <Row key={`${row.date}-${row.userId}`} row={row} />
))}
```

### Generate IDs once, at creation time

The right fix for client-created data (a todo list, form rows). Assign the ID when the item is *made*, not when it's rendered:

```jsx
function addTodo(text) {
  setTodos(prev => [
    ...prev,
    { id: crypto.randomUUID(), text, done: false },   // ✅ generated once
  ]);
}
```

`crypto.randomUUID()` is built into browsers and Node 19+. A simple incrementing counter or `nanoid` works too. The point is that the ID becomes part of the data and never changes again.

---

## 5. Where the Key Goes

On the **outermost element returned inside the loop** — not on a child, not inside the component definition.

```jsx
const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>          {/* ✅ outermost element in the callback */}
        <span>{todo.text}</span>
      </li>
    ))}
  </ul>
);
```

```jsx
// ❌ Wrong — key on an inner element does nothing
<li>
  <span key={todo.id}>{todo.text}</span>
</li>
```

### Keyed Fragments

When each item needs multiple siblings with no wrapper, the shorthand `<>` **cannot** carry a key. Use the long form:

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

## 6. `key` as a Deliberate State-Reset Tool

This is the part most tutorials skip, and it's genuinely useful.

Because changing a key destroys and remounts a component, you can **reset a component's internal state on purpose** by changing its key — no `useEffect`, no manual clearing.

```jsx
// Switching users resets the form's internal state completely
<ProfileForm key={selectedUserId} user={selectedUser} />
```

Without the key, `ProfileForm` stays mounted across user switches and keeps whatever was half-typed into it. With the key, each user gets a genuinely fresh form.

Same trick outside lists entirely:

```jsx
// Remount the whole subtree to clear an error boundary or reset a chart
<Chart key={resetCounter} data={data} />
```

This also explains a surprise from conditional rendering — when two branches render the *same* component in the same position, state is preserved:

```jsx
{isEditing ? <TextInput label="Edit" /> : <TextInput label="View" />}   // state persists
{isEditing ? <TextInput key="edit" /> : <TextInput key="view" />}       // state resets
```

Use it sparingly. It's the right tool for "this is conceptually a different thing now," and the wrong tool for routine updates.

---

## 7. Keys Are Not Passed as Props

React consumes `key` itself. Inside the child, `props.key` is `undefined`.

```jsx
// ❌ Post cannot read props.key
<Post key={post.id} title={post.title} />

// ✅ Pass the value again under a real prop name
<Post key={post.id} id={post.id} title={post.title} />
```

The same applies to `ref` in older React versions. Both are reserved.

---

## 8. Practical Notes

- **Keys are coerced to strings.** `key={1}` and `key={'1'}` are the same key. Watch for collisions between a numeric ID `1` and a string ID `"1"`.
- **Keys only matter among siblings under the same parent.** Moving an element to a different parent remounts it regardless of key.
- **ESLint catches missing keys.** The `react/jsx-key` rule is on by default in `eslint-plugin-react`'s recommended config — the Vite React template ships with it.
- **React warns loudly at runtime** for a missing key: *"Each child in a list should have a unique key prop."* Don't ignore it; it's flagging a real correctness risk, not style.

---

## Quick reference

| Situation | Key to use |
| --- | --- |
| Data from an API/DB | `item.id` |
| Unique primitives | the value itself |
| Multiple fields needed for uniqueness | `` `${a}-${b}` `` composite |
| Client-created items | ID generated once at creation |
| Truly static, never-reordered list | `index` is acceptable |
| Anything computed during render | ❌ never |

---

## Sources

- [React docs — Rendering Lists / keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
- [React docs — Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React docs — Resetting state with a key](https://react.dev/learn/preserving-and-resetting-state#resetting-state-with-a-key)
- [Legacy React docs — Lists and Keys](https://legacy.reactjs.org/docs/lists-and-keys.html)
- [Kent C. Dodds — Understanding React's key prop](https://kentcdodds.com/blog/understanding-reacts-key-prop)
- [MDN — `Crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
- [GeeksforGeeks — ReactJS Keys](https://www.geeksforgeeks.org/reactjs/reactjs-keys/)