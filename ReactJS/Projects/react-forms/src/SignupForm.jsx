import { useState } from "react";

function SignupForm() {

    const [formData, setFormData] = useState({ firstName: '', lastName: '' })

    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value
        setFormData((currData) => {
            currData[changedField] = newValue
            return { ...currData }
        })
    }

    const handleSubmit = () => {
        console.log(firstName, lastName);

    }

    return (
        <div style={{ border: '1px solid white', padding: '20px' }}>
            <label
                htmlFor="firstname-input"
                style={{ margin: '10px' }}>
                Enter First Name
            </label>
            <input
                type="text"
                placeholder="first name"
                value={formData.firstName}
                onChange={handleChange}
                id="firstname-input"
                name="firstName"
            />
            <br />
            <br />
            <label
                htmlFor="lastname-input"
                style={{ margin: '10px' }}>
                Enter Last Name
            </label>
            <input
                type="text"
                placeholder="last name"
                value={formData.lastName}
                onChange={handleChange}
                id="lastname-input"
                name="lastName"
            />
            <br />
            <button
                onClick={handleSubmit}
                style={{ margin: '10px' }}>
                Submit
            </button>
        </div>
    )
}

export default SignupForm;