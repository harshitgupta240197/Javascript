function Dice() {
    const roll = Math.floor(Math.random() * 6) + 1
    return (
        <>
            <h1>Your Dice shows: {roll}</h1>
        </>
    )
}

export default Dice;