# React Props

**Props** (short for "properties") are read-only objects used to pass data from a parent component to a child component. They act like function arguments in JavaScript or attributes in HTML, allowing you to build dynamic and reusable UI components.

---

## Key Characteristics

- **Unidirectional data flow** — data flows strictly one way, parent → child.
- **Immutable (read-only)** — a child can never modify the props it receives. If the UI needs to change based on user interaction, use **state** instead.
- **Versatile data types** — strings, numbers, booleans, arrays, objects, and functions can all be passed as props.
- **Props are always an object** — React collects every attribute you write on a component into a single object and passes it as the first argument. `<UserCard name="Alex" age={25} />` becomes `{ name: "Alex", age: 25 }`.
- **Re-render on change** — when a parent passes a new prop value, React re-renders the child with the updated value.

---

## Curly Braces vs Quotes

The single most common beginner mistake. In JSX:

- **Quotes** pass a literal string.
- **Curly braces** pass a JavaScript expression (the value of a variable, a number, an array, a function...).

```jsx
const url = "https://example.com/pic.png";

<img src="url" />    // ❌ passes the 4-character string "url"
<img src={url} />    // ✅ passes the value of the variable

<UserCard age="25" />   // age is the STRING "25"
<UserCard age={25} />   // age is the NUMBER 25
```

Anything that isn't a plain string literal needs braces.

---

## How to Use Props

Two steps: pass the prop from the parent, read the prop inside the child.

### 1. Standard Method (the `props` object)

```jsx
// Parent Component (App.jsx)
function App() {
  return <UserCard name="Alex" age={25} />;
}

// Child Component (UserCard.jsx)
function UserCard(props) {
  return (
    <div>
      <h2>Name: {props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

### 2. Clean Method (destructuring)

Instead of typing `props.name` everywhere, destructure directly in the function parameters. This is the industry standard.

```jsx
function UserCard({ name, age }) {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}
```

---

## Advanced Patterns

### Default Values

If a parent forgets to pass a prop, set a fallback in the parameters.

```jsx
function Button({ text = "Click Me" }) {
  return <button>{text}</button>;
}
```

> **Note:** The old `Component.defaultProps = {...}` syntax is deprecated for function components and removed in React 19. Use default parameters as shown above.

### Passing Functions (child → parent communication)

Props only flow down, but you can pass a callback function as a prop. This lets the child trigger actions back up in the parent.

```jsx
// Parent
function Parent() {
  const showAlert = () => alert("Button clicked!");
  return <ChildButton onClickHandler={showAlert} />;
}

// Child
function ChildButton({ onClickHandler }) {
  return <button onClick={onClickHandler}>Trigger Alert</button>;
}
```

**Naming convention:** name the prop `onSomething` and the handler function `handleSomething`. So `<ChildButton onClick={handleClick} />`.

**Watch out:** pass the function reference, don't call it.

```jsx
<button onClick={handleClick}>     // ✅ passes the function
<button onClick={handleClick()}>   // ❌ calls it immediately during render
<button onClick={() => handleClick(id)}>  // ✅ how to pass arguments
```

### The `children` Prop

Any content placed between a component's opening and closing tags is automatically passed as a special prop called `children`. Useful for layout wrappers.

```jsx
function CardContainer({ children }) {
  return <div className="card-styling">{children}</div>;
}

// Usage:
<CardContainer>
  <h1>This is inside the wrapper</h1>
</CardContainer>
```

### Boolean Shorthand

Writing a prop with no value passes `true`.

```jsx
<Modal isOpen />              // same as isOpen={true}
<Modal isOpen={false} />      // must be explicit for false
```

### Spread Syntax

Forward a whole object of props at once. Handy, but it hides what's actually being passed — use sparingly.

```jsx
const user = { name: "Alex", age: 25 };

<UserCard {...user} />
// equivalent to <UserCard name="Alex" age={25} />
```

### Passing Objects and Arrays

Objects need double braces: the outer pair says "JS expression", the inner pair is the object literal.

```jsx
<UserCard user={{ name: "Alex", age: 25 }} />
<TagList tags={["react", "js"]} />
```

---

## Props vs State

| | Props | State |
|---|---|---|
| **Owned by** | Parent component | The component itself |
| **Mutable?** | No — read-only | Yes, via the setter |
| **Purpose** | Configure a component from outside | Track data that changes over time |
| **Analogy** | Function arguments | Variables inside the function |

A component can receive a prop and pass it into its own state, but changing that state does **not** change the parent's value.

---

## The `key` Prop

When rendering a list, each item needs a `key`. It looks like a prop but it isn't one — React uses it internally to track which items changed, and it does **not** show up in `props`.

```jsx
{pokemon.map((p) => (
  <PokemonCard key={p.id} name={p.name} />
))}
```

Use a stable unique id, not the array index, when list items can be reordered, added, or removed.

---

## Common Mistakes

1. **Mutating props** — `props.name = "Bob"` throws in strict mode and breaks React's model. Props belong to the parent.
2. **Forgetting braces on non-strings** — `age="25"` gives you a string; `{typeof age}` will surprise you later.
3. **Calling the handler instead of passing it** — `onClick={handleClick()}` fires during render, often causing an infinite loop.
4. **Case-sensitivity typos** — `{pokenum}` when the variable is `pokeNum` throws a `ReferenceError` and blanks the whole page. Keep devtools console open.
5. **Prop drilling** — threading a prop through five layers of components that don't use it. Sign you may need Context or state colocation.

---

## Prop Drilling

Passing a prop down through intermediate components that don't actually need it, just to reach a deep child.

```
App (has user) → Layout → Sidebar → Profile (needs user)
```

Fixes, roughly in order of how often you'll want them:

1. **Restructure** — move the component closer to the data, or use `children` so the parent renders the deep child directly.
2. **Context API** — for genuinely global data (theme, logged-in user, locale).
3. **State library** (Zustand, Redux) — for large apps with complex shared state.

Don't reach for Context at two or three levels. Prop drilling is only a problem when it becomes noise.

---

## Type Checking

`PropTypes` is deprecated and removed in React 19. If you want to validate the shape of props, use **TypeScript**:

```tsx
type UserCardProps = {
  name: string;
  age?: number;   // optional
};

function UserCard({ name, age = 0 }: UserCardProps) {
  return <h2>{name}</h2>;
}
```

---

## Quick Reference

```jsx
<Comp text="hello" />              // string
<Comp count={42} />                // number
<Comp active />                    // boolean true
<Comp active={false} />            // boolean false
<Comp items={[1, 2, 3]} />         // array
<Comp user={{ id: 1 }} />          // object
<Comp onSave={handleSave} />       // function
<Comp {...allProps} />             // spread
<Comp>content</Comp>               // children
```

---

## References

- [React docs — Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [W3Schools — React Props](https://www.w3schools.com/react/react_props.asp)
- [freeCodeCamp — Beginner's Guide to Props](https://www.freecodecamp.org/news/beginners-guide-to-props-in-react/)
- [GeeksforGeeks — What Are Props in React](https://www.geeksforgeeks.org/reactjs/what-are-props-in-react/)