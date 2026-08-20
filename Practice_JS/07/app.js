const input = document.querySelector('#username')
const h1 = document.querySelector('h1')

input.addEventListener('input', function (event) {
    const inserted_value = input.value
    h1.innerText = inserted_value
})