import { useEffect, useState } from "react";

function Counter() {

    const [count, setCount] = useState(0)

    useEffect(function myEffect() {
        console.log('My Effect was called!');
    })

    const incrementor = () => {
        setCount((c) => c + 1)
    }

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={incrementor}>+1</button>
        </div>
    )
}

export default Counter;