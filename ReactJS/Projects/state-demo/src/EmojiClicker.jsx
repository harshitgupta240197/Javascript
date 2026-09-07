import { v4 as uuid } from 'uuid';
import { useState } from "react";

function randomEmojis() {
    const choices = ['😂','😊', '💁', '😅', '✌️', '😉']
    return choices[Math.floor(Math.random() * choices.length)]
}

function EmojiClicker() {

    const [emojis, setEmojis] = useState([{ id: uuid(), emoji: randomEmojis() }])

    const emojiAdder = () => {
        setEmojis((oldEmojis) => [...oldEmojis, { id: uuid(), emoji: randomEmojis() }])
        console.log('Add Emoji button has been clicked');
    }

    const emojiDeleter = (id) => {
        setEmojis((prevEmojis) => {
            return prevEmojis.filter(e => e.id !== id)
        })
    }

    return (
        <div>
            {emojis.map((e) => (
                <span
                    key={e.id}
                    style={{ fontSize: '2rem' }}
                    onClick={() => emojiDeleter(e.id)}
                >
                    {e.emoji}
                </span>
            ))}
            <br /><br />
            <button onClick={emojiAdder}>Add Emoji</button>
        </div>
    )
}

export default EmojiClicker;