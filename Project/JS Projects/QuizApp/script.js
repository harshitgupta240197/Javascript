document.addEventListener('DOMContentLoaded', () => {

    // DOM References________________________________________________________
    const questionContainer = document.querySelector('#question-container');
    const resultContainer = document.querySelector('#result-container');
    const startQuizBtn = document.querySelector('#start-btn');
    const nextBtn = document.querySelector('#next-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const questionText = document.querySelector('#question-text');
    const choicesList = document.querySelector('#choices-list');
    const scoreDisplay = document.querySelector('#score');

    // Questions______________________________________________________________
    const questions = [
        {
            question: 'What is the capital of France ?',
            choices: ['Paris', 'London', 'Berlin', 'Madrid'],
            answer: 'Paris',
        },
        {
            question: 'Which planet is known as the Red Planet?',
            choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
            answer: 'Mars',
        },
        {
            question: 'Who wrote "Romeo and Juliet"?',
            choices: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
            answer: 'William Shakespeare',
        },
        {
            question: 'What is the largest ocean on Earth?',
            choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
            answer: 'Pacific Ocean',
        },
        {
            question: 'What is the chemical symbol for Gold?',
            choices: ['Au', 'Ag', 'Gd', 'Go'],
            answer: 'Au',
        },
        {
            question: 'In which year did India gain independence?',
            choices: ['1945', '1947', '1950', '1952'],
            answer: '1947',
        }
    ];

    // State_________________________________________________________________
    let currentQuestionIndex = 0;
    let score = 0;

    // Event Listeners_______________________________________________________
    startQuizBtn.addEventListener('click', startQuiz)

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++
        if (currentQuestionIndex < questions.length) {
            showQuestion()
        } else {
            showResult()
        }
    })

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add('hidden');
        startQuiz();
    })

    // Functions_____________________________________________________________
    function startQuiz() {
        startQuizBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add('hidden')    

        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = '' //clear previous choices
        questions[currentQuestionIndex].choices.forEach((choice) => {
            const li = document.createElement('li');
            li.textContent = choice;
            // Using this we are passing the reference and not actually executing the selectAnswer function
            li.addEventListener('click', () => selectAnswer(choice)) 
            choicesList.appendChild(li);
        });
    }

    function selectAnswer(choice) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer) {
            score++
        }
        nextBtn.classList.remove('hidden')
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questions.length}`
    }

})