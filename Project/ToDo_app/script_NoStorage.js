const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const addTaskButton = document.querySelector('#add-task-btn');

addTaskButton.addEventListener('click', () => {
    if (todoInput.value.trim() != '') {
        let inputTask = todoInput.value // Extracting the input value
        const newLi = document.createElement('li') // Creating a new LI element
        newLi.innerText = inputTask // Setting the value of LI element to the input value
        todoList.append(newLi) // Appending the updated Li element to the UL list
        const delButton = document.createElement('button') // Creating the button element for delete button
        delButton.innerText = 'Delete' // Setting the label of the Delete button
        newLi.append(delButton) // Appending the delete button to the LI element
        todoInput.value = '' // Resetting the value of the input box
        // Adding an event listener for the Delete button to handle the LI deletions
        delButton.addEventListener('click', () => {
            newLi.remove()
        })
    } else {
        alert('There is no input!!')
    }

})