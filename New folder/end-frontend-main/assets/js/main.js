// Pustok — общие функции и логика страниц (home, shop, product, login)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => `$${n.toFixed(2)}`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);
const byId = id => BOOKS.find(b => b.id === +id);
const off = b => Math.round((1 - b.price / b.old) * 100);
const user = store.get('user', null);


const links = [['index.html', 'home', 'Главная'], ['shop.html', 'shop', 'Книги']];
$('#site-header').innerHTML = `
<header class="head"><div class="wrap bar">
  <a class="logo" href="index.html">Pustok.</a>
  <button class="burger" aria-label="Меню"><i class="fas fa-bars"></i></button>
  <nav class="menu">
    <div class="menu-item-dropdown">
      <a href="index.html" class="${page === 'home' ? 'act' : ''}">HOME <i class="fas fa-chevron-down"></i></a>
      <ul class="sub-menu">
        <li><a href="index.html">Home 01</a></li>
        <li><a href="index.html">Home 02</a></li>
      </ul>
    </div>

    <div class="menu-item-dropdown">
      <a href="shop.html" class="${page === 'shop' ? 'act' : ''}">SHOP <i class="fas fa-chevron-down"></i></a>
      <ul class="sub-menu">
        <li><a href="shop.html">Shop Grid</a></li>
        <li><a href="shop.html">Shop List</a></li>
        <li><a href="checkout.html">Checkout</a></li>
        <li><a href="wishlist.html">Wishlist</a></li>
      </ul>
    </div>

    <div class="menu-item-dropdown">
      <a href="#">PAGES <i class="fas fa-chevron-down"></i></a>
      <ul class="sub-menu">
        <li><a href="#" id="cartMenuItem">Cart</a></li>
        <li><a href="checkout.html">Checkout</a></li>
        <li><a href="#">Compare</a></li>
        <li><a href="wishlist.html">Wishlist</a></li>
        <li><a href="login.html">Login Register</a></li>
        <li><a href="login.html">My Account</a></li>
        <li><a href="#">Order Complete</a></li>
        <li><a href="#">Faq</a></li>
        <li><a href="#contacts">Contact 02</a></li>
      </ul>
    </div>

    <div class="menu-item-mega">
      <a href="index.html#blogs" class="mega-trigger">BLOG <i class="fas fa-chevron-down"></i></a>
      <div class="mega-menu">
        <div class="mega-column">
          <span class="column-title">Blog Grid</span>
          <ul class="sub-list">
            <li><a href="index.html#blogs" class="sub-link">Full Width (Default)</a></li>
            <li><a href="index.html#blogs" class="sub-link">Left Sidebar</a></li>
            <li><a href="index.html#blogs" class="sub-link">Right Sidebar</a></li>
          </ul>
        </div>
        <div class="mega-column">
          <span class="column-title">Blog List</span>
          <ul class="sub-list">
            <li><a href="index.html#blogs" class="sub-link">Left Sidebar</a></li>
            <li><a href="index.html#blogs" class="sub-link">Right Sidebar</a></li>
          </ul>
        </div>
        <div class="mega-column">
          <span class="column-title">Blog Details</span>
          <ul class="sub-list">
            <li><a href="index.html#blogs" class="sub-link">Image Format (Default)</a></li>
            <li><a href="blog-gallery.html" class="sub-link">Gallery Format</a></li>
            <li><a href="index.html#blogs" class="sub-link">Audio Format</a></li>
            <li><a href="index.html#blogs" class="sub-link">Video Format</a></li>
            <li><a href="index.html#blogs" class="sub-link">Left Sidebar</a></li>
          </ul>
        </div>
      </div>
    </div>

    <a href="#contacts">CONTACT</a>
  </nav>
</div></header>
<div class="wrap tools">
  <select class="cats" id="catSel"><option value="">Все категории</option>${CATS.map(c => `<option>${c}</option>`).join('')}</select>
  <form class="search" id="searchForm"><input name="q" placeholder="Поиск книг и авторов"><button>Найти</button></form>
  <div class="login">${user ? `<b>${esc(user.name)}</b><a href="#" id="logout">Выйти</a>` : '<b><a href="login.html">Войти</a></b><span>или <a href="login.html?tab=up">Регистрация</a></span>'}</div>
  <a class="wish-link" href="wishlist.html" title="Избранное" style="font-size:22px;color:var(--g);display:grid;place-items:center;"><i class="fas fa-heart"></i></a>
  <button class="theme-toggle" id="themeToggle" title="Переключить тему" aria-label="Тема"><i class="fas fa-moon"></i></button>
  <a class="cart" href="#" id="cartBtn"><i class="fas fa-shopping-cart"></i><span><small>Корзина</small><b id="cartSum">$0.00</b></span><em id="cartCnt">0</em></a>
</div>`;
$('#site-footer').innerHTML = `
<footer class="foot" id="contacts">
  <div class="wrap fgrid">
    <div><div class="logo">Pustok.</div><p>Книжный интернет-магазин с большим выбором на любой вкус.</p><p>Баку<br>+994 00 000 00 00<br>info@pustok.com</p></div>
    <div><h4>Магазин</h4><a href="index.html">Главная</a><a href="shop.html">Все книги</a><a href="login.html">Вход</a></div>
    <div><h4>Категории</h4>${CATS.slice(0, 3).map(c => `<a href="shop.html?cat=${encodeURIComponent(c)}">${c}</a>`).join('')}</div>
    <div><h4>Мы в соцсетях</h4><div class="soc"><a href="#"><i class="fab fa-instagram"></i></a><a href="#"><i class="fab fa-telegram-plane"></i></a><a href="#"><i class="fab fa-youtube"></i></a></div></div>
  </div>
  <div class="copy">© 2026 Pustok. Все права защищены.</div>
</footer>
<button id="top" aria-label="Наверх"><i class="fas fa-angle-double-up"></i></button>`;

$('#searchForm input').value = params.get('q') || '';
$('#searchForm').addEventListener('submit', e => { e.preventDefault(); location.href = `shop.html?q=${encodeURIComponent($('#searchForm input').value.trim())}`; });
$('#catSel').addEventListener('change', e => { location.href = `shop.html?cat=${encodeURIComponent(e.target.value)}`; });
const menu = $('.menu');
const burger = $('.burger');
burger?.addEventListener('click', e => {
  e.stopPropagation();
  menu.classList.toggle('open');
  burger.innerHTML = menu.classList.contains('open') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
document.addEventListener('click', e => {
  if (menu?.classList.contains('open') && !e.target.closest('.menu') && !e.target.closest('.burger')) {
    menu.classList.remove('open');
    if (burger) burger.innerHTML = '<i class="fas fa-bars"></i>';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    menu?.classList.remove('open');
    if (burger) burger.innerHTML = '<i class="fas fa-bars"></i>';
    closeCartDrawer();
    modalOverlay.classList.remove('open');
  }
});
$('#logout')?.addEventListener('click', e => { e.preventDefault(); localStorage.removeItem('user'); location.reload(); });
const topBtn = $('#top');
addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 300), { passive: true });
topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Переключение темы (Dark/Light) ----------
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
const themeBtn = $('#themeToggle');
const updateThemeIcon = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (themeBtn) themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};
updateThemeIcon();
themeBtn?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
  updateThemeIcon();
});

// ---------- Корзина и избранное ----------
const cart = () => store.get('cart', []);
function renderCart() {
  const c = cart();
  $('#cartCnt').textContent = c.reduce((s, i) => s + i.qty, 0);
  $('#cartSum').textContent = money(c.reduce((s, i) => {
    const item = byId(i.id);
    return s + (item ? i.qty * item.price : 0);
  }, 0));
}
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  const icon = type === 'fav' ? '<i class="fas fa-heart" style="color:var(--red);font-size:16px;"></i>' : 
               (type === 'err' ? '<i class="fas fa-exclamation-circle" style="color:var(--red);font-size:16px;"></i>' : 
               '<i class="fas fa-check-circle" style="color:var(--g);font-size:16px;"></i>');
  t.className = 'toast';
  t.innerHTML = `${icon} <span>${msg}</span>`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2200);
}
function addToCart(id, qty = 1) {
  const c = cart(), it = c.find(i => i.id === id);
  it ? it.qty += qty : c.push({ id, qty });
  store.set('cart', c); renderCart(); toast('Добавлено в корзину');
}
const favs = () => new Set(store.get('fav', []));
function toggleFav(id) { const f = favs(); f.has(id) ? f.delete(id) : f.add(id); store.set('fav', [...f]); return f.has(id); }
renderCart();

// ---------- Выдвижная корзина (Cart Drawer) ----------
const cartDrawerOverlay = document.createElement('div');
cartDrawerOverlay.className = 'cart-drawer-overlay';
cartDrawerOverlay.id = 'cartDrawerOverlay';

const cartDrawer = document.createElement('aside');
cartDrawer.className = 'cart-drawer';
cartDrawer.id = 'cartDrawer';
cartDrawer.innerHTML = `
  <div class="cart-drawer-header">
    <h3><i class="fas fa-shopping-bag"></i> Ваша корзина (<span id="cd-count">0</span>)</h3>
    <button class="cart-drawer-close" id="closeCartDrawer">&times;</button>
  </div>
  <div class="cart-drawer-items" id="cartDrawerItems"></div>
  <div class="cart-drawer-footer">
    <div class="cd-subtotal">
      <span>Итого:</span>
      <b id="cd-total">$0.00</b>
    </div>
    <a href="checkout.html" class="cd-btn" id="cd-checkout-btn">Оформить заказ</a>
  </div>
`;
document.body.appendChild(cartDrawerOverlay);
document.body.appendChild(cartDrawer);

function updateCartDrawer() {
  const c = cart();
  const list = $('#cartDrawerItems');
  const countSpan = $('#cd-count');
  const totalB = $('#cd-total');
  if (!list) return;

  const totalQty = c.reduce((s, i) => s + i.qty, 0);
  const totalSum = c.reduce((s, i) => { const item = byId(i.id); return s + (item ? i.qty * item.price : 0); }, 0);

  if (countSpan) countSpan.textContent = totalQty;
  if (totalB) totalB.textContent = money(totalSum);

  if (!c.length) {
    list.innerHTML = `<div class="cart-drawer-empty"><i class="fas fa-shopping-basket"></i><p>Корзина пуста</p></div>`;
    return;
  }

  list.innerHTML = c.map(item => {
    const b = byId(item.id);
    if (!b) return '';
    const imgSrc = b.img.startsWith('http') ? `${b.img}?w=120&h=160&fit=crop` : b.img;
    return `
      <div class="cd-item" data-id="${b.id}">
        <img src="${imgSrc}" alt="${b.name}">
        <div>
          <div class="cd-title">${b.name}</div>
          <div class="cd-price">${money(b.price)}</div>
          <div class="cd-qty-row">
            <button class="cd-minus">−</button>
            <span>${item.qty}</span>
            <button class="cd-plus">+</button>
          </div>
        </div>
        <button class="cd-del" title="Удалить"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
  }).join('');
}

function openCartDrawer() {
  updateCartDrawer();
  cartDrawerOverlay.classList.add('open');
  cartDrawer.classList.add('open');
}

function closeCartDrawer() {
  cartDrawerOverlay.classList.remove('open');
  cartDrawer.classList.remove('open');
}

$('#cartBtn')?.addEventListener('click', e => {
  e.preventDefault();
  openCartDrawer();
});

$('#closeCartDrawer')?.addEventListener('click', closeCartDrawer);
cartDrawerOverlay.addEventListener('click', closeCartDrawer);

cartDrawer.addEventListener('click', e => {
  const itemEl = e.target.closest('.cd-item');
  if (!itemEl) return;
  const id = +itemEl.dataset.id;
  const c = cart();
  const item = c.find(i => i.id === id);
  if (!item) return;

  if (e.target.closest('.cd-plus')) {
    item.qty++;
    store.set('cart', c);
    renderCart();
    updateCartDrawer();
  } else if (e.target.closest('.cd-minus')) {
    item.qty--;
    const updated = item.qty > 0 ? c : c.filter(i => i.id !== id);
    store.set('cart', updated);
    renderCart();
    updateCartDrawer();
  } else if (e.target.closest('.cd-del')) {
    const updated = c.filter(i => i.id !== id);
    store.set('cart', updated);
    renderCart();
    updateCartDrawer();
    toast('Товар удален из корзины');
  }
});

// ---------- Быстрый просмотр (Quick View Modal) ----------
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.id = 'quickOverlay';
modalOverlay.innerHTML = `
  <div class="quick-modal">
    <button class="modal-close" id="closeQuickModal" aria-label="Закрыть">&times;</button>
    <div class="quick-body" id="quickModalBody"></div>
  </div>
`;
document.body.appendChild(modalOverlay);

function openQuickView(id) {
  const b = byId(id);
  if (!b) return;
  const imgSrc = b.img.startsWith('http') ? `${b.img}?w=500&h=700&fit=crop` : b.img;
  $('#quickModalBody').innerHTML = `
    <div class="quick-img"><img src="${imgSrc}" alt="${b.name}"></div>
    <div class="quick-info">
      <h2>${b.name}</h2>
      <span class="au">${b.author} · ${b.cat}</span>
      <div class="stars">${'★'.repeat(b.rating)}${'☆'.repeat(5 - b.rating)} <small>(${b.reviews} отзывов)</small></div>
      <div class="price"><b>${money(b.price)}</b><s>${money(b.old)}</s><em>-${off(b)}%</em></div>
      <p class="desc">${b.desc}</p>
      <div class="buy">
        <div class="qty"><button id="qmodal-m">−</button><input id="qmodal-v" value="1" readonly><button id="qmodal-p">+</button></div>
        <button class="btn-o solid" id="qmodal-add"><i class="fas fa-shopping-basket"></i> В корзину</button>
        <a href="product.html?id=${b.id}" class="btn-o">Подробнее</a>
      </div>
    </div>
  `;
  const qv = $('#qmodal-v');
  $('#qmodal-m').onclick = () => { qv.value = Math.max(1, +qv.value - 1); };
  $('#qmodal-p').onclick = () => { qv.value = Math.min(20, +qv.value + 1); };
  $('#qmodal-add').onclick = () => { addToCart(b.id, +qv.value); modalOverlay.classList.remove('open'); };
  modalOverlay.classList.add('open');
}

$('#closeQuickModal')?.addEventListener('click', () => modalOverlay.classList.remove('open'));
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) modalOverlay.classList.remove('open'); });

// ---------- Карточки книг ----------
const DC = '<div class="dc"><span><b>00</b>Дней</span><span><b>00</b>Часов</span><span><b>00</b>Мин</span><span><b>00</b>Сек</span></div>';

// 1. Стандартная карточка (Сетка)
const card = (b, deal = false) => {
  const link = `product.html?id=${b.id}`;
  const head = deal ? `<span class="au">${b.author}</span><a class="nm" href="${link}">${b.name}</a>` : '';
  const foot = deal ? '' : `<div class="au">${b.author}</div><a class="nm" href="${link}">${b.name}</a>`;
  const imgSrc = b.img.startsWith('http') ? `${b.img}?w=300&h=400&fit=crop` : b.img;
  return `<article class="card" data-id="${b.id}">${head}
    <div class="pic"><a href="${link}"><img src="${imgSrc}" alt="${b.name}" loading="lazy"></a>
      <div class="acts"><button data-a="cart" title="В корзину"><i class="fas fa-shopping-basket"></i></button><button data-a="fav" title="В избранное" class="${favs().has(b.id) ? 'on' : ''}"><i class="fas fa-heart"></i></button><button data-a="quick" title="Быстрый просмотр"><i class="fas fa-eye"></i></button></div></div>
    <div class="price"><b>${money(b.price)}</b><s>${money(b.old)}</s><em>-${off(b)}%</em></div>${foot}${deal ? DC : ''}</article>`;
};

// 2. Компактная карточка (Список / Best Sellers / Children's)
const listCard = b => {
  const link = `product.html?id=${b.id}`;
  const imgSrc = b.img.startsWith('http') ? `${b.img}?w=200&h=260&fit=crop` : b.img;
  return `<div class="lcard" data-id="${b.id}">
    <a href="${link}" class="lcard-img"><img src="${imgSrc}" alt="${b.name}" loading="lazy"></a>
    <div class="lcard-body">
      <span class="au">${b.author}</span>
      <a href="${link}" class="nm">${b.name}</a>
      <div class="price"><b>${money(b.price)}</b><s>${money(b.old)}</s><em>-${off(b)}%</em></div>
    </div>
  </div>`;
};

document.addEventListener('click', e => {
  const btn = e.target.closest('.acts button[data-a]');
  if (!btn) return;
  const id = +btn.closest('.card').dataset.id;
  if (btn.dataset.a === 'quick') { openQuickView(id); return; }
  btn.dataset.a === 'cart' ? addToCart(id) : btn.classList.toggle('on', toggleFav(id));
});

// ---------- Главная страница ----------
if (page === 'home') {
  // Новые книги
  $('#grid').innerHTML = BOOKS.slice(0, 10).map(b => card(b)).join('');
  
  // Скидка дня
  $('#drow').innerHTML = BOOKS.slice(0, 6).map(b => card(b, true)).join('');

  // 1. BEST SELLER BOOKS (Джон Паркер + 2 страницы по 4 книги)
  const bestsellers = BOOKS.filter(b => b.cat === 'Бестселлеры');
  const renderBestsellers = (slide = 0) => {
    const slice = bestsellers.slice(slide * 4, slide * 4 + 4);
    const container = $('#bestseller-grid');
    if (container) {
      container.innerHTML = slice.map(b => listCard(b)).join('');
    }
    $$('#bestseller-dots .dot').forEach((d, i) => d.classList.toggle('on', i === slide));
  };
  renderBestsellers(0);
  $('#bestseller-dots')?.addEventListener('click', e => {
    const dot = e.target.closest('.dot');
    if (dot) renderBestsellers(+dot.dataset.slide);
  });

  // 2. CHILDREN'S BOOKS (6 книг)
  const childrenBooks = BOOKS.filter(b => b.cat === 'Детские книги');
  const childGrid = $('#children-grid');
  if (childGrid) {
    childGrid.innerHTML = childrenBooks.slice(0, 6).map(b => listCard(b)).join('');
  }

  // 3. ARTS & PHOTOGRAPHY BOOKS (5 книг)
  const artBooks = BOOKS.filter(b => b.cat === 'Искусство и фото');
  const artGrid = $('#art-grid');
  if (artGrid) {
    artGrid.innerHTML = artBooks.slice(0, 5).map(b => card(b)).join('');
  }

  // 4. LATEST BLOGS
  const blogsGrid = $('#blogs');
  if (blogsGrid) {
    blogsGrid.innerHTML = POSTS.map(p => `
      <article class="post">
        <div class="im">
          <a href="blog-gallery.html"><img src="${p.img}" alt="${p.title}" loading="lazy"></a>
        </div>
        <div class="post-content">
          <div class="post-header">
            <div class="date-badge">
              <span class="day">${p.day}</span>
              <span class="month">${p.month}</span>
            </div>
            <h3><a href="blog-gallery.html">${p.title}</a></h3>
          </div>
          <p class="post-meta"><i class="fas fa-user-edit"></i> Post by ${p.author}</p>
          <p class="post-desc">${p.desc}</p>
          <a href="blog-gallery.html" class="post-link">Read More <i class="fas fa-chevron-circle-right"></i></a>
        </div>
      </article>
    `).join('');
  }

  // 5. Бренды
  const brandsRow = $('#brands-row');
  if (brandsRow && typeof BRANDS !== 'undefined') {
    brandsRow.innerHTML = BRANDS.map(img => `
      <div class="brand-item">
        <img src="${img}" alt="Brand">
      </div>
    `).join('');
  }

  // Таймер скидок
  const end = new Date(); end.setDate(end.getDate() + 3); end.setHours(23, 59, 59, 0);
  const tick = () => {
    const d = Math.max(0, end - new Date());
    const v = [d / 864e5, (d % 864e5) / 36e5, (d % 36e5) / 6e4, (d % 6e4) / 1e3].map(n => String(Math.floor(n)).padStart(2, '0'));
    $$('.dc').forEach(dc => $$('b', dc).forEach((b, i) => { b.textContent = v[i]; }));
  };
  tick(); setInterval(tick, 1000);
}

// ---------- Каталог (галерея) ----------
if (page === 'shop') {
  let cat = params.get('cat') || '', sort = 'def', maxPrice = 100;
  const q = (params.get('q') || '').toLowerCase();
  
  const updateChips = () => {
    $('#chips').innerHTML = ['', ...CATS].map(c => {
      const count = c ? BOOKS.filter(b => b.cat === c).length : BOOKS.length;
      return `<button data-c="${c}">${c || 'Все'} <small>(${count})</small></button>`;
    }).join('');
  };
  updateChips();

  const draw = () => {
    const list = BOOKS.filter(b => 
      (!cat || b.cat === cat) && 
      (!q || (b.name + ' ' + b.author).toLowerCase().includes(q)) &&
      (b.price <= maxPrice)
    );
    if (sort === 'asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    $('#count').textContent = `Найдено: ${list.length}`;
    $('#catalog').innerHTML = list.length ? list.map(b => card(b)).join('') : '<p class="empty">Ничего не найдено. Попробуйте изменить фильтры.</p>';
    $$('#chips button').forEach(x => x.classList.toggle('on', x.dataset.c === cat));
  };

  const pRange = $('#pRange');
  const pVal = $('#pVal');
  if (pRange) {
    pRange.addEventListener('input', e => {
      maxPrice = +e.target.value;
      if (pVal) pVal.textContent = `$${maxPrice}`;
      draw();
    });
  }

  const setView = list => {
    $('#catalog').classList.toggle('list', list);
    $('#vList').classList.toggle('on', list);
    $('#vGrid').classList.toggle('on', !list);
  };
  $('#chips').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { cat = b.dataset.c; draw(); } });
  $('#sort').addEventListener('change', e => { sort = e.target.value; draw(); });
  $('#vGrid').addEventListener('click', () => setView(false));
  $('#vList').addEventListener('click', () => setView(true));
  draw();
}

// ---------- Страница книги ----------
if (page === 'product') {
  const b = byId(params.get('id')) || BOOKS[0];
  document.title = `${b.name} — Pustok`;
  $('#crumb').textContent = b.name;
  const imgSrc = b.img.startsWith('http') ? `${b.img}?w=600&h=800&fit=crop` : b.img;
  $('#detail').innerHTML = `
    <div class="dimg"><img src="${imgSrc}" alt="${b.name}"></div>
    <div class="dinfo"><h1>${b.name}</h1><p class="au">${b.author} · ${b.cat}</p>
      <div class="stars">${'★'.repeat(b.rating)}${'☆'.repeat(5 - b.rating)} <small>(${b.reviews} отзывов)</small></div>
      <div class="price big"><b>${money(b.price)}</b><s>${money(b.old)}</s><em>-${off(b)}%</em></div>
      <p class="desc">${b.desc}</p>
      <ul class="meta"><li>Категория: ${b.cat}</li><li>Наличие: в наличии</li><li>Доставка: бесплатно от $50</li></ul>
      <div class="buy"><div class="qty"><button id="qm">−</button><input id="qv" value="1" readonly><button id="qp">+</button></div>
        <button class="btn-o solid" id="addBtn">В корзину</button>
        <button class="fav ${favs().has(b.id) ? 'on' : ''}" id="favBtn" title="В избранное"><i class="fas fa-heart"></i></button></div></div>`;
  const qv = $('#qv');
  $('#qm').addEventListener('click', () => { qv.value = Math.max(1, +qv.value - 1); });
  $('#qp').addEventListener('click', () => { qv.value = Math.min(20, +qv.value + 1); });
  $('#addBtn').addEventListener('click', () => addToCart(b.id, +qv.value));
  $('#favBtn').addEventListener('click', e => e.currentTarget.classList.toggle('on', toggleFav(b.id)));
  const same = BOOKS.filter(x => x.cat === b.cat && x.id !== b.id), rest = BOOKS.filter(x => x.cat !== b.cat);
  $('#related').innerHTML = [...same, ...rest].slice(0, 4).map(x => card(x)).join('');
}

// ---------- Вход и регистрация ----------
if (page === 'login') {
  const forms = { in: $('#fin'), up: $('#fup') }, msg = $('#msg'), tabs = $$('.tabs button');
  const say = (text, ok) => { msg.className = ok ? 'msg ok' : 'msg err'; msg.textContent = text; };
  const show = t => {
    tabs.forEach(x => x.classList.toggle('on', x.dataset.t === t));
    forms.in.classList.toggle('hide', t !== 'in'); forms.up.classList.toggle('hide', t !== 'up'); say('', true);
  };
  const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  tabs.forEach(x => x.addEventListener('click', () => show(x.dataset.t)));
  show(params.get('tab') === 'up' ? 'up' : 'in');
  const done = (u, text) => { store.set('user', { name: u.name, email: u.email }); say(text, true); setTimeout(() => { location.href = 'index.html'; }, 900); };

  forms.up.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(forms.up), name = f.get('name').trim(), email = f.get('email').trim().toLowerCase(), pass = f.get('pass');
    if (name.length < 2) return say('Введите имя (минимум 2 символа).');
    if (!emailOk(email)) return say('Введите корректный email.');
    if (pass.length < 6) return say('Пароль: минимум 6 символов.');
    if (pass !== f.get('pass2')) return say('Пароли не совпадают.');
    const users = store.get('users', []);
    if (users.some(u => u.email === email)) return say('Этот email уже зарегистрирован.');
    users.push({ name, email, pass }); store.set('users', users);
    done({ name, email }, 'Регистрация прошла успешно!');
  });
  forms.in.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(forms.in), email = f.get('email').trim().toLowerCase();
    if (!emailOk(email)) return say('Введите корректный email.');
    const u = store.get('users', []).find(x => x.email === email && x.pass === f.get('pass'));
    u ? done(u, `Добро пожаловать, ${u.name}!`) : say('Неверный email или пароль.');
  });
}

// ---------- Оформление заказа (Checkout) ----------
if (page === 'checkout') {
  const c = cart();
  const listEl = $('#orderItems');
  const subtotalEl = $('#otSubtotal');
  const totalEl = $('#otTotal');
  const layout = $('#checkoutLayout');
  const successBox = $('#orderSuccess');
  const form = $('#orderForm');

  if (!c.length) {
    if (listEl) listEl.innerHTML = '<p class="empty">Ваша корзина пуста. <a href="shop.html" style="color:var(--g)">Перейти к покупкам</a></p>';
    const btn = $('#submitOrderBtn');
    if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }
  } else {
    const totalSum = c.reduce((s, i) => { const item = byId(i.id); return s + (item ? i.qty * item.price : 0); }, 0);
    if (subtotalEl) subtotalEl.textContent = money(totalSum);
    if (totalEl) totalEl.textContent = money(totalSum);

    if (listEl) {
      listEl.innerHTML = c.map(item => {
        const b = byId(item.id);
        if (!b) return '';
        const imgSrc = b.img.startsWith('http') ? `${b.img}?w=80&h=100&fit=crop` : b.img;
        return `
          <div class="ot-row">
            <div style="display:flex;gap:12px;align-items:center;">
              <img src="${imgSrc}" style="width:40px;height:55px;object-fit:cover;border-radius:2px;">
              <div>
                <b style="font-size:14px;display:block;">${b.name}</b>
                <small style="color:#888;">${item.qty} × ${money(b.price)}</small>
              </div>
            </div>
            <b>${money(item.qty * b.price)}</b>
          </div>
        `;
      }).join('');
    }
  }

  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!c.length) return toast('В корзине нет товаров');
    const orderNum = '#PUSTOK-' + Math.floor(100000 + Math.random() * 900000);
    store.set('cart', []);
    renderCart();
    if ($('#orderNum')) $('#orderNum').textContent = orderNum;
    layout.classList.add('hide');
    successBox.classList.remove('hide');
    scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------- Страница избранного (Wishlist) ----------
if (page === 'wishlist') {
  const grid = $('#wishlistGrid');
  const drawWishlist = () => {
    const list = [...favs()].map(id => byId(id)).filter(Boolean);
    if (!list.length) {
      grid.innerHTML = '<div class="empty" style="grid-column:1/-1;text-align:center;padding:70px 0;"><i class="fas fa-heart-broken" style="font-size:50px;color:#ddd;margin-bottom:15px;display:block;"></i><h3>Список избранного пуст</h3><p style="color:#777;margin:10px 0 20px;">Вы еще не добавили ни одной книги в закладки.</p><a href="shop.html" class="btn-o solid">Перейти в каталог</a></div>';
      return;
    }
    grid.innerHTML = list.map(b => {
      const link = `product.html?id=${b.id}`;
      const imgSrc = b.img.startsWith('http') ? `${b.img}?w=260&h=360&fit=crop` : b.img;
      return `
        <article class="wish-item" data-id="${b.id}">
          <div class="wish-img">
            <a href="${link}"><img src="${imgSrc}" alt="${b.name}"></a>
          </div>
          <div class="wish-body">
            <div>
              <span class="au">${b.author} · ${b.cat}</span>
              <h3><a href="${link}">${b.name}</a></h3>
              <div class="price"><b>${money(b.price)}</b><s>${money(b.old)}</s><em>-${off(b)}%</em></div>
            </div>
            <div class="wish-actions">
              <button class="btn-o solid wish-cart-btn"><i class="fas fa-shopping-basket"></i> В корзину</button>
              <button class="wish-del-btn" title="Удалить из избранного"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  };

  drawWishlist();

  grid?.addEventListener('click', e => {
    const item = e.target.closest('.wish-item');
    if (!item) return;
    const id = +item.dataset.id;
    if (e.target.closest('.wish-cart-btn')) {
      addToCart(id);
    } else if (e.target.closest('.wish-del-btn')) {
      toggleFav(id);
      drawWishlist();
      toast('Удалено из избранного');
    }
  });
}

// ---------- Управление слайдером первого экрана ----------
if (page === 'home') {
  const slides = $$('.hero-slide');
  const dots = $$('.hero-dot');
  let currentSlide = 0;
  let sliderTimer = null;

  const showSlide = idx => {
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    currentSlide = idx;
  };

  const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => showSlide((currentSlide - 1 + slides.length) % slides.length);

  $('#heroNext')?.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
  $('#heroPrev')?.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
  dots.forEach((dot, idx) => dot.addEventListener('click', () => { showSlide(idx); resetAutoplay(); }));

  const startAutoplay = () => { sliderTimer = setInterval(nextSlide, 5000); };
  const stopAutoplay = () => { clearInterval(sliderTimer); };
  const resetAutoplay = () => { stopAutoplay(); startAutoplay(); };

  $('#heroSliderWrap')?.addEventListener('mouseenter', stopAutoplay);
  $('#heroSliderWrap')?.addEventListener('mouseleave', startAutoplay);
  if (slides.length > 1) startAutoplay();
}
