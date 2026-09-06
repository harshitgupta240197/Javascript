function SlotMachine({ val1, val2, val3 }) {

    const isWinner = val1 === val2 && val1 === val3

    return (
        <div>
            <h1>{val1} {val2} {val3}</h1>
            <p style={{ color: isWinner ? 'green' : 'red' }}>
                {isWinner ? 'You Win' : 'You Lose'}
            </p>
            {isWinner && <h1>Congratulations</h1>}
        </div>
    )
}

export default SlotMachine;