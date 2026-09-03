document.addEventListener('DOMContentLoaded', () => {

    // DOM references____________________________________________

    const expenseForm = document.querySelector('#expense-form');
    const expenseNameInput = document.querySelector('#expense-name');
    const expenseAmountInput = document.querySelector('#expense-amount');
    const expenseList = document.querySelector('#expense-list');
    const totalAmountDisplay = document.querySelector('#total-amount');

    // State_____________________________________________________

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal()
    expenses.forEach((expense) => renderExpenses(expense));

    // Event Listeners__________________________________________

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = expenseNameInput.value.trim()
        const amount = parseFloat(expenseAmountInput.value.trim())

        if (name !== '' && !isNaN(amount) && amount > 0) {

            // Defining the newExpense
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            }

            // Pushing the newExpense to the Expenses array
            expenses.push(newExpense)
            saveExpensesToLocal() // Save to localStorage
            renderExpenses()
            updateTotal() // Will update the total with every iteration

            // Clear Input
            expenseNameInput.value = ''
            expenseAmountInput.value = ''
        }
    })

    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const expenseId = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter((expense) => expense.id !== expenseId);

            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
        }
    })

    // Functions___________________________________________________

    function renderExpenses() {
        expenseList.innerHTML = '';

        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.classList.add('expense-list')
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id = '${expense.id}'>Delete</button>
            `;
            expenseList.appendChild(li)
        });
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0)
    }

    function updateTotal() {
        totalAmount = calculateTotal()
        totalAmountDisplay.textContent = totalAmount.toFixed(2)
    }

    function saveExpensesToLocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }
})