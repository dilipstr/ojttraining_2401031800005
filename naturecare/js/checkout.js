const API_URL = 'http://localhost:3000';
let cart = [];
let selectedPayment = 'cod';

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    displayCart();
});

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        document.querySelector('.checkout-container').innerHTML = `
            <div class="container">
                <div class="checkout-card empty-cart">
                    <i class="fa-solid fa-shopping-cart" style="font-size: 4rem; color: #ddd; margin-bottom: 20px;"></i>
                    <h2>Your Cart is Empty</h2>
                    <p>Please add some products before checkout</p>
                    <a href="products.html" class="btn btn-primary mt-3">Continue Shopping</a>
                </div>
            </div>
        `;
    }
}

function displayCart() {
    const cartReview = document.getElementById('cartItemsReview');
    const orderSummary = document.getElementById('orderSummary');
    if (cart.length === 0) return;

    let subtotal = 0;
    let cartHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        cartHTML += `
            <div class="d-flex justify-content-between align-items-center py-3 border-bottom">
                <div>
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">Qty: ${item.quantity}</small>
                </div>
                <div class="text-end">
                    <p class="fw-bold mb-0">&#8377;${itemTotal}</p>
                    <small class="text-muted">&#8377;${item.price} each</small>
                </div>
            </div>
        `;
    });

    const tax = Math.round(subtotal * 0.18);
    const shipping = 49;
    const total = subtotal + tax + shipping;

    cartReview.innerHTML = cartHTML;
    orderSummary.innerHTML = `
        <div class="summary-item"><span>Subtotal</span><span>&#8377;${subtotal}</span></div>
        <div class="summary-item"><span>GST (18%)</span><span>&#8377;${tax.toFixed(0)}</span></div>
        <div class="summary-item"><span>Shipping</span><span>&#8377;${shipping}</span></div>
        <div class="summary-item total"><span>Total Amount</span><span>&#8377;${total.toFixed(0)}</span></div>
    `;
}

function selectPayment(method) {
    selectedPayment = method;
    document.querySelectorAll('.payment-method').forEach(pm => pm.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    document.getElementById(method).checked = true;
}

function completeCheckout() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const street = document.getElementById('street').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zipCode').value;
    const country = document.getElementById('country').value;

    if (!fullName || !email || !phone || !street || !city || !state || !zipCode || !country) {
        alert('Please fill in all shipping details');
        return;
    }

    const token = localStorage.getItem('token');
    const shippingAddress = { name: fullName, email, phone, street, city, state, zipCode, country };

    if (token) {
        fetch(`${API_URL}/orders/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ shippingAddress, paymentMethod: selectedPayment })
        })
        .then(res => res.json())
        .then(data => {
            if (data.order) {
                localStorage.setItem('lastOrder', JSON.stringify(data.order));
                localStorage.removeItem('cart');
                window.location.href = 'order-success.html';
            } else {
                alert(data.message || 'Order failed. Please try again.');
            }
        })
        .catch(() => alert('Server not reachable. Is the backend running?'));
    } else {
        const order = {
            items: cart,
            shippingAddress,
            paymentMethod: selectedPayment,
            totalAmount: calculateTotal(),
            orderDate: new Date()
        };
        localStorage.setItem('lastOrder', JSON.stringify(order));
        localStorage.removeItem('cart');
        window.location.href = 'order-success.html';
    }
}

function calculateTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    return subtotal + tax + 49;
}
