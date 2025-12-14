// Shopping cart state
let cart = [];

// DOM elements
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.querySelector('.close-checkout');
const checkoutItemsContainer = document.getElementById('checkoutItems');
const checkoutTotalAmount = document.querySelector('.checkout-total-amount');
const confirmCheckoutBtn = document.querySelector('.confirm-checkout-btn');

// Initialize event listeners
function init() {
    // Add to cart buttons
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });

    // Cart modal controls
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });

    // Event delegation for remove buttons
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const productId = e.target.dataset.productId;
            removeFromCart(productId);
        }
    });

    // Checkout buttons
    checkoutBtn.addEventListener('click', handleCheckout);
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    confirmCheckoutBtn.addEventListener('click', handleConfirmCheckout);
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#cart') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Load cart from localStorage
    loadCart();
}

// Add item to cart
function handleAddToCart(e) {
    const btn = e.target;
    const productId = btn.dataset.product;
    const price = parseFloat(btn.dataset.price);
    const amount = btn.dataset.amount;
    
    // Get product title from card
    const productCard = btn.closest('.product-card');
    const productTitle = productCard.querySelector('.product-title').textContent;

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        // Item exists, increase quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cart.push({
            id: productId,
            name: productTitle,
            amount: amount,
            price: price,
            quantity: 1
        });
    }

    // Update UI
    updateCart();
    saveCart();

    // Visual feedback
    btn.textContent = 'Added!';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
    }, 1000);
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-amount">${item.amount} × ${item.quantity}</div>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item-btn" data-product-id="${item.id}">Remove</button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

// Open cart modal
function openCart(e) {
    e.preventDefault();
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCart() {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) return;

    // Populate checkout modal
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    checkoutItemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div>
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-details">${item.amount} × ${item.quantity}</div>
            </div>
            <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    checkoutTotalAmount.textContent = `$${total.toFixed(2)}`;
    
    // Show checkout modal
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // In a real implementation, this would prepare the Tebex checkout
    console.log('Checkout initiated with cart:', cart);
    console.log('Total amount:', total);
}

// Close checkout modal
function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle confirm checkout
function handleConfirmCheckout() {
    // In a real implementation, this would redirect to Tebex payment
    console.log('Redirecting to Tebex for payment...');
    
    // For demonstration, clear cart and close modals
    cart = [];
    updateCart();
    saveCart();
    closeCheckoutModal();
    closeCart();
    
    // Show success feedback
    alert('Thank you! In production, you would be redirected to Tebex for secure payment.');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('hsrp_cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('hsrp_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Add scroll effect to header
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }

    lastScroll = currentScroll;
});

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
