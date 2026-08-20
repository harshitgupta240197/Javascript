const score_1 = document.querySelector('#score_1')
const score_2 = document.querySelector('#score_2')
const player1button = document.querySelector('#player1button')
const player2button = document.querySelector('#player2button')
const playingTo = document.querySelector('#playingTo')
const resetButton = document.querySelector('#resetButton')

let new_score1 = 0
let new_score2 = 0
let winning_score = Number(playingTo.value) 
let isGameOver = false

playingTo.addEventListener('change', function () {
    winning_score = Number(this.value)
    reset()
})

player1button.addEventListener('click', function () {
    if (!isGameOver) {
        new_score1 += 1
        if (new_score1 === winning_score) {
            isGameOver = true
            score_1.classList.add('winner');
            score_2.classList.add('loser');
            player1button.disabled = true
            player2button.disabled = true
        }
    } 
    score_1.textContent = new_score1;
})

player2button.addEventListener('click', function () {
    if (!isGameOver) {
        new_score2 += 1
        if (new_score2 === winning_score) {
            isGameOver = true
            score_2.classList.add('winner');
            score_1.classList.add('loser');
            player1button.disabled = true
            player2button.disabled = true
        }
    } 
    score_2.textContent = new_score2;
})

resetButton.addEventListener('click', reset)
    
function reset () {
    isGameOver = false;
    new_score1 = 0;
    new_score2 = 0;
    score_1.textContent = 0
    score_2.textContent = 0
    score_1.classList.remove('winner', 'loser')
    score_2.classList.remove('winner', 'loser')
    player1button.disabled = false
    player2button.disabled = false
}


