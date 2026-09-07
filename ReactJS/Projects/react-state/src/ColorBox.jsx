import { useState } from 'react';
import './ColorBox.css'

function getRandcomColor(arr) {
        const idx = Math.floor(Math.random() * arr.length) + 1
        return arr[idx]
}

function ColorBox({colors}) {
    const [color, setColor] = useState(getRandcomColor(colors))
    const handleClick = () => {
        const randomColor = getRandcomColor(colors);
        setColor(randomColor)
    }

    return (
        <div
            className="ColorBox" 
            style={{backgroundColor: color}}
            onClick={handleClick}   
        >

        </div>
    )
    
}

export default ColorBox;