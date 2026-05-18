'use strict';

/* ===== PRODUCTS DATA ===== */
const products = [
  {
    id: 1,
    name: 'Forest Sphere',
    price: 128,
    badge: 'Bestseller',
    shape: 'sphere',
    desc: 'A serene closed ecosystem in hand-blown glass.',
  },
  {
    id: 2,
    name: 'Moss Haven',
    price: 158,
    badge: null,
    shape: 'geo',
    desc: 'Geometric crystal glass with lush moss terrarium.',
  },
  {
    id: 3,
    name: 'The Sanctuary',
    price: 98,
    badge: null,
    shape: 'jar',
    desc: 'Classic apothecary jar with cork lid. Forest style.',
  },
  {
    id: 4,
    name: 'Green Capsule',
    price: 136,
    badge: null,
    shape: 'dome',
    desc: 'Elegant glass dome with a zen botanical scene.',
  },
];

/* ===== CART STATE ===== */
let cart = [];

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
  updateCartUI();
  showToast(`${name} added to cart`);
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if (el) {
    el.textContent = count;
    el.style.transform = 'scale(1.4)';
    setTimeout(() => { el.style.transform = ''; }, 200);
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
        <a href="#shop" class="btn btn--dark btn--sm" onclick="closeCart()">Shop terrariums</a>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item__img">
        ${miniTerrariumSVG(item.name)}
      </div>
      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__price">$${(item.price * item.qty).toFixed(2)} ${item.qty > 1 ? `<span style="color:#aaa">× ${item.qty}</span>` : ''}</p>
        <button class="cart-item__remove" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>`).join('');

  if (footer) {
    footer.style.display = 'block';
    subtotalEl.textContent = `$${getCartTotal().toFixed(2)}`;
  }
}

function miniTerrariumSVG(name) {
  return `<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="16" r="12" stroke="#6E7F68" stroke-width="1.2" fill="rgba(110,127,104,0.1)"/>
    <ellipse cx="18" cy="24" rx="8" ry="4" fill="#3D4A3C" opacity="0.4"/>
    <line x1="16" y1="18" x2="16" y2="10" stroke="#5a7a52" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="18" y1="18" x2="18" y2="8" stroke="#6E7F68" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="20" y1="18" x2="20" y2="12" stroke="#4a6a44" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== WORKSHOP ADD ===== */
function addWorkshop(name, price) {
  addToCart(`ws-${name}`, name, price);
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

/* ===== RENDER PRODUCTS ===== */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="addToCart(${p.id}, '${p.name}', ${p.price})">
      <div class="product-card__img" style="background:${productBg(p.shape)}">
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        <div class="tc-wrap">
          ${renderTerrariumShape(p.shape)}
        </div>
        <button class="product-card__add" onclick="event.stopPropagation();addToCart(${p.id},'${p.name}',${p.price})">+</button>
      </div>
      <div class="product-card__body">
        <p class="product-card__name">${p.name}</p>
        <p class="product-card__price">$${p.price}.00</p>
      </div>
    </div>`).join('');
}

function productBg(shape) {
  const map = {
    sphere: 'linear-gradient(150deg,#dce8d8 0%,#c8d8c4 100%)',
    geo: 'linear-gradient(150deg,#d4d8cc 0%,#b8c4b4 100%)',
    jar: 'linear-gradient(150deg,#d8dcd4 0%,#c0c8bc 100%)',
    dome: 'linear-gradient(150deg,#d0d8cc 0%,#bcc8b8 100%)',
  };
  return map[shape] || '#e8ede4';
}

function renderTerrariumShape(shape) {
  const fills = `
    <div class="tc-fill">
      <div class="tc-stem tc-stem--tall"></div>
      <div class="tc-stem tc-stem--med" style="margin-left:-14px"></div>
      <div class="tc-moss-base"></div>
    </div>`;
  switch (shape) {
    case 'sphere':
      return `<div class="tc tc--sphere"><div class="tc-body">${fills}</div></div>`;
    case 'geo':
      return `<div class="tc tc--geo"><div class="tc-body">${fills}</div></div>`;
    case 'jar':
      return `<div class="tc tc--jar"><div class="tc-lid"></div>${fills}</div>`;
    case 'dome':
      return `<div class="tc tc--dome"><div class="tc-body">${fills}</div></div>`;
    default:
      return '';
  }
}

/* ===== BUILDER ===== */
const builderState = {
  step: 0,
  glass: 'Sphere',
  landscape: 'Forest Style',
  plants: 'Lush Green Plants',
  touches: [],
  basePrice: 149,
};

const TOUCH_PRICES = {
  'Driftwood': 12,
  'River Stones': 8,
  'Figurine': 15,
  'LED Base': 25,
};

function initBuilder() {
  const next = document.getElementById('builderNext');
  const prev = document.getElementById('builderPrev');
  const steps = document.querySelectorAll('.builder-step');

  if (next) next.addEventListener('click', () => builderNavigate(1));
  if (prev) prev.addEventListener('click', () => builderNavigate(-1));

  // Shape options
  document.querySelectorAll('[data-panel="0"] .builder-opt').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-panel="0"] .builder-opt').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      builderState.glass = el.dataset.value;
    });
  });

  // List options (single select for steps 1 & 2)
  [1, 2].forEach(p => {
    document.querySelectorAll(`[data-panel="${p}"] .builder-opt-list`).forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll(`[data-panel="${p}"] .builder-opt-list`).forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        if (p === 1) builderState.landscape = el.dataset.value;
        if (p === 2) builderState.plants = el.dataset.value;
      });
    });
  });

  // Finishing touches (multi-select)
  document.querySelectorAll('[data-panel="3"] .builder-opt-list').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('selected');
      const val = el.dataset.value;
      if (el.classList.contains('selected')) {
        if (!builderState.touches.includes(val)) builderState.touches.push(val);
      } else {
        builderState.touches = builderState.touches.filter(v => v !== val);
      }
    });
  });

  const addBtn = document.getElementById('addToCartBuilder');
  if (addBtn) addBtn.addEventListener('click', () => {
    const name = `Custom ${builderState.glass} Terrarium`;
    addToCart(`custom-${Date.now()}`, name, builderCalcPrice());
  });

  const startBtn = document.getElementById('startBuilder');
  if (startBtn) startBtn.addEventListener('click', () => {
    document.getElementById('builderWidget').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function builderNavigate(dir) {
  const newStep = builderState.step + dir;
  if (newStep < 0 || newStep > 4) return;
  builderState.step = newStep;

  document.querySelectorAll('.builder-step').forEach((el, i) => {
    el.classList.toggle('active', i === builderState.step);
  });
  document.querySelectorAll('.builder-panel').forEach((el, i) => {
    el.classList.toggle('active', i === builderState.step);
  });

  const next = document.getElementById('builderNext');
  const prev = document.getElementById('builderPrev');
  if (prev) prev.style.display = builderState.step === 0 ? 'none' : '';
  if (next) next.style.display = builderState.step === 4 ? 'none' : '';

  if (builderState.step === 4) updateBuilderSummary();
}

function builderCalcPrice() {
  let p = builderState.basePrice;
  builderState.touches.forEach(t => { p += TOUCH_PRICES[t] || 0; });
  return p;
}

function updateBuilderSummary() {
  const list = document.getElementById('summaryList');
  const price = document.getElementById('summaryPrice');
  if (!list || !price) return;

  const items = [
    builderState.glass,
    builderState.landscape,
    builderState.plants,
    ...builderState.touches,
  ];
  list.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  price.textContent = `$${builderCalcPrice()}.00`;
}

/* ===== NAV ===== */
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

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
      if (searchBar.classList.contains('open')) searchBar.querySelector('input').focus();
    });
  }

  document.getElementById('cartToggle')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
}

/* ===== NEWSLETTER ===== */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast(`Subscribed! Welcome to Terrafinity.`);
  input.value = '';
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  if (!window.IntersectionObserver) return;
  const els = document.querySelectorAll('.product-card, .feature, .workshop-card, .journal-card, .trust-item');
  els.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 60 * (Array.from(entry.target.parentElement?.children || []).indexOf(entry.target)));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initNav();
  initBuilder();
  initScrollAnimations();
});
