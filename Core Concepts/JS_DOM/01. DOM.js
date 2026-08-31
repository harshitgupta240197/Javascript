const textElement = document.querySelector('#myParagraph');
const changeButton = document.querySelector('#changeTextButton');
const firstLi = document.querySelector('.chai');
const highlightButton = document.querySelector('#highlightFirstCity');
const coffeeType = document.querySelector('#coffeeType');
const changeOrder = document.querySelector('#changeOrder');
const addNewItem = document.querySelector('#addNewItem');
const shoppingList = document.querySelector('#shoppingList');
const removeLastTask = document.querySelector('#removeLastTask');
const taskList = document.querySelector('#taskList');
const clickMeButton = document.querySelector('#clickMeButton');
const teaList = document.querySelector('#teaList');
const feedbackForm = document.querySelector('#feedbackForm');
const feedbackInput = document.querySelector('#feedbackInput');
const feedbackDisplay = document.querySelector('#feedbackDisplay');
const domStatus = document.querySelector('#domStatus');
const descriptionText = document.querySelector('#descriptionText');
const toggleHighlight = document.querySelector('#toggleHighlight')

changeButton.addEventListener('click', () => {
    textElement.textContent = textElement.textContent.replace(
        textElement.textContent, 'This text has been changed')
});

highlightButton.addEventListener('click', () => {
    firstLi.classList.add('highlight')
});

changeOrder.addEventListener('click', () => {
    coffeeType.textContent = coffeeType.textContent.replace(
        coffeeType.textContent, 'Espresso')
});

addNewItem.addEventListener('click', () => {
    const newLi = document.createElement('li')
    newLi.textContent = 'Eggs'
    shoppingList.append(newLi)
});

removeLastTask.addEventListener('click', () => {
    taskList = taskList.lastElementChild.remove()
});

clickMeButton.addEventListener('click', () => {
    console.log('Handling of event'); 
});

teaList.addEventListener('click', (event) => {
    if (event.target && event.target.matches('.teaItem')) {
        alert(event.target.textContent)
    }
});

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault()
    i = feedbackInput.value
    feedbackDisplay.textContent = `Your feeback is ${i}`
});

document.addEventListener('DOMContentLoaded', () => {
    domStatus.textContent = 'DOM has loaded'
});

toggleHighlight.addEventListener('click', () => {
    descriptionText.classList.toggle('highlight')
})

