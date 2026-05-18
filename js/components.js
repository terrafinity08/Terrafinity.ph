'use strict';

/* ===================================================================
   components.js — Terrafinity shared utilities
   Loaded on ALL pages. Handles:
   · Cart state (localStorage key: 'terrafinity_cart')
   · Nav & footer injection
   · Nav behaviors (scroll, hamburger, search toggle)
   · Toast notifications
   · Newsletter form handler
   =================================================================== */

/* ===== CART STATE ===== */
let cart = [];

const CART_KEY = 'terrafinity_cart';

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    cart = stored ? JSON.parse(stored) : [];
  } catch (e) {
    cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {}
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function addToCart(id, name, price) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCartToStorage();
  updateCartUI();
  showToast(`${name} added to cart`);
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCartToStorage();
  updateCartUI();
}

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function miniTerrariumSVG() {
  return `<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="16" r="12" stroke="#6E7F68" stroke-width="1.2" fill="rgba(110,127,104,0.1)"/>
    <ellipse cx="18" cy="24" rx="8" ry="4" fill="#3D4A3C" opacity="0.4"/>
    <line x1="16" y1="18" x2="16" y2="10" stroke="#5a7a52" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="18" y1="18" x2="18" y2="8" stroke="#6E7F68" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="20" y1="18" x2="20" y2="12" stroke="#4a6a44" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) {
    countEl.textContent = count;
    countEl.style.transform = 'scale(1.4)';
    setTimeout(() => { countEl.style.transform = ''; }, 200);
  }

  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const subtotalEl = document.getElementById('cartSubtotal');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="#CFCFC8" stroke-width="1.5"/><path d="M16 16l16 16M32 16L16 32" stroke="#CFCFC8" stroke-width="1.5" stroke-linecap="round"/></svg>
        <p>Your cart is empty</p>
        <a href="index.html#shop" class="btn btn--dark btn--sm" onclick="closeCart()">Shop terrariums</a>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item__img">
        ${miniTerrariumSVG()}
      </div>
      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__price">$${(item.price * item.qty).toFixed(2)}${item.qty > 1 ? ` <span style="color:#aaa">× ${item.qty}</span>` : ''}</p>
        <button class="cart-item__remove" onclick="removeFromCart(${JSON.stringify(item.id)})">Remove</button>
      </div>
    </div>`).join('');

  if (footer) {
    footer.style.display = 'block';
    if (subtotalEl) subtotalEl.textContent = `$${getCartTotal().toFixed(2)}`;
  }
}

/* ===== TOAST ===== */
let toastTimer;

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  clearTimeout(toastTimer);
  t.textContent = msg;
  t.classList.add('show');
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ===== NEWSLETTER ===== */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast('Subscribed! Welcome to Terrafinity.');
  if (input) input.value = '';
}

/* ===== NAV HTML TEMPLATE ===== */
function getNavHTML(activePage) {
  function navLink(href, label, page) {
    const isActive = activePage === page;
    const cls = isActive ? 'nav__link nav__link--active' : 'nav__link';
    return `<a href="${href}" class="${cls}">${label}</a>`;
  }

  const shopActive = activePage === 'shop' ? 'nav__link nav__link--active' : 'nav__link';

  return `
  <header class="nav" id="nav">
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 14C4 14 6 8 14 6C22 4 24 10 20 14C16 18 10 16 8 20C6 24 10 26 14 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M14 6C14 6 12 10 14 14C16 18 20 18 20 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M8 10C8 10 10 11 12 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M18 8C18 8 17 11 16 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>Terrafinity</span>
      </a>

      <nav class="nav__links">
        ${navLink('index.html', 'Home', 'home')}
        <div class="nav__item nav__item--dropdown">
          <a href="index.html#shop" class="${shopActive}">Shop <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
          <div class="nav__dropdown">
            <a href="index.html#shop">All Terrariums</a>
            <a href="index.html#shop">Best Sellers</a>
            <a href="index.html#shop">New Arrivals</a>
            <a href="index.html#shop">Accessories</a>
            <a href="index.html#shop">Gift Cards</a>
          </div>
        </div>
        ${navLink('series.html', 'The Series', 'series')}
        ${navLink('create.html', 'Create Your Own', 'create')}
        ${navLink('workshops.html', 'Workshops', 'workshops')}
        ${navLink('gallery.html', 'Gallery', 'gallery')}
        ${navLink('index.html#journal', 'Journal', 'journal')}
      </nav>

      <div class="nav__actions">
        <button class="nav__icon" aria-label="Search" id="searchToggle">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.5" cy="7.5" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11.5 11.5L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <button class="nav__icon" aria-label="Account">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <button class="nav__icon nav__cart" aria-label="Cart" id="cartToggle">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2h2l2.4 9.6A1 1 0 007.36 13h7.28a1 1 0 00.96-.72L17 6H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8" cy="16" r="1" fill="currentColor"/><circle cx="14" cy="16" r="1" fill="currentColor"/></svg>
          <span class="nav__cart-count" id="cartCount">0</span>
        </button>
        <a href="index.html#contact" class="btn btn--dark btn--sm">Book a consultation <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>

      <button class="nav__hamburger" id="menuToggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Search bar -->
    <div class="nav__search" id="searchBar">
      <input type="text" placeholder="Search terrariums, plants, accessories…" />
      <button>Search</button>
    </div>

    <!-- Mobile menu -->
    <div class="nav__mobile" id="mobileMenu">
      <a href="index.html">Home</a>
      <a href="index.html#shop">Shop</a>
      <a href="series.html">The Series</a>
      <a href="create.html">Create Your Own</a>
      <a href="workshops.html">Workshops</a>
      <a href="gallery.html">Gallery</a>
      <a href="index.html#journal">Journal</a>
      <a href="index.html#contact" class="btn btn--dark" style="margin-top:1rem;">Book a consultation</a>
    </div>
  </header>

  <!-- CART DRAWER -->
  <div class="cart-overlay" id="cartOverlay"></div>
  <aside class="cart-drawer" id="cartDrawer">
    <div class="cart-drawer__header">
      <h3>Your Cart</h3>
      <button id="cartClose">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="cart-drawer__body" id="cartBody">
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="#CFCFC8" stroke-width="1.5"/><path d="M16 16l16 16M32 16L16 32" stroke="#CFCFC8" stroke-width="1.5" stroke-linecap="round"/></svg>
        <p>Your cart is empty</p>
        <a href="index.html#shop" class="btn btn--dark btn--sm" onclick="closeCart()">Shop terrariums</a>
      </div>
    </div>
    <div class="cart-drawer__footer" id="cartFooter" style="display:none">
      <div class="cart-subtotal">
        <span>Subtotal</span>
        <span id="cartSubtotal">$0.00</span>
      </div>
      <p class="cart-note">Free shipping on orders over $100</p>
      <button class="btn btn--dark btn--full">Checkout</button>
    </div>
  </aside>`;
}

/* ===== FOOTER HTML TEMPLATE ===== */
function getFooterHTML() {
  return `
  <footer class="footer" id="contact">
    <div class="footer__top">
      <div class="footer__brand">
        <a href="index.html" class="nav__logo footer__logo">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none"><path d="M4 14C4 14 6 8 14 6C22 4 24 10 20 14C16 18 10 16 8 20C6 24 10 26 14 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14 6C14 6 12 10 14 14C16 18 20 18 20 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>Terrafinity</span>
        </a>
        <p>Modern terrariums for calmer spaces and a more mindful life.</p>
        <div class="footer__social">
          <a href="#" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" stroke-width="1.3"/><circle cx="9" cy="9" r="3.5" stroke="currentColor" stroke-width="1.3"/><circle cx="13" cy="5" r="1" fill="currentColor"/></svg>
          </a>
          <a href="#" aria-label="Pinterest">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 15.5c.5-2 1-4.5 1-4.5s-.5-1 0-2 1.5-2 2.5-2 1.5 1 1.5 2-1 3-1 3 .5 1 1.5 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 3c0 2 1.5 3 3 3v3c-1.5 0-3-.5-4-1.5V13a4 4 0 11-4-4V12a1 1 0 100 2 1 1 0 000-2V3h5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </div>

      <div class="footer__col">
        <h5>Shop</h5>
        <a href="index.html#shop">All Terrariums</a>
        <a href="index.html#shop">Best Sellers</a>
        <a href="index.html#shop">New Arrivals</a>
        <a href="index.html#shop">Accessories</a>
        <a href="index.html#shop">Gift Cards</a>
      </div>
      <div class="footer__col">
        <h5>Company</h5>
        <a href="index.html#about">About Us</a>
        <a href="index.html#about">Sustainability</a>
        <a href="index.html#about">Our Process</a>
        <a href="index.html#about">Care Guide</a>
        <a href="index.html#contact">Contact</a>
      </div>
      <div class="footer__col">
        <h5>Resources</h5>
        <a href="workshops.html">Workshops</a>
        <a href="gallery.html">Gallery</a>
        <a href="index.html#journal">Journal</a>
        <a href="#">FAQ</a>
        <a href="#">Shipping &amp; Returns</a>
        <a href="#">Privacy Policy</a>
      </div>
      <div class="footer__col footer__newsletter">
        <h5>Stay inspired</h5>
        <p>Sign up for plant care tips, new arrivals, and mindful living.</p>
        <form class="newsletter-form" onsubmit="handleNewsletterSubmit(event)">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" aria-label="Subscribe">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </form>
      </div>
    </div>

    <div class="footer__bottom">
      <p>© 2026 Terrafinity. All rights reserved.</p>
      <p>Nature, Simplified.</p>
    </div>
  </footer>

  <!-- TOAST -->
  <div class="toast" id="toast"></div>`;
}

/* ===== NAV BEHAVIORS ===== */
function initNavBehaviors() {
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('open');
      if (searchBar.classList.contains('open')) {
        const inp = searchBar.querySelector('input');
        if (inp) inp.focus();
      }
    });
  }

  document.getElementById('cartToggle')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
}

/* ===== initPage ===== */
/**
 * Call this on every inner page:
 *   initPage('workshops')  // pass the page key
 * Valid keys: 'home' | 'shop' | 'create' | 'workshops' | 'gallery' | 'journal'
 */
function initPage(activePage) {
  // 1. Load cart from localStorage
  loadCartFromStorage();

  // 2. Inject nav into #site-nav
  const navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.outerHTML = getNavHTML(activePage);
  }

  // 3. Inject footer into #site-footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.outerHTML = getFooterHTML();
  }

  // 4. Wire up nav behaviors
  initNavBehaviors();

  // 5. Sync cart badge
  updateCartUI();
}

/* ===== EXPOSE GLOBALS ===== */
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.showToast = showToast;
window.handleNewsletterSubmit = handleNewsletterSubmit;
window.initPage = initPage;
window.updateCartUI = updateCartUI;
