'use strict';
// main.js — homepage-specific logic (requires components.js)

const products = [
  { id: 'mountainscape', name: 'Mountainscape', price: 2800, badge: null,         shape: 'sphere', img: 'images/mountainscape.jpg' },
  { id: 'bonsai',        name: 'Bonsai',        price: 3500, badge: 'Bestseller', shape: 'sphere', img: 'images/bonsai.jpg'        },
  { id: 'sulu',          name: 'Sulu',          price: 3200, badge: null,         shape: 'geo',    img: 'images/sulu.jpg'          },
  { id: 'sibuyan',       name: 'Sibuyan',       price: 2600, badge: null,         shape: 'jar',    img: 'images/sibuyan.jpg'       },
  { id: 'eternal',       name: 'Eternal',       price: 2400, badge: null,         shape: 'dome',   img: 'images/eternal.jpg'       },
  { id: 'miniscape',     name: 'Miniscape',     price: 4200, badge: 'Set of 4',   shape: 'jar',    img: 'images/miniscape.jpg'     },
  { id: 'mini-bloom',    name: 'Mini Bloom',    price: 1800, badge: null,         shape: 'dome',   img: 'images/mini-bloom.jpg'    },
  { id: 'talon',         name: 'Talon',         price: 3800, badge: null,         shape: 'geo',    img: 'images/talon.jpg'         },
  { id: 'el-nido',       name: 'El Nido',       price: 3600, badge: null,         shape: 'sphere', img: 'images/el-nido.jpg'       },
];

function productBg(shape) {
  return { sphere: 'linear-gradient(150deg,#dce8d8,#c8d8c4)', geo: 'linear-gradient(150deg,#d4d8cc,#b8c4b4)', jar: 'linear-gradient(150deg,#d8dcd4,#c0c8bc)', dome: 'linear-gradient(150deg,#d0d8cc,#bcc8b8)' }[shape] || '#e8ede4';
}

function renderTerrariumShape(shape) {
  const fill = `<div class="tc-fill"><div class="tc-stem tc-stem--tall"></div><div class="tc-stem tc-stem--med" style="margin-left:-14px"></div><div class="tc-moss-base"></div></div>`;
  switch (shape) {
    case 'sphere': return `<div class="tc tc--sphere"><div class="tc-body">${fill}</div></div>`;
    case 'geo':    return `<div class="tc tc--geo"><div class="tc-body">${fill}</div></div>`;
    case 'jar':    return `<div class="tc tc--jar"><div class="tc-lid"></div>${fill}</div>`;
    case 'dome':   return `<div class="tc tc--dome"><div class="tc-body">${fill}</div></div>`;
    default:       return '';
  }
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="addToCart('${p.id}','${p.name}',${p.price})">
      <div class="product-card__img" style="background:${productBg(p.shape)}">
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
        <img src="${p.img}" alt="${p.name}" class="product-card__photo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="tc-wrap" style="display:none">${renderTerrariumShape(p.shape)}</div>
        <button class="product-card__add" onclick="event.stopPropagation();addToCart('${p.id}','${p.name}',${p.price})">+</button>
      </div>
      <div class="product-card__body">
        <p class="product-card__name">${p.name}</p>
        <p class="product-card__price">₱${p.price.toLocaleString()}</p>
      </div>
    </div>`).join('');
}

/* ===== MINI BUILDER (homepage widget) ===== */
const builderState = { step: 0, glass: 'Sphere', landscape: 'Forest Style', plants: 'Lush Green Plants', touches: [], basePrice: 149 };
const TOUCH_PRICES = { 'Driftwood': 12, 'River Stones': 8, 'Figurine': 15, 'LED Base': 25 };

function initBuilder() {
  const next = document.getElementById('builderNext');
  const prev = document.getElementById('builderPrev');
  if (next) next.addEventListener('click', () => builderNavigate(1));
  if (prev) prev.addEventListener('click', () => builderNavigate(-1));

  document.querySelectorAll('[data-panel="0"] .builder-opt').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-panel="0"] .builder-opt').forEach(o => o.classList.remove('selected'));
      el.classList.add('selected');
      builderState.glass = el.dataset.value;
    });
  });

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

  document.querySelectorAll('[data-panel="3"] .builder-opt-list').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('selected');
      const val = el.dataset.value;
      if (el.classList.contains('selected')) { if (!builderState.touches.includes(val)) builderState.touches.push(val); }
      else { builderState.touches = builderState.touches.filter(v => v !== val); }
    });
  });

  const addBtn = document.getElementById('addToCartBuilder');
  if (addBtn) addBtn.addEventListener('click', () => {
    const name = `Custom ${builderState.glass} Terrarium`;
    addToCart('custom-' + Date.now(), name, builderCalcPrice());
  });
}

function builderNavigate(dir) {
  const newStep = builderState.step + dir;
  if (newStep < 0 || newStep > 4) return;
  builderState.step = newStep;
  document.querySelectorAll('.builder-step').forEach((el, i) => el.classList.toggle('active', i === builderState.step));
  document.querySelectorAll('.builder-panel').forEach((el, i) => el.classList.toggle('active', i === builderState.step));
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
  const items = [builderState.glass, builderState.landscape, builderState.plants, ...builderState.touches];
  list.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  price.textContent = `$${builderCalcPrice()}.00`;
}

/* ===== CAROUSEL ===== */
function initCarousel() {
  const track = document.getElementById('productsGrid');
  const prev  = document.getElementById('carouselPrev');
  const next  = document.getElementById('carouselNext');
  if (!track) return;

  const scrollBy = () => track.querySelector('.product-card')?.offsetWidth + 20 || 320;

  if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -scrollBy(), behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => track.scrollBy({ left:  scrollBy(), behavior: 'smooth' }));

  // Update button visibility
  function syncBtns() {
    if (!prev || !next) return;
    prev.disabled = track.scrollLeft < 8;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  }
  track.addEventListener('scroll', syncBtns, { passive: true });
  syncBtns();

  // Drag-to-scroll
  let isDragging = false, startX = 0, startScroll = 0;
  track.addEventListener('mousedown', e => {
    isDragging = true; startX = e.pageX; startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    track.scrollLeft = startScroll - (e.pageX - startX);
  });
  window.addEventListener('mouseup', () => { isDragging = false; track.classList.remove('is-dragging'); });

  // Roll-in: staggered reveal as cards scroll into view
  if (window.IntersectionObserver) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const cards = Array.from(track.children);
          const idx = cards.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('card--visible'), idx * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, root: track });
    track.querySelectorAll('.product-card').forEach(c => obs.observe(c));
  } else {
    track.querySelectorAll('.product-card').forEach(c => c.classList.add('card--visible'));
  }
}

/* ===== SCROLL ANIMATIONS (non-product elements) ===== */
function initScrollAnimations() {
  if (!window.IntersectionObserver) return;
  const els = document.querySelectorAll('.feature, .workshop-card, .journal-card, .trust-item');
  els.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }, 60 * idx);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initPage('home');
  renderProducts();
  initBuilder();
  initCarousel();
  initScrollAnimations();
});
