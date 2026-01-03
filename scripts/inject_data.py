import json

def main():
    # Load the new product data
    with open(r'c:\Dr.Dgb\data pipeline\json\new_products.json', 'r', encoding='utf-8') as f:
        products_json = f.read()

    # --- SCRIPT.JS TEMPLATE ---
    script_js = f"""// Compound data injected from data pipeline
const embeddedCompoundData = {products_json};

// Load and process compound data
let compoundsData = [];
let filteredCompounds = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {{
    loadCompoundData();
    setupEventListeners();
}});

// Load compound data
function loadCompoundData() {{
    try {{
        showLoading(true);
        
        // Use injected data directly
        compoundsData = embeddedCompoundData;
        filteredCompounds = [...compoundsData];

        if (compoundsData.length === 0) {{
            showError('No compounds found in data');
        }} else {{
            renderCompounds(compoundsData);
        }}

        showLoading(false);
    }} catch (error) {{
        console.error('Error loading compound data:', error);
        showLoading(false);
        showError('Failed to load compounds. Please try again later.');
    }}
}}

// Render compounds to the grid
function renderCompounds(compounds) {{
    const grid = document.getElementById('compoundsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    compounds.forEach(compound => {{
        const compoundCard = createCompoundCard(compound);
        grid.appendChild(compoundCard);
    }});
}}

// Create compound card element matching the new UI
function createCompoundCard(compound) {{
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-2xl border border-gray-100 p-6 relative group overflow-hidden cursor-pointer';
    card.onclick = () => navigateToCompound(compound.id);
    
    // Determine badge content and color based on compound attributes
    let badgeText = 'In Stock';
    let badgeClass = 'bg-green-100 text-green-700';
    
    if (compound.name.includes('Enanthate')) {{
        badgeText = 'Bulk Only';
        badgeClass = 'bg-blue-100 text-blue-700';
    }} else if (compound.name.includes('Propionate')) {{
        badgeText = 'High Demand';
        badgeClass = 'bg-green-100 text-green-700';
    }} else if (compound.esterType === 'blend' || compound.name.includes('Sustanon')) {{
        badgeText = 'Blend';
        badgeClass = 'bg-purple-100 text-purple-700';
    }}

    const esterLabel = compound.esterType === 'short-ester' ? 'Short Ester' : 
                      compound.esterType === 'long-ester' ? 'Long Ester' : 
                      compound.esterType === 'blend' ? 'Multi-Ester' : 'Compound';

    // Ensure price exists
    const displayPrice = (compound.price && compound.price.length > 2) ? compound.price[2] : (compound.price ? compound.price[0] : 0);

    card.innerHTML = `
        <div class="absolute top-4 left-4 ${{badgeClass}} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            ${{badgeText}}
        </div>
        <div class="h-48 mb-6 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-primary/5 transition-colors">
            <img src="${{compound.mainImage}}" alt="${{compound.name}}" class="h-32 object-contain mix-blend-multiply">
        </div>
        <div>
            <div class="text-xs text-gray-400 font-semibold mb-1">${{esterLabel}}</div>
            <h4 class="font-bold text-gray-900 text-lg mb-2 leading-tight group-hover:text-primary transition">
                ${{compound.name}}
            </h4>
            <div class="flex items-center justify-between mt-4">
                <div>
                    <span class="block text-xs text-gray-400">Box of 10</span>
                    <span class="text-lg font-bold text-gray-900">$${{displayPrice}}.00</span>
                </div>
                <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}}

// Navigate to compound detail page
function navigateToCompound(compoundId) {{
    window.location.href = `product.html?id=${{compoundId}}`;
}}

// Setup event listeners
function setupEventListeners() {{
    // Category filter buttons
    document.querySelectorAll('.category-btn').forEach(btn => {{
        btn.addEventListener('click', function (e) {{
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(b => {{
                b.classList.remove('active', 'bg-gray-900', 'text-white', 'shadow-lg', 'transform', 'scale-105');
                b.classList.add('bg-white', 'border', 'border-gray-200', 'text-gray-600');
            }});

            // Add active class to clicked button
            this.classList.remove('bg-white', 'border', 'border-gray-200', 'text-gray-600');
            this.classList.add('active', 'bg-gray-900', 'text-white', 'shadow-lg', 'transform', 'scale-105');
            
            filterCompounds(this.dataset.category);
        }});
    }});
    
    // Search functionality hook
    const searchInput = document.getElementById('searchInput'); // If exists
    if (searchInput) {{
        searchInput.addEventListener('input', (e) => searchCompounds(e.target.value));
    }}
}}

// Filter and sort compounds
function filterCompounds(category) {{
    let filtered = [...compoundsData];

    // Apply category filter
    if (category !== 'all') {{
        filtered = filtered.filter(compound => compound.esterType === category);
    }}

    filteredCompounds = filtered;
    renderCompounds(filteredCompounds);
}}

// Show loading state
function showLoading(show) {{
    const loadingState = document.getElementById('loadingState');
    const compoundsGrid = document.getElementById('compoundsGrid');
    
    if (!loadingState || !compoundsGrid) return;

    if (show) {{
        loadingState.classList.remove('hidden');
        compoundsGrid.classList.add('hidden');
    }} else {{
        loadingState.classList.add('hidden');
        compoundsGrid.classList.remove('hidden');
    }}
}}

// Show error message
function showError(message) {{
    const compoundsGrid = document.getElementById('compoundsGrid');
    if (compoundsGrid) {{
        compoundsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-triangle text-medical-red text-4xl mb-4"></i>
                <p class="text-gray-600 text-lg">${{message}}</p>
            </div>
        `;
    }}
}}

// Search functionality
function searchCompounds(query) {{
    if (!query) {{
        renderCompounds(compoundsData);
        return;
    }}
    
    const filtered = compoundsData.filter(compound => 
        compound.name.toLowerCase().includes(query.toLowerCase()) || 
        compound.category.toLowerCase().includes(query.toLowerCase())
    );
    renderCompounds(filtered);
}}

// Open WhatsApp chat function (Generic for Home Page)
function openWhatsAppChat(type = 'General') {{
    let message = "";
    if (type === 'Bulk') {{
        message = encodeURIComponent(`Hi! I'm interested in a bulk inquiry for your pharmaceutical products.`);
    }} else {{
        message = encodeURIComponent(`Hi! I'm interested in your pharmaceutical products. I would like to talk with a sales advisor.`);
    }}
    const whatsappNumber = '917032955062'; 
    const whatsappUrl = `https://wa.me/${{whatsappNumber}}?text=${{message}}`;
    window.open(whatsappUrl, '_blank');
}}
"""

    # --- PRODUCT-SCRIPT.JS TEMPLATE ---
    product_script_js = f"""// Product detail page functionality
let currentProduct = null;
let currentImageIndex = 0;

// Embedded product data to avoid CORS issues
const embeddedProductData = {products_json};

// Initialize the product detail page
document.addEventListener('DOMContentLoaded', function () {{
    loadProductDetails();
    setupEventListeners();
}});

// Load product details based on URL parameter
function loadProductDetails() {{
    try {{
        const urlParams = new URLSearchParams(globalThis.location.search);
        const productId = urlParams.get('id');

        if (!productId) {{
            showError('Product not found');
            return;
        }}

        // Use embedded data
        const products = embeddedProductData;
        currentProduct = products.find(p => p.id === productId);

        if (!currentProduct) {{
            showError('Product not found');
            return;
        }}

        renderProductDetails(currentProduct);
        loadRelatedProducts(products, currentProduct);
        
    }} catch (error) {{
        console.error('Error loading product details:', error);
        showError('Failed to load product details');
    }}
}}

// Render product details on the page
function renderProductDetails(product) {{
    // Update SEO metadata dynamically
    updateSEOMetadata(product);

    // Update basic product info
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productCategory').textContent = product.category || 'Pharmaceutical Compound';
    document.getElementById('breadcrumbProduct').textContent = product.name;
    document.getElementById('productDescription').textContent = product.description;

    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {{
        mainImage.src = product.mainImage;
        mainImage.alt = `${{product.name}} - ${{product.description}}`;
    }}

    // Render thumbnails
    renderThumbnails(product.images);

    // Update pricing
    updatePricing(product.price);

    // Update specifications
    updateSpecifications(product);
}}

// Update SEO metadata dynamically based on product
function updateSEOMetadata(product) {{
    const productName = product.name;
    const productDescription = product.description;
    const productPrice = product.price ? product.price[0] : 0;

    // Update page title
    document.title = `Buy ${{productName}} Online - Shree Tanvika Entreprise | ${{productPrice}} USD`;
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.textContent = `Buy ${{productName}} Online - Shree Tanvika Entreprise | ${{productPrice}} USD`;

    // Update meta description
    const description = `Premium pharmaceutical grade ${{productName.toLowerCase()}} for sale at Shree Tanvika Entreprise. ${{productDescription}}. Competitive pricing at ${{productPrice}} USD with fast worldwide shipping.`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    
    // Update canonical URL
    const canonicalUrl = `https://shreetanvikaenterprise.com/product.html?id=${{product.id}}`;
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) linkCanonical.setAttribute('href', canonicalUrl);
}}

// Update structured data for the product
function updateStructuredData(product) {{
    const structuredData = {{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "brand": {{
            "@type": "Brand",
            "name": "Shree Tanvika Entreprise"
        }},
        "category": product.category,
        "offers": {{
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.price ? product.price[0].toString() : "0",
            "availability": "https://schema.org/InStock",
            "seller": {{
                "@type": "Organization",
                "name": "Shree Tanvika Entreprise"
            }}
        }},
        "image": product.mainImage
    }};

    const schemaScript = document.getElementById('productSchema');
    if (schemaScript) schemaScript.textContent = JSON.stringify(structuredData, null, 2);
}}

// Render thumbnail images
function renderThumbnails(images) {{
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    if (!thumbnailGrid) return;
    
    thumbnailGrid.innerHTML = '';

    images.forEach((image, index) => {{
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer ${{index === 0 ? 'active' : ''}}`;
        thumbnail.onclick = () => selectImage(index);

        thumbnail.innerHTML = `
            <img src="${{image}}" alt="Thumbnail" class="w-full h-20 object-cover">
        `;

        thumbnailGrid.appendChild(thumbnail);
    }});
}}

// Select and display main image
function selectImage(index) {{
    if (!currentProduct || index >= currentProduct.images.length) return;

    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {{
        mainImage.src = currentProduct.images[index];
    }}

    // Update thumbnail active state
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {{
        if (i === index) {{
            thumb.classList.add('active');
        }} else {{
            thumb.classList.remove('active');
        }}
    }});
}}

// Update pricing information
function updatePricing(prices) {{
    if (!prices) return;
    
    const setPrice = (id, price) => {{
        const el = document.getElementById(id);
        if (el) el.textContent = `$${{price}}`;
    }};
    
    setPrice('mainPrice', prices[0]);
    // Map array to potential other IDs if they exist
    setPrice('price5', prices[1]);
    setPrice('price10', prices[2]);
    setPrice('price25', prices[3]);
    setPrice('price50', prices[4]);
}}

// Update product specifications
function updateSpecifications(product) {{
    const el = document.getElementById('activeIngredient');
    if (el) el.textContent = product.name;
    
    const strengthEl = document.getElementById('strength');
    if (strengthEl) strengthEl.textContent = '200 mg/mL'; // Default or from data
    
    const esterEl = document.getElementById('esterType');
    if (esterEl) esterEl.textContent = product.esterType.replace('-', ' ').toUpperCase();
    
    const hlEl = document.getElementById('halfLife');
    if (hlEl) hlEl.textContent = product.halfLife;
}}

// Load related products
function loadRelatedProducts(allProducts, currentProduct) {{
    const relatedProducts = allProducts.filter(p => p.id !== currentProduct.id).slice(0, 4);
    const relatedGrid = document.getElementById('relatedProducts');
    
    if (!relatedGrid) return;

    relatedGrid.innerHTML = '';
    relatedProducts.forEach(product => {{
        const productCard = createRelatedProductCard(product);
        relatedGrid.appendChild(productCard);
    }});
}}

// Create related product card (Premium Style)
function createRelatedProductCard(product) {{
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-2xl border border-gray-100 p-6 relative group overflow-hidden cursor-pointer';
    card.onclick = () => navigateToProduct(product.id);
    
    // Determine badge content
    let badgeText = 'In Stock';
    let badgeClass = 'bg-green-100 text-green-700';
    
    if (product.name.includes('Enanthate')) {{
        badgeText = 'Bulk Only';
        badgeClass = 'bg-blue-100 text-blue-700';
    }}

    const displayPrice = (product.price && product.price.length > 2) ? product.price[2] : (product.price ? product.price[0] : 0);

    card.innerHTML = `
        <div class="absolute top-4 left-4 ${{badgeClass}} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            ${{badgeText}}
        </div>
        <div class="h-40 mb-4 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-primary/5 transition-colors">
            <img src="${{product.mainImage}}" alt="${{product.name}}" class="h-28 object-contain mix-blend-multiply">
        </div>
        <div>
            <div class="text-xs text-gray-400 font-semibold mb-1">Pharmaceutical Grade</div>
            <h4 class="font-bold text-gray-900 text-sm mb-2 leading-tight group-hover:text-primary transition line-clamp-2">
                ${{product.name}}
            </h4>
            <div class="flex items-center justify-between mt-3">
                <div>
                    <span class="block text-xs text-gray-400">Box of 10</span>
                    <span class="text-base font-bold text-gray-900">$${{displayPrice}}.00</span>
                </div>
                <button class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition">
                    <i class="fas fa-plus text-xs"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}}

// Navigate to product detail page
function navigateToProduct(productId) {{
    globalThis.location.href = `product.html?id=${{productId}}`;
}}

// Setup event listeners
function setupEventListeners() {{
    // Quantity controls
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');

    if (decreaseBtn && increaseBtn && quantityInput) {{
        decreaseBtn.addEventListener('click', () => {{
            const currentValue = Number.parseInt(quantityInput.value, 10);
            if (currentValue > 1) {{
                quantityInput.value = currentValue - 1;
            }}
        }});
        
        increaseBtn.addEventListener('click', () => {{
            const currentValue = Number.parseInt(quantityInput.value, 10);
            quantityInput.value = currentValue + 1;
        }});
    }}
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {{
        button.addEventListener('click', () => {{
            const tabName = button.dataset.tab;
            switchTab(tabName);
        }});
    }});
    
    // WhatsApp chat button
    const whatsappBtn = document.querySelector('button[onclick="openWhatsAppChat()"]');
    if (!whatsappBtn) {{
        // If not inline, find by other means or attach global if needed
    }}
}}

// Switch between tabs
function switchTab(tabName) {{
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {{
        if (button.dataset.tab === tabName) {{
            button.classList.add('active', 'text-primary', 'bg-gray-50');
        }} else {{
            button.classList.remove('active', 'text-primary', 'bg-gray-50');
        }}
    }});
    
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {{
        if (content.id === tabName) {{
            content.classList.add('active');
            content.style.animation = 'none';
            content.offsetHeight; 
            content.style.animation = 'fadeIn 0.3s ease-in-out';
        }} else {{
            content.classList.remove('active');
        }}
    }});
}}

// Open WhatsApp chat function
function openWhatsAppChat(type = 'General') {{
    let message = "";
    if (type === 'Bulk') {{
        message = encodeURIComponent(`Hi! I'm interested in a bulk inquiry for your pharmaceutical products.`);
    }} else {{
        const productName = document.getElementById('productName') ? document.getElementById('productName').textContent : 'Product';
        const quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : '1';
        message = encodeURIComponent(`Hi! I'm interested in ${{productName}}. I would like to talk with a sales advisor about purchasing ${{quantity}} unit(s).`);
    }}
    const whatsappNumber = '917032955062'; 
    const whatsappUrl = `https://wa.me/${{whatsappNumber}}?text=${{message}}`;
    window.open(whatsappUrl, '_blank');
}}

// Show error message
function showError(message) {{
    const mainContent = document.querySelector('main');
    if (mainContent) {{
        mainContent.innerHTML = `
            <div class="bg-white rounded-lg shadow-sm p-12 text-center">
                <i class="fas fa-exclamation-triangle text-red-500 text-6xl mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                <p class="text-gray-600 mb-6">${{message}}</p>
                <a href="index.html" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block">
                    Back to Products
                </a>
            </div>
        `;
    }}
}}
"""

    # Write files
    with open(r'c:\Dr.Dgb\data pipeline\scripts\script.js', 'w', encoding='utf-8') as f:
        f.write(script_js)
    
    with open(r'c:\Dr.Dgb\data pipeline\scripts\product-script.js', 'w', encoding='utf-8') as f:
        f.write(product_script_js)

    print("Successfully injected new data into script.js and product-script.js")

if __name__ == "__main__":
    main()
