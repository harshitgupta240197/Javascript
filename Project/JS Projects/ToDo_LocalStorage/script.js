// Only when the DOM Content has loaded then we will load everything else
document.addEventListener('DOMContentLoaded', () => {

// ____________________________________________________________________________

    const todoInput = document.querySelector('#todo-input');
    const todoList = document.querySelector('#todo-list');
    const addTaskButton = document.querySelector('#add-task-btn');

// ____________________________________________________________________________

    // We will store these tasks in an Array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => renderTask(task));

// ____________________________________________________________________________

    addTaskButton.addEventListener('click', () => {
        const taskTest = todoInput.value.trim() // Grabbing the input value
        // Check if the input is empty and handle it
        if (taskTest === '') return;

        // Defining the properties of a new task (id, text, completed?)
        const newTask = {
            id: Date.now(),
            text: taskTest,
            completed: false
        }

        // Adding new tasks to the tasks array
        tasks.push(newTask)
        renderTask(newTask)

        // Save the task
        saveTasks()

        // Clearning the input box after task is pushed
        todoInput.value = ''
    });

// ____________________________________________________________________________

    // Rendering to read the task to read it
    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id)
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
        `
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            saveTasks()
        })

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation() // Prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove();
            saveTasks();
        })

        todoList.appendChild(li)
    }

// ____________________________________________________________________________

    // For Saving tasks to the local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})