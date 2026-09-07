import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0)

    const incrementCount = () => {
        setCount((currentCount) => currentCount + 1)
    }

    return (
        <div>
            <p>Counter: {count} </p>
            <button onClick={incrementCount}>+1</button>
        </div>
    )
}

export default Counter;