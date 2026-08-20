const form  = document.querySelector('#storageForm')
const input = document.querySelector('#formInput')
const items = document.querySelector('#itemList')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const stored_value = input.value
    const newLI = document.createElement('li')
    newLI.innerText = stored_value
    items.append(newLI)
    console.log('Form is submitted')
    input.value = ''
})