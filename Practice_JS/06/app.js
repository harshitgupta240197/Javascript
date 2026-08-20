const form = document.querySelector('form');
const product = document.querySelector('#product')
const quantity = document.querySelector('#qty')
const list = document.querySelector('#list')

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const productValue = product.value
    const qtyValue = quantity.value
    const item = `${qtyValue} ${productValue}`
    const newLI = document.createElement('li')
    newLI.innerText = item
    list.append(newLI)  
    product.value = ''
    quantity.value = '' 
})