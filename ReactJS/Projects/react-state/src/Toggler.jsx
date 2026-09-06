import { useState } from "react";

function Toggler() {

    const [mood, setMood] = useState('😞')

    const changeMood = () => {
        setMood(mood === '😞' ? '😀' : '😞')
    }
    
    return (
        <div>
            <h1>Your mood right now: {mood} </h1>
            <button onClick={changeMood}>Change Mood</button>
        </div>
    )
}

export default Toggler;