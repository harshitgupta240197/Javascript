// Loading the DOM
document.addEventListener('DOMContentLoaded', () => {

    // Grabbing the elements from index.html
    const productList = document.querySelector('#product-list');
    const cartItems = document.querySelector('#cart-items');
    const emptyCartMessage = document.querySelector('#empty-cart');
    const cartTotal = document.querySelector('#cart-total');
    const totalPriceDisplay = document.querySelector('#total-price');
    const checkoutBtn = document.querySelector('#checkout-btn');

    // ___________________________________________________________________________

    // Creating the products
    const products = [
        { id: 1, name: 'Product 1', price: 20 },
        { id: 2, name: 'Product 2', price: 30 },
        { id: 3, name: 'Product 3', price: 40 }
    ]

    // Creating a cart empty array
    const cart = []

    // ___________________________________________________________________________

    products.forEach(product => {
        const productDiv = document.createElement('div');
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

    // ___________________________________________________________________________

    function addToCart(product) {
        cart.push(product);
        renderCart();
    };

    // ___________________________________________________________________________

    function renderCart() {

        // Removing the 'Your cart is empty once and item is added.'
        cartItems.innerHTML = ''

        // Setting total price initially to 0
        let totalPrice = 0

        if (cart.length > 0) {

            emptyCartMessage.classList.add('hidden')
            cartTotal.classList.remove('hidden')

            cart.forEach((item, index) => {
                totalPrice += item.price
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                `
                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `$${totalPrice}`

            });
        } else {
            emptyCartMessage.classList.remove('hidden')
            totalPriceDisplay.textContent = 0
        }

    };
    // ___________________________________________________________________________

    checkoutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert('Checkout Successful')
        renderCart()
    })

})