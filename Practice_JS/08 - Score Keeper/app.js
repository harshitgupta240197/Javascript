const score_1 = document.querySelector('#score1')
const score_2 = document.querySelector('#score2')
const player1button = document.querySelector('#player1button')
const player2button = document.querySelector('#player2button')
const playingTo = document.querySelector('#playingTo')
const resetButton = document.querySelector('#resetButton')

player1button.addEventListener('click', function () {
    const newScore1 = Number(score_1.innerText) +1
    if (newScore1 <= Number(playingTo.value)) {
        score_1.innerText = newScore1
    }
})

player2button.addEventListener('click', function () {
    const newScore2 = Number(score_2.innerText) + 1
    if (newScore2 <= Number(playingTo.value)) {
        score_2.innerText = newScore2
        
    }
})

resetButton.addEventListener('click', function () {
    score_1.innerText = 0
    score_2.innerText = 0
})