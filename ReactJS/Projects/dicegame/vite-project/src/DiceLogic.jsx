function DiceLogic() {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;

    // if (num1 === num2) {
    //     return (
    //         <div>
    //             <h2>You won</h2>
    //             <p>Num1: {num1}</p>
    //             <p>Num2: {num2}</p>
    //         </div>
    //     );
    // }
    // return (
    //     <div>
    //         <h2>You Lose</h2>
    //         <p>Num1: {num1}</p>
    //         <p>Num2: {num2}</p>
    //     </div>
    // );

    const result = num1 === num2 ? 'You Win!' : 'You Lose :(';
    return (
        <div>
            <h2>{result}</h2>
            <p>Num1: {num1}</p>
            <p>Num2: {num2}</p>
        </div>
    )

}

export default DiceLogic;