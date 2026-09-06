# Dynamic Component Styles in React

Styling a component based on props or state has three mainstream approaches — inline styles, dynamic class names, and CSS-in-JS — plus two patterns that get less coverage but solve the cases the big three handle badly: **CSS Modules** and **inline CSS custom properties**.

---

## Method 1: Dynamic Inline Styles

React's `style` attribute takes a **JavaScript object**, not a string. Because it's plain JS, you can compute values with ternaries, template literals, or any expression.

```jsx
import { useState } from 'react';

function ProgressBar({ progressValue }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      {/* Ternary for conditional styles */}
      <button
        onClick={() => setIsActive(!isActive)}
        style={{
          backgroundColor: isActive ? 'green' : 'red',
          color: 'white',
        }}
      >
        {isActive ? 'Active' : 'Inactive'}
      </button>

      {/* Template literal for a fluid value */}
      <div
        style={{
          width: `${progressValue}%`,
          height: '20px',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}
```

### Syntax rules

| Rule | Example |
| --- | --- |
| Properties are **camelCase** | `backgroundColor`, not `background-color` |
| Vendor prefixes are capitalised, except `ms` | `WebkitTransform`, `msTransform` |
| Numbers get `px` added automatically | `{ width: 20 }` → `width: 20px` |
| Unitless properties stay bare | `{ lineHeight: 1.5, zIndex: 10, opacity: 0.8, flex: 1 }` |
| Custom properties keep their dashes | `{ '--brand-color': 'tomato' }` |
| A **string** is invalid | `style="color: red"` throws in React |

The double braces confuse people at first — `style={{ ... }}` is one pair for the JSX expression, one for the object literal. You can hoist the object out:

```jsx
const barStyle = { height: '20px', transition: 'width 0.3s ease' };
<div style={{ ...barStyle, width: `${progressValue}%` }} />
```

### ⚠️ What inline styles cannot do

No `:hover`, `:focus`, `::before`, `::after`, media queries, or keyframe animations. There is no CSS cascade at all — it's a single declaration block on one element. If you need any of those, use one of the other methods.

### ⚠️ New object every render

`style={{ ... }}` creates a fresh object on each render, so it always fails referential equality. That's harmless on a DOM element, but if you pass a style object as a prop to a `React.memo`'d child, it will defeat the memoisation. Hoist it outside the component or wrap it in `useMemo` in that case.

---

## Method 2: Dynamic Class Names

If your styles already live in a stylesheet, CSS Modules, or Tailwind, compute the `className` string instead.

```jsx
import { useState } from 'react';
import './Button.css'; // assumes .btn-success and .btn-danger exist

function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <button
      onClick={() => setIsToggled(!isToggled)}
      className={`btn ${isToggled ? 'btn-success' : 'btn-danger'}`}
    >
      Click Me
    </button>
  );
}
```

### Use `clsx` once you have more than one toggle

Template literals get ugly fast, and a `false &&` branch leaks the string `"false"` into your class list. `clsx` (or `classnames` — same API, `clsx` is smaller) handles conditionals, arrays, and falsy values cleanly:

```jsx
import clsx from 'clsx';

<button
  className={clsx(
    'btn',
    isPrimary && 'btn-primary',
    isDisabled && 'btn-disabled',
    { 'btn-loading': isLoading },
    size === 'lg' ? 'btn-lg' : 'btn-sm',
  )}
/>
```

Falsy entries are dropped, so nothing leaks. `npm i clsx`.

### ⚠️ Tailwind: never build class names by string concatenation

Tailwind scans your source files as **plain text** at build time. A class that only exists after JS runs will never be generated.

```jsx
// ❌ Broken — Tailwind never sees "bg-red-500" in the source
<div className={`bg-${color}-500`} />
<div className={`w-[${width}px]`} />

// ✅ Full class names in a lookup map
const COLORS = {
  red:   'bg-red-500',
  green: 'bg-green-500',
  blue:  'bg-blue-500',
};
<div className={COLORS[color]} />

// ✅ Or a ternary with complete strings
<div className={isActive ? 'bg-green-500' : 'bg-gray-300'} />
```

For genuinely arbitrary values (a progress width from a number), don't fight Tailwind — use an inline style or a CSS variable for that one property.

---

## Method 3: CSS Modules (scoped classes, no runtime)

Worth knowing because it's Vite's built-in default and gives you real CSS with no naming collisions and no library. Any file named `*.module.css` gets its class names hashed at build time.

```css
/* Button.module.css */
.btn { padding: 10px 20px; border: none; border-radius: 4px; }
.success { background: green; color: white; }
.danger  { background: crimson; color: white; }
.btn:hover { opacity: 0.9; }   /* pseudo-classes work fine */
```

```jsx
import styles from './Button.module.css';
import clsx from 'clsx';

function ToggleButton({ isToggled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={clsx(styles.btn, isToggled ? styles.success : styles.danger)}
    >
      Click Me
    </button>
  );
}
```

`styles` is just an object mapping your names to hashed ones, so `styles[variant]` works as a dynamic lookup. Zero runtime cost, full CSS features, scoped to the component. For a Vite project this is often the best default.

---

## Method 4: Props in styled-components / Emotion

CSS-in-JS lets you inject props straight into a CSS template literal.

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => (props.$primary ? 'blue' : 'gray')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;

  &:hover { opacity: 0.9; }
`;

// <Button $primary>Blue Button</Button>
// <Button>Gray Button</Button>
```

Note the `$` prefix on `$primary` — that's a **transient prop**. Without it, styled-components forwards the prop to the underlying DOM node and React warns about an unknown `primary` attribute on `<button>`. This trips up a lot of older tutorials, which predate the convention.

Worth knowing that the ecosystem has cooled on runtime CSS-in-JS: it adds bundle weight, costs work on every render, and has friction with React Server Components. Fine on an existing codebase; not the obvious first pick for a new one in 2026.

---

## Method 5: CSS Custom Properties (the best of both)

The pattern that gets underused. Set a CSS variable inline, then consume it from a real stylesheet. You get JS-driven values **and** hover states, media queries, and transitions.

```jsx
function ProgressBar({ progressValue, accent }) {
  return (
    <div
      className="progress"
      style={{ '--progress': `${progressValue}%`, '--accent': accent }}
    >
      <div className="progress__fill" />
    </div>
  );
}
```

```css
.progress { width: 100%; height: 20px; background: #eee; }

.progress__fill {
  width: var(--progress);
  background: var(--accent);
  height: 100%;
  transition: width 0.3s ease;
}

.progress__fill:hover { filter: brightness(1.1); }  /* impossible inline */

@media (prefers-reduced-motion: reduce) {
  .progress__fill { transition: none; }
}
```

Use this whenever a value is continuous (widths, positions, hue, count) but you still need real CSS around it. It works with plain CSS, CSS Modules, and Tailwind alike.

---

## Bonus: data attributes for state

For a handful of discrete states, a `data-*` attribute keeps the styling entirely in CSS:

```jsx
<button data-state={isLoading ? 'loading' : 'idle'}>Save</button>
```

```css
button[data-state='loading'] { opacity: 0.6; cursor: wait; }
```

Cleaner than juggling class strings when the states are mutually exclusive, and it reads well in DevTools.

---

## Direct Comparison

| Method | Best for | Pros | Cons |
| --- | --- | --- | --- |
| **Inline styles** | Continuously changing values — sliders, drag positions, progress | No setup; fastest path for a one-off value | No hover, pseudo-elements, or media queries; new object per render |
| **Dynamic classes** | Toggling discrete UI states — dark mode, active, disabled | CSS stays separate; full CSS features; no runtime cost | Classes must exist beforehand; Tailwind can't see computed names |
| **CSS Modules** | Component-scoped styling in a Vite/CRA project | Scoped, no collisions, zero runtime, full CSS | One file per component; needs the `.module.css` convention |
| **CSS-in-JS** | Prop-driven design systems in an existing CSS-in-JS codebase | Very dynamic; colocated; clean component API | Bundle size, runtime cost, RSC friction |
| **CSS variables** | Continuous values that still need real CSS around them | Combines both worlds; works with any of the above | One extra indirection to read |
| **Data attributes** | A small set of mutually exclusive states | Logic-free CSS; readable in DevTools | Only good for enumerable states |

---

## Quick decision guide

- **A number changing every frame?** → inline style, or a CSS variable if it also needs hover/transition
- **On/off or a named variant?** → class names (`clsx` once there's more than one)
- **Starting fresh in Vite?** → CSS Modules + `clsx` is a strong default
- **Already on styled-components?** → stay there; use transient `$props`
- **Need hover or a media query?** → anything except plain inline styles

---

## Sources

- [React docs — the `style` prop / DOM components](https://react.dev/reference/react-dom/components/common)
- [Vite — CSS Modules](https://vite.dev/guide/features#css-modules)
- [Tailwind — Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- [styled-components — Transient props](https://styled-components.com/docs/api#transient-props)
- [MDN — Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
- [clsx on npm](https://www.npmjs.com/package/clsx)
- [CoreUI — Dynamically add, remove and toggle CSS classes in React](https://coreui.io/blog/how-to-dynamically-add-remove-and-toggle-css-classes-in-react-js/)