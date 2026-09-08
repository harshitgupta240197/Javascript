import { useState } from "react";

function UsernameForm() {

    const [username, setUsername] = useState('')

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    return (
        <div>
            <label
                htmlFor="username-input"
                style={{ margin: '10px' }}>
                Enter a Username
            </label>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={updateUsername}
                id="username-input"
            />
            <button style={{ margin: '10px' }}>
                Click Here
            </button>
        </div>
    )
}

export default UsernameForm;