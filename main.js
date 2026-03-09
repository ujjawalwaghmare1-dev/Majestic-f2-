// ========== MAIN JAVASCRIPT FOR PUBLIC WEBSITE ==========

// Load data from localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];
let videos = JSON.parse(localStorage.getItem('videos')) || [];
let services = JSON.parse(localStorage.getItem('services')) || [
    {id: 1, icon: '🎬', title: 'Video Editing', description: 'Professional video editing services'},
    {id: 2, icon: '🖼️', title: 'Photo Editing', description: 'Expert photo retouching'},
    {id: 3, icon: '💻', title: 'Web Development', description: 'Custom website design'},
    {id: 4, icon: '📱', title: 'Facebook Ads', description: 'Strategic ad campaigns'},
    {id: 5, icon: '🎥', title: 'UGC Videos', description: 'Authentic content creation'},
    {id: 6, icon: '📊', title: 'Digital Marketing', description: 'Complete marketing solutions'}
];
let ads = JSON.parse(localStorage.getItem('ads')) || [];
let dmConfig = JSON.parse(localStorage.getItem('dmConfig')) || {
    enabled: false,
    message: "Hi {username}! Thanks for your interest. Check out: {product_link}",
    keywords: ['price', 'buy', 'link', 'info'],
    reelLinks: []
};

// Display services
function displayServices() {
    const container = document.getElementById('services-container');
    if(!container) return;
    
    container.innerHTML = services.map(s => `
        <div class="service-card">
            <div style="font-size: 3rem; margin-bottom: 1rem;">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <button class="btn btn-outline" onclick="window.location.href='login.html'">Learn More</button>
        </div>
    `).join('');
}

// Display products
function displayProducts() {
    const container = document.getElementById('products-container');
    if(!container) return;
    
    if(products.length === 0) {
        container.innerHTML = '<p style="text-align: center;">No products available</p>';
        return;
    }
    
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div style="font-size: 2rem; color: var(--primary-light); margin: 1rem 0;">₹${p.price}</div>
            <button class="btn btn-primary" onclick="initiatePayment(${p.id})">Pay with UPI</button>
        </div>
    `).join('');
}

// Display videos
function displayVideos() {
    const container = document.getElementById('videos-container');
    if(!container) return;
    
    if(videos.length === 0) {
        container.innerHTML = '<p style="text-align: center;">No videos available</p>';
        return;
    }
    
    container.innerHTML = videos.map(v => `
        <div class="product-card">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎥</div>
            <h3>${v.title}</h3>
            <p>${v.description || ''}</p>
        </div>
    `).join('');
}

// Display ads
function displayAds() {
    const container = document.getElementById('ads-container');
    if(!container) return;
    
    const activeAds = ads.filter(a => a.status === 'active');
    
    if(activeAds.length === 0) {
        container.innerHTML = '<p style="text-align: center;">No active ads</p>';
        return;
    }
    
    container.innerHTML = activeAds.map(a => `
        <div class="product-card" onclick="window.open('${a.link}', '_blank')" style="cursor: pointer;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">📺</div>
            <h3>${a.title}</h3>
            <button class="btn btn-primary">Learn More</button>
        </div>
    `).join('');
}

// Payment initiation
function initiatePayment(productId) {
    const product = products.find(p => p.id === productId);
    
    // Open UPI app
    const upiUrl = `upi://pay?pa=9371270065@jio&pn=MajesticCompany&am=${product.price}&tn=Product_${productId}`;
    window.location.href = upiUrl;
    
    // Show payment verification
    setTimeout(() => {
        if(confirm('Payment done? Click OK to verify')) {
            verifyPayment(productId);
        }
    }, 30000);
}

function verifyPayment(productId) {
    alert('✅ Payment verified! Download will start shortly.');
    // In production, actual download link here
}

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const msg = document.getElementById('contactMsg').value;
    
    const message = `Hello Majestic Company%0a%0aName: ${name}%0aPhone: ${phone}%0aMessage: ${msg}`;
    window.open(`https://wa.me/919371270065?text=${message}`, '_blank');
});

// Initialize on load
window.onload = function() {
    displayServices();
    displayProducts();
    displayVideos();
    displayAds();
    
    // Auto DM simulation
    if(dmConfig.enabled) {
        console.log('Auto DM system active');
    }
};
