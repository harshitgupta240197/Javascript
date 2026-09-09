import { useEffect, useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    useEffect(function myEffect() {
        console.log('My Effect was called!');
    }, [count])

    const incrementor = () => {
        setCount((c) => c + 1)
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={incrementor}>+1</button>
            <br /><br />
            <p>Name: {name}</p>
            <input 
                type="text"
                value={name}
                onChange={handleChange} 
            />
        </div>
    )
}

export default Counter;