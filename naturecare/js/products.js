const API_URL = 'http://localhost:3000';
let allProducts = [];
let filteredProducts = [];
let currentCategory = '';
let currentSort = '';
let searchTerm = '';
let cartCount = 0;

document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    setupEventListeners();
    updateCartCount();
});

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                allProducts = data.map(p => ({
                    ...p,
                    image: p.image && p.image.startsWith('http')
                        ? p.image
                        : 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&h=300&fit=crop'
                }));
                filteredProducts = [...allProducts];
                renderProducts();
                return;
            }
        }
    } catch (e) {}
    loadDemoProducts();
}

function loadDemoProducts() {
    allProducts = [
        { _id: '1', name: 'Organic Green Tea', description: 'Premium organic green tea with antioxidants', price: 349, category: 'herbs', rating: 4.5, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=300&fit=crop' },
        { _id: '2', name: 'Herb Garden Seeds Kit', description: 'Complete kit with 12 varieties of herb seeds', price: 599, category: 'seeds', rating: 4.8, image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop' },
        { _id: '3', name: 'Eco-Friendly Hand Tool Set', description: 'Sustainable gardening tools made from recycled materials', price: 1299, category: 'tools', rating: 4.3, image: 'https://images.unsplash.com/photo-1416941214718-9cd655c4c0af?w=400&h=300&fit=crop' },
        { _id: '4', name: 'Organic Turmeric Powder', description: 'Pure organic turmeric with high curcumin content', price: 249, category: 'supplements', rating: 4.6, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop' },
        { _id: '5', name: 'Bamboo Cutting Board', description: 'Sustainable bamboo board for kitchen use', price: 799, category: 'tools', rating: 4.4, image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop' },
        { _id: '6', name: 'Lavender Essential Oil', description: 'Pure therapeutic grade lavender oil', price: 899, category: 'organic', rating: 4.7, image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop' },
        { _id: '7', name: 'Basil Seeds Pack', description: 'Fresh basil seeds for kitchen gardening', price: 149, category: 'seeds', rating: 4.2, image: 'https://images.unsplash.com/photo-1542223533-bfa1cbd335b4?w=400&h=300&fit=crop' },
        { _id: '8', name: 'Natural Bamboo Charcoal', description: 'Air purifying bamboo charcoal for home', price: 499, category: 'organic', rating: 4.5, image: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=400&h=300&fit=crop' }
    ];
    filteredProducts = [...allProducts];
    renderProducts();
}

function setupEventListeners() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            applyFilters();
        });
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        applyFilters();
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFilters();
    });

    document.getElementById('clearFilters').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('sortSelect').value = '';
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-category=""]').classList.add('active');
        currentCategory = '';
        currentSort = '';
        searchTerm = '';
        applyFilters();
    });

    document.getElementById('cartIcon').addEventListener('click', () => showCart());
}

function applyFilters() {
    filteredProducts = allProducts.filter(product => {
        const matchCategory = !currentCategory || product.category === currentCategory;
        const matchSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        return matchCategory && matchSearch;
    });

    if (currentSort === 'price') filteredProducts.sort((a, b) => a.price - b.price);
    else if (currentSort === '-price') filteredProducts.sort((a, b) => b.price - a.price);
    else if (currentSort === '-rating') filteredProducts.sort((a, b) => b.rating - a.rating);

    renderProducts();
}

function renderProducts() {
    const container = document.getElementById('productsContainer');
    const emptyState = document.getElementById('emptyState');

    if (filteredProducts.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = filteredProducts.map(product => `
        <div class="col-md-6 col-lg-3 mb-4">
            <div class="card product-card h-100 position-relative">
                ${product.discountPrice ? `<span class="product-badge">Sale</span>` : ''}
                <div class="product-image">
                    <img src="${product.image || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&h=300&fit=crop'}" alt="${product.name}">
                </div>
                <div class="product-content">
                    <h5 class="product-name">${product.name}</h5>
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i> ${product.rating || 0} (${product.reviews?.length || 0} reviews)
                    </div>
                    <div class="product-price">
                        ₹${product.discountPrice ? product.discountPrice : product.price}
                        ${product.discountPrice ? `<small style="text-decoration: line-through; color: #999;">₹${product.price}</small>` : ''}
                    </div>
                    <button class="btn-add-cart" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">
                        <i class="fa-solid fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId, productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.productId === productId);
    if (item) item.quantity++;
    else cart.push({ productId, name: productName, price, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${productName} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartBadge').textContent = count;
    cartCount = count;
}

function showCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartModalBody = document.getElementById('cartModalBody');

    if (cart.length === 0) {
        cartModalBody.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
    } else {
        let total = 0;
        cartModalBody.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="card mb-2">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h6 class="card-title">${item.name}</h6>
                                <p class="card-text small text-muted">₹${item.price} x ${item.quantity}</p>
                            </div>
                            <div class="text-end">
                                <p class="fw-bold">₹${itemTotal}</p>
                                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.productId}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        cartModalBody.innerHTML += `<hr><div class="d-flex justify-content-between align-items-center"><h5>Total:</h5><h5>₹${total}</h5></div>`;
    }

    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

function showToast(message) {
    document.getElementById('toastBody').textContent = message;
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    toast.show();
}
