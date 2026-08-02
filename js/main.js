function initProductClassFilters() {
    const sec4Buttons = document.querySelectorAll('.sec4 .filter_btns .all-items');
    const sec4Items = document.querySelectorAll('.sec4 .products > div');

    if (sec4Buttons.length && sec4Items.length) {
        sec4Buttons.forEach(button => {
            button.addEventListener('click', function () {
                sec4Buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter') || 'all';

                sec4Items.forEach(item => {
                    const classes = item.className.split(/\s+/);
                    const shouldShow = filter === 'all' || classes.includes(filter);
                    item.style.display = shouldShow ? '' : 'none';
                });
            });
        });
    }

    const sec6Buttons = document.querySelectorAll('.sec6 .cat_item');
    const sec6Items = document.querySelectorAll('.sec6 .mini_product_card');

    if (sec6Buttons.length && sec6Items.length) {
        sec6Buttons.forEach(button => {
            button.addEventListener('click', function () {
                sec6Buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter') || 'all';

                sec6Items.forEach(item => {
                    const classes = item.className.split(/\s+/);
                    const shouldShow = filter === 'all' || classes.includes(filter);
                    item.style.display = shouldShow ? '' : 'none';
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    /* ========================= AOS Animation ============================= */
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });
}

    if (window.jQuery && typeof window.jQuery.fn.slick === 'function') {
        const $sec80Slider = jQuery('.sec80 .my_slider');
        if ($sec80Slider.length && !$sec80Slider.hasClass('slick-initialized')) {
            $sec80Slider.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: false,
                infinite: true,
                dots: false,
                autoplay:true,
                autoplaySpeed: 3000,
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 4 } },
                    { breakpoint: 992, settings: { slidesToShow: 3 } },
                    { breakpoint: 768, settings: { slidesToShow: 2 } },
                    { breakpoint: 576, settings: { slidesToShow: 1 } }
                ]
            });
        }

        jQuery('.sec80 .btn-r').on('click', function () {
            $sec80Slider.slick('slickPrev');
        });

        jQuery('.sec80 .btn-l').on('click', function () {
            $sec80Slider.slick('slickNext');
        });

        const $sec12Slider = jQuery('.sec12 .sec12_slider');
        if ($sec12Slider.length && !$sec12Slider.hasClass('slick-initialized')) {
            $sec12Slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                autoplay: true,
                autoplaySpeed: 4000,
                infinite: true
            });
        }
    }

    initProductClassFilters();
});

/* ========================= Header & Scroll Effects ============================= */
const topBar = document.querySelector('.header, nav > header');
const header = document.querySelector('.header_bottom');
const bottom_banner = document.querySelector('.bottom_banner');
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');

let ticking = false;
let isHeaderSticky = false;

function updateHeaderState() {
    const currentScrollY = window.scrollY;
    // Scroll threshold for enabling sticky header
    const shouldStick = currentScrollY > 100;

    if (shouldStick !== isHeaderSticky) {
        isHeaderSticky = shouldStick;

        if (header) {
            header.classList.toggle('sticky', shouldStick);
        }

        if (topBar) {
            topBar.style.display = shouldStick ? 'none' : '';
        }

        if (bottom_banner) {
            bottom_banner.style.display = shouldStick ? 'none' : '';
        }
    }
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateHeaderState();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Run the header update once on page load
document.addEventListener('DOMContentLoaded', updateHeaderState);
/* ========================= Search Bar ============================= */
if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', function() {
        searchBar.classList.toggle('open');
        const icon = searchBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-magnifying-glass');
            icon.classList.toggle('fa-xmark');
        }
    });
}

/* ========================= Mobile Sidebar Navigation ============================= */
document.addEventListener("DOMContentLoaded", function () {
    const togelBtn = document.querySelector(".togel_btn");
    const customSidebar = document.querySelector(".custom_sidebar");
    const menuOverlay = document.querySelector(".menu_overlay");
    const closeSidebarBtn = document.querySelector(".close_sidebar_btn");

    if (togelBtn && customSidebar && menuOverlay) {
        togelBtn.addEventListener("click", function () {
            customSidebar.classList.add("show");
            menuOverlay.classList.add("show");
        });
    }

    if (closeSidebarBtn && customSidebar && menuOverlay) {
        closeSidebarBtn.addEventListener("click", function () {
            customSidebar.classList.remove("show");
            menuOverlay.classList.remove("show");
        });
    }

    if (menuOverlay && customSidebar) {
        menuOverlay.addEventListener("click", function () {
            customSidebar.classList.remove("show");
            menuOverlay.classList.remove("show");
        });
    }

    const dropdownHeaders = document.querySelectorAll(".mobile_main_menu .has_dropdown .menu_header");

    dropdownHeaders.forEach(function (header) {
        header.addEventListener("click", function () {
            const submenu = this.nextElementSibling;

            document.querySelectorAll(".mobile_main_menu .submenu").forEach(function (sub) {
                if (sub !== submenu) {
                    sub.style.display = "none";
                    sub.previousElementSibling?.classList.remove("active");
                }
            });

            if (submenu.style.display === "block") {
                submenu.style.display = "none";
                this.classList.remove("active");
            } else {
                submenu.style.display = "block";
                this.classList.add("active");
            }
        });
    });
});

/* ========================= Cart Management System ============================= */
let cart = JSON.parse(localStorage.getItem('organi_cart')) || [];

function saveCart() {
    localStorage.setItem('organi_cart', JSON.stringify(cart));
}

function getProductCardId(card) {
    if (card.dataset.productId) return card.dataset.productId;

    const titleEl = card.querySelector('.product_title, .product_name, h3, h4, h5, .title');
    const imgEl = card.querySelector('img');
    const title = titleEl ? titleEl.innerText.trim().split('\n')[0].trim() : (imgEl ? imgEl.alt.trim() : 'product');
    const img = imgEl ? imgEl.getAttribute('src') : '';
    const index = Array.from(document.querySelectorAll('.product_card, .mini_product_card, .product_item, .cart_box_product, .product_box')).indexOf(card);
    const seed = `${title}-${img || 'no-image'}-${index + 1}`;
    const id = seed.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]/g, '-');

    card.dataset.productId = id;
    return id;
}

document.addEventListener("DOMContentLoaded", function () {

    // 1. Open and close the top cart sidebar
    const cartHeaderBtns = document.querySelectorAll('.cart_btn');
    const cartSidebar = document.getElementById('cartSidebar') || document.querySelector('.cart-sidebar');
    const cartOverlay = document.getElementById('cartOverlay') || document.querySelector('.cart-overlay');
    const closeCartBtn = document.getElementById('closeCartBtn') || document.querySelector('.cart-sidebar .close-btn');

    cartHeaderBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (cartSidebar) cartSidebar.classList.add('active');
            if (cartOverlay) cartOverlay.classList.add('active');
        });
    });

    if (cartOverlay) {
        cartOverlay.addEventListener('click', function() {
            cartSidebar?.classList.remove('active');
            cartOverlay?.classList.remove('active');
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            cartSidebar?.classList.remove('active');
            cartOverlay?.classList.remove('active');
        });
    }

    // Close the popup window
    const closePopupBtn = document.getElementById('closePopupBtn') || document.querySelector('.cart-popup-close');
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function () {
            const popup = document.getElementById('cartPopup') || document.querySelector('.cart-popup');
            if (popup) {
                popup.classList.remove('active');
                popup.style.opacity = '0';
                popup.style.visibility = 'hidden';
            }
        });
    }

    // 2. Handle adding products when clicking the cart icon inside any card
    document.addEventListener('click', function (e) {
        
        // Target the cart icon or button directly
        const btn = e.target.closest('.card_action_btns button, .card_action_btns li, .product_action_btns button, .product_action_btns li, .fa-shopping-bag, .fa-cart-shopping, .fa-bag-shopping, .add-to-cart-btn');

        if (!btn) return;

        // Exclude the icon inside the header, sidebar, and popup
        if (btn.closest('nav, header, .header_bottom, #cartSidebar, .cart-sidebar, #cartPopup, .cart-popup')) return;

        e.preventDefault();
        e.stopPropagation();

        // **Select the individual product card directly without climbing to the parent container**
        const card = btn.closest('.product_card, .mini_product_card, .product_item, .cart_box_product, .product_box');

        if (!card) return;

        // --- A. Get the image ---
        const imgEl = card.querySelector('img');
        const img = imgEl ? imgEl.src : '';

        // --- B. Get the product name from inside this card only ---
        let title = '';
        const titleEl = card.querySelector('.product_title, .product_name, h3, h4, h5, .title');
        
        if (titleEl) {
            title = titleEl.innerText.trim();
        } else if (imgEl && imgEl.alt) {
            title = imgEl.alt.trim();
        }

        // Clean the name if extra lines are present
        if (title) {
            title = title.split('\n')[0].trim();
        } else {
            title = 'Fresh Product';
        }

        // --- C. Get the price from inside this card only ---
        let price = 10.00;
        const priceEl = card.querySelector('.sale_price, .price, .product_price, .new_price, span:not(.count)');
        if (priceEl) {
            const match = priceEl.innerText.match(/\d+(\.\d+)?/);
            if (match) price = parseFloat(match[0]);
        }

        // --- D. Unique identifier based on the card itself, not just the name ---
        const id = getProductCardId(card);

        // --- E. Update the cart array ---
        const existingItem = cart.find(item => item.id === id);
        let currentQty = 1;

        if (existingItem) {
            existingItem.quantity += 1;
            currentQty = existingItem.quantity;
        } else {
            cart.push({
                id: id,
                name: title,
                price: price,
                img: img,
                quantity: 1
            });
        }

        // Save and update the cart
        saveCart();
        updateCartUI();

        if (typeof renderCartPageTable === 'function') {
            renderCartPageTable();
        }

        // Show the confirmation popup
        showCartPopup({
            img: img,
            name: title,
            price: price,
            quantity: currentQty
        });
    });

    updateCartUI();
    if (typeof renderCartPageTable === 'function') renderCartPageTable();
});

/* ========================= Show Cart Popup ============================= */
function showCartPopup(product) {
    const popup = document.getElementById('cartPopup') || document.querySelector('.cart-popup');
    if (!popup) return;

    const imgEl = document.getElementById('popupProductImg') || popup.querySelector('img');
    const nameEl = document.getElementById('popupProductName') || popup.querySelector('h4');
    const priceEl = document.getElementById('popupProductPrice') || popup.querySelector('.popup-price');
    const qtyEl = document.getElementById('popupProductQty') || popup.querySelector('.popup-qty');

    if (imgEl) imgEl.src = product.img;
    if (nameEl) nameEl.innerText = product.name;
    if (priceEl) priceEl.innerText = `$${(product.price * product.quantity).toFixed(2)}`;
    if (qtyEl) qtyEl.innerText = `Quantity: ${product.quantity}`;

    // Activate the popup class and animation
    popup.classList.add('active');
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
    popup.style.transform = 'translateY(0)';

    // Hide the popup automatically after 3.5 seconds
    clearTimeout(window.popupTimer);
    window.popupTimer = setTimeout(() => {
        popup.classList.remove('active');
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    }, 3500);
}

/* ========================= Update Sidebar & Header UI ============================= */
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartSidebarItems') || document.querySelector('.cart-sidebar-body');
    const cartTotalEl = document.getElementById('cartSidebarTotal') || document.querySelector('#cartSidebarTotal');
    const badgeCounts = document.querySelectorAll('.cart_btn .count, .badge_count');
    const cartBadges = document.querySelectorAll('.cart_btn .cart-count-badge');

    let total = 0;
    let totalItems = 0;
    let distinctProductsCount = cart.length;

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 20px; color: #888;">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                totalItems += item.quantity;

                cartItemsContainer.innerHTML += `
                    <div class="cart-sidebar-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                        <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
                        <div class="cart-item-details" style="flex: 1; margin: 0 10px;">
                            <h4 style="font-size: 14px; margin: 0; color: #333;">${item.name}</h4>
                            <span class="price" style="color: #7CC000; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div class="cart-item-qty" style="display: flex; align-items: center; gap: 5px;">
                            <button onclick="changeQuantity('${item.id}', -1)" style="width: 25px; height: 25px; cursor: pointer; border:1px solid #ccc; background:#fff;">-</button>
                            <span style="font-weight:bold;">${item.quantity}</span>
                            <button onclick="changeQuantity('${item.id}', 1)" style="width: 25px; height: 25px; cursor: pointer; border:1px solid #ccc; background:#fff;">+</button>
                        </div>
                    </div>
                `;
            });
        }
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            totalItems += item.quantity;
        });
    }

    if (cartTotalEl) cartTotalEl.innerText = `$${total.toFixed(2)}`;

    badgeCounts.forEach(badge => {
        badge.innerText = distinctProductsCount;
    });

    cartBadges.forEach(badge => {
        badge.innerText = distinctProductsCount;
        badge.style.display = distinctProductsCount > 0 ? 'inline-flex' : 'none';
    });
}

function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
        updateCartUI();
        if (typeof renderCartPageTable === 'function') {
            renderCartPageTable();
        }
    }
}

/* ========================= Cart Page Table (cart.html) ============================= */
function renderCartPageTable() {
    const tableBody = document.getElementById("cartPageTableBody");
    const subtotalEl = document.getElementById("cartPageSubtotal");
    const totalEl = document.getElementById("cartPageTotal");

    if (!tableBody) return;

    tableBody.innerHTML = "";
    let grandTotal = 0;

    if (cart.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="padding: 30px; text-align: center; color: #888; font-size: 16px;">
                    Your cart is empty. <a href="./product.html" style="color: #7CC000; font-weight: bold; text-decoration: underline;">Browse Products</a>
                </td>
            </tr>
        `;
        if (subtotalEl) subtotalEl.innerText = "$0.00";
        if (totalEl) totalEl.innerText = "$0.00";
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        tableBody.innerHTML += `
            <tr style="border-bottom: 1px solid #eee; height: 70px;">
                <td style="padding: 10px; display: flex; align-items: center; justify-content: center; gap: 12px;">
                    <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid #ddd;">
                    <span style="font-weight: 600; color: #333;">${item.name}</span>
                </td>
                
                <td style="padding: 10px; color: #555;">$${item.price.toFixed(2)}</td>

                <td style="padding: 10px;">
                    <div style="display: inline-flex; align-items: center; border: 1px solid #ccc; border-radius: 4px; overflow: hidden;">
                        <button onclick="updatePageCartQty('${item.id}', -1)" style="width: 30px; height: 30px; background: #eee; border: none; cursor: pointer; font-size: 16px;">-</button>
                        <span style="width: 35px; text-align: center; font-weight: bold; font-size: 14px;">${item.quantity}</span>
                        <button onclick="updatePageCartQty('${item.id}', 1)" style="width: 30px; height: 30px; background: #eee; border: none; cursor: pointer; font-size: 16px;">+</button>
                    </div>
                </td>

                <td style="padding: 10px; font-weight: bold; color: #7CC000;">$${itemTotal.toFixed(2)}</td>

                <td style="padding: 10px;">
                    <button onclick="removeFromPageCart('${item.id}')" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 18px;" title="Remove Product">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    if (subtotalEl) subtotalEl.innerText = `$${grandTotal.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${grandTotal.toFixed(2)}`;
}

function updatePageCartQty(id, delta) {
    changeQuantity(id, delta);
}

function removeFromPageCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    renderCartPageTable();
}