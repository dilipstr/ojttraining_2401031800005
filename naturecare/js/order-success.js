document.addEventListener('DOMContentLoaded', () => {
    const order = JSON.parse(localStorage.getItem('lastOrder'));
    const orderContent = document.getElementById('orderContent');

    if (order) {
        const itemsHTML = order.items.map(item => `
            <div class="detail-row">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        const subtotal = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const shipping = 10;
        const total = order.totalAmount;

        orderContent.innerHTML = `
            ${itemsHTML}
            <div class="detail-row" style="border-top: 2px solid #667eea; margin-top: 10px; padding-top: 10px; font-weight: 600;">
                <span>Subtotal</span><span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="detail-row"><span>Tax (10%)</span><span>$${tax.toFixed(2)}</span></div>
            <div class="detail-row"><span>Shipping</span><span>$${shipping.toFixed(2)}</span></div>
            <div class="detail-row" style="border-top: 2px solid #667eea; margin-top: 10px; padding-top: 10px; font-weight: 700; font-size: 1.1rem; color: #667eea;">
                <span>Total</span><span>$${total.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span>Payment Method</span>
                <span style="text-transform: uppercase; font-weight: 600;">${order.paymentMethod}</span>
            </div>
        `;
    }
});
