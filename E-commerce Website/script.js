const products = [
    // CLOTHING
    { id: 1, category: "clothing", name: "Classic White Tee", price: 2075.00, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500" },
    { id: 2, category: "clothing", name: "Denim Jacket", price: 7055.00, img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500" },
    { id: 3, category: "clothing", name: "Urban Hoodie", price: 4565.00, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
    { id: 4, category: "clothing", name: "Canvas Sneakers", price: 5395.00, img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500" },

    // ELECTRICAL
    { id: 5, category: "electrical", name: "Noise Cancelling Pods", price: 10707.00, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500" },
    { id: 6, category: "electrical", name: "Smart Watch Elite", price: 16517.00, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 7, category: "electrical", name: "Mechanical Keyboard", price: 12035.00, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500" },

    // EDUCATIONAL
    { id: 8, category: "educational", name: "JavaScript Masterclass", price: 4067.00, img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500" },
    { id: 9, category: "educational", name: "Bamboo Sketchbook", price: 1245.00, img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500" },
    { id: 10, category: "educational", name: "Physics Kit v2", price: 6225.00, img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500" },

    // FOOD
    { id: 11, category: "food", name: "Artisan Dark Coffee", price: 1826.00, img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500" },
    { id: 12, category: "food", name: "Swiss Hazelnut Choco", price: 1038.00, img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500" },
    { id: 13, category: "food", name: "Organic Matcha Tea", price: 1577.00, img: "https://images.unsplash.com/photo-1582718194302-444a74542265?w=500" }
];

let cart = JSON.parse(localStorage.getItem('multiCart')) || [];

function init() {
    renderProducts(products);
    updateUI();
}

function renderProducts(items) {
    const storefront = document.getElementById('storefront');
    storefront.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <span class="category-tag">${p.category}</span>
            <h3 style="margin: 5px 0; font-size: 1.1rem;">${p.name}</h3>
            <p style="font-weight:600; color:var(--primary); font-size: 1.2rem;">₹${p.price.toFixed(2)}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Add to Bag</button>
        </div>
    `).join('');
}

function filterByCategory(cat) {
    if(cat === 'all') renderProducts(products);
    else renderProducts(products.filter(p => p.category === cat));
}

function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(term)));
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    saveAndUpdate();
    if (!document.getElementById('cart-drawer').classList.contains('active')) toggleCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveAndUpdate();
}

function saveAndUpdate() {
    localStorage.setItem('multiCart', JSON.stringify(cart));
    updateUI();
}

function updateUI() {
    const cartItems = document.getElementById('cart-items');
    document.getElementById('cart-badge').innerText = cart.length;
    
    cartItems.innerHTML = cart.map((item, i) => `
        <div style="display:flex; gap:12px; margin-bottom:20px; align-items:center;">
            <img src="${item.img}" style="width:55px; height:55px; border-radius:8px; object-fit:cover;">
            <div style="flex:1">
                <div style="font-size:0.9rem; font-weight:600;">${item.name}</div>
                <div style="font-size:0.85rem; opacity: 0.8;">₹${item.price.toFixed(2)}</div>
            </div>
            <button onclick="removeItem(${i})" style="border:none; background:none; cursor:pointer; color:#ff4757; font-size:1.1rem;">✕</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerText = `₹${total.toFixed(2)}`;
}

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('active');
    const overlay = document.getElementById('overlay');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function checkout() {
    if (cart.length === 0) return alert("Your bag is empty!");
    alert("✨ Order placed successfully! Check your email for confirmation.");
    cart = [];
    saveAndUpdate();
    toggleCart();
}

init();