document.addEventListener('DOMContentLoaded', () => {

    // DOM references____________________________________________

    const expenseForm = document.querySelector('#expense-form');
    const expenseNameInput = document.querySelector('#expense-name');
    const expenseAmountInput = document.querySelector('#expense-amount');
    const expenseList = document.querySelector('#expense-List');
    const totalAmountDisplay = document.querySelector('total-amount');

    // State_____________________________________________________

    let expenses = []
    let totalAmount = calculateTotal()

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

            // Clear Input
            expenseNameInput.value = ''
            expenseAmountInput.value = 0
        }
    })

    // Functions___________________________________________________

    function calculateTotal() {
        expenses.forEach(expense => {
            totalAmount += expense
        });
        
    }

    function saveExpensesToLocal() {
        localStorage.setItem('expenses', JSON.stringify(expenses))
        
    }
})