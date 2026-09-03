document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------
     DOM references
  --------------------------------------------------------------- */

  const productList       = document.querySelector('#product-list');
  const cartItems         = document.querySelector('#cart-items');
  const emptyCartMessage  = document.querySelector('#empty-cart');
  const cartTotal         = document.querySelector('#cart-total');
  const totalPriceDisplay = document.querySelector('#total-price');
  const checkoutBtn       = document.querySelector('#checkout-btn');

  /* ---------------------------------------------------------------
     State
  --------------------------------------------------------------- */

  const products = [
    { id: 1, name: 'Product 1', price: 20 },
    { id: 2, name: 'Product 2', price: 30 },
    { id: 3, name: 'Product 3', price: 40 },
  ];

  const cart = [];

  /* ---------------------------------------------------------------
     Helpers
  --------------------------------------------------------------- */

  const formatPrice = (value) => `$${value.toFixed(2)}`;

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price, 0);

  /* ---------------------------------------------------------------
     Rendering
  --------------------------------------------------------------- */

  function renderProducts() {
    products.forEach((product) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <span>${product.name} - ${formatPrice(product.price)}</span>
        <button data-id="${product.id}">Add to cart</button>
      `;
      productList.appendChild(productDiv);
    });
  }

  function renderCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
      emptyCartMessage.classList.remove('hidden');
      cartTotal.classList.add('hidden');
      totalPriceDisplay.textContent = formatPrice(0);
      return;
    }

    emptyCartMessage.classList.add('hidden');
    cartTotal.classList.remove('hidden');

    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span>${item.name} - ${formatPrice(item.price)}</span>
        <button data-index="${index}">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });

    totalPriceDisplay.textContent = formatPrice(calculateTotal());
  }

  /* ---------------------------------------------------------------
     Cart operations
  --------------------------------------------------------------- */

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
  }

  function clearCart() {
    cart.length = 0;
    renderCart();
  }

  /* ---------------------------------------------------------------
     Event listeners
  --------------------------------------------------------------- */

  productList.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const productId = Number(e.target.dataset.id);
    const product = products.find((p) => p.id === productId);
    addToCart(product);
  });

  cartItems.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const index = Number(e.target.dataset.index);
    removeFromCart(index);
  });

  checkoutBtn.addEventListener('click', () => {
    clearCart();
    alert('Checkout successful');
  });

  /* ---------------------------------------------------------------
     Init
  --------------------------------------------------------------- */

  renderProducts();
  renderCart();

});