// Loading the DOM
document.addEventListener('DOMContentLoaded', () => {

    // Grabbing the elements from index.html
    const productList = document.querySelector('#product-list');
    const cartItems = document.querySelector('#cart-items');
    const emptyCartMessage = document.querySelector('#empty-cart');
    const cartTotal = document.querySelector('cart-total');
    const totalPriceDisplay = document.querySelector('total-price');
    const checkoutBtn = document.querySelector('checkout-btn');

    // Creating the products
    const products = [
        {id: 1, name: 'Product 1', price: 20},
        {id: 2, name: 'Product 2', price: 30},
        {id: 3, name: 'Product 3', price: 40}
    ]

    products.forEach(product => {
        const productDiv =  document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id = '${product.id}'>Add to cart</button>
        `;
        // Now we will appemnd the items
        productList.appendChild(productDiv)
    });

    productList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
        const productId = parseInt(e.target.getAttribute('data-id'))
        const product = products.find(p => p.id === productId)
        addToCart(product)
        }
    });

    // Creating a cart empty array
    const cart = []

    function addToCart(product) {
        cart.push(product)
        console.log(cart) 
    }

})