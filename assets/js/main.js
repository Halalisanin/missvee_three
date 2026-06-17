(function () {
  /* ----------------------------------------------------------------
      1. CART — localStorage CRUD
  ---------------------------------------------------------------- */
  const STORAGE_KEY = 'missvee3_cart';
  let cart = [];

  function loadCart () {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      cart = data ? JSON.parse(data) : [];
    } catch (_) { cart = []; }
  }

  function saveCart () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function getCart () { return [ ...cart ]; }

  function addToCart (id, name, size, price, quantity) {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const existing = cart.find(function (i) { return i.id === id && i.size === size; });
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ id: id, name: name, size: size, price: price, quantity: qty });
    }
    saveCart();
    updateUI();
    showNotification(name + ' added to your cart.');
  }

  function updateQuantity (id, size, delta) {
    const item = cart.find(function (i) { return i.id === id && i.size === size; });
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) removeItem(id, size);
    else { saveCart(); updateUI(); }
  }

  function removeItem (id, size) {
    cart = cart.filter(function (i) { return !(i.id === id && i.size === size); });
    saveCart();
    updateUI();
  }

  function clearCart () {
    cart = [];
    saveCart();
    updateUI();
  }

  function getTotalItems () {
    return cart.reduce(function (sum, i) { return sum + i.quantity; }, 0);
  }

  /* ----------------------------------------------------------------
      2. PRICE HELPERS
  ---------------------------------------------------------------- */
  function parsePrice (str) {
    var cleaned = (str || '').replace(/[^0-9.,]/g, '').replace(/,/g, '');
    return parseFloat(cleaned) || 0;
  }

  function formatPrice (num) {
    return 'R' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /* ----------------------------------------------------------------
      3. UI UPDATES — cart count badge + cart page
  ---------------------------------------------------------------- */
  function updateUI () {
    var count = getTotalItems();
    var badges = document.querySelectorAll('.cart-count');
    for (var b = 0; b < badges.length; b++) { badges[b].textContent = count; }

    var emptyEl = document.getElementById('cartEmpty');
    var layoutEl = document.getElementById('cartLayout');
    if (!emptyEl || !layoutEl) return;

    var items = getCart();
    if (items.length === 0) {
      emptyEl.style.display = 'block';
      layoutEl.style.display = 'none';
      return;
    }
    emptyEl.style.display = 'none';
    layoutEl.style.display = 'grid';

    var container = document.getElementById('cartItems');
    if (!container) return;
    var html = '';
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      html += '<div class="cart-item">'
        + '<div class="cart-item__info">'
        + '<h4>' + escapeHtml(item.name) + '</h4>'
        + '<p class="cart-item__meta">Size: ' + escapeHtml(item.size) + '</p>'
        + '</div>'
        + '<div class="cart-item__qty">'
        + '<button class="qty-btn" data-action="dec" data-id="' + escapeHtml(item.id) + '" data-size="' + escapeHtml(item.size) + '">−</button>'
        + '<span>' + item.quantity + '</span>'
        + '<button class="qty-btn" data-action="inc" data-id="' + escapeHtml(item.id) + '" data-size="' + escapeHtml(item.size) + '">+</button>'
        + '</div>'
        + '<div class="cart-item__price">' + formatPrice(parsePrice(item.price) * item.quantity) + '</div>'
        + '<button class="cart-item__remove" data-action="remove" data-id="' + escapeHtml(item.id) + '" data-size="' + escapeHtml(item.size) + '" aria-label="Remove item">✕</button>'
        + '</div>';
    }
    container.innerHTML = html;

    var subtotal = items.reduce(function (sum, item) {
      return sum + parsePrice(item.price) * item.quantity;
    }, 0);
    var shipping = subtotal >= 500 ? 0 : 65;
    var total = subtotal + shipping;

    var subEl = document.getElementById('summarySubtotal');
    var shipEl = document.getElementById('summaryShipping');
    var totalEl = document.getElementById('summaryTotal');
    if (subEl) subEl.textContent = formatPrice(subtotal);
    if (shipEl) shipEl.textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(total);

    attachCartEventListeners(container);
  }

  function attachCartEventListeners (container) {
    var btns = container.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        var btn = e.currentTarget;
        var action = btn.getAttribute('data-action');
        var id = btn.getAttribute('data-id');
        var size = btn.getAttribute('data-size');
        if (action === 'inc') updateQuantity(id, size, 1);
        else if (action === 'dec') updateQuantity(id, size, -1);
        else if (action === 'remove') removeItem(id, size);
      });
    }
  }

  /* ----------------------------------------------------------------
      4. NOTIFICATION TOAST
  ---------------------------------------------------------------- */
  var notifTimer = null;

  function showNotification (msg) {
    var existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();
    if (notifTimer) clearTimeout(notifTimer);

    var el = document.createElement('div');
    el.className = 'cart-notification';
    el.textContent = msg;
    document.body.appendChild(el);

    requestAnimationFrame(function () {
      el.classList.add('visible');
    });

    notifTimer = setTimeout(function () {
      el.classList.remove('visible');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    }, 3000);
  }

  /* ----------------------------------------------------------------
      5. ESCAPE HTML
  ---------------------------------------------------------------- */
  function escapeHtml (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ----------------------------------------------------------------
      6. NAV TOGGLE
  ---------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('navToggle');
    var navList = document.getElementById('navList');
    if (toggle && navList) {
      toggle.addEventListener('click', function () {
        navList.classList.toggle('open');
        toggle.classList.toggle('open');
      });
    }

    /* ----------------------------------------------------------------
        7. ADD TO CART BUTTONS (data-* attributes)
    ---------------------------------------------------------------- */
    var addBtns = document.querySelectorAll('.js-add-to-cart');
    for (var i = 0; i < addBtns.length; i++) {
      addBtns[i].addEventListener('click', function (e) {
        var btn = e.currentTarget;
        var id = btn.getAttribute('data-product-id');
        var name = btn.getAttribute('data-product-name');
        var size = btn.getAttribute('data-product-size');
        var price = btn.getAttribute('data-product-price');
        addToCart(id, name, size, price, 1);
      });
    }

    /* ----------------------------------------------------------------
        8. SHOP FILTERS
    ---------------------------------------------------------------- */
    var filterBtns = document.querySelectorAll('.filter-btn');
    for (var fi = 0; fi < filterBtns.length; fi++) {
      filterBtns[fi].addEventListener('click', function (e) {
        var btn = e.currentTarget;
        var filter = btn.getAttribute('data-filter');
        var parent = btn.closest('.filter-bar');
        if (parent) {
          var siblings = parent.querySelectorAll('.filter-btn');
          for (var s = 0; s < siblings.length; s++) siblings[s].classList.remove('active');
        }
        btn.classList.add('active');

        var cards = document.querySelectorAll('.product-card');
        for (var c = 0; c < cards.length; c++) {
          if (filter === 'all') {
            cards[c].style.display = 'flex';
          } else {
            var cardType = cards[c].getAttribute('data-category');
            cards[c].style.display = (cardType === filter) ? 'flex' : 'none';
          }
        }
      });
    }

    /* ----------------------------------------------------------------
        9. PRODUCT DETAIL TABS
    ---------------------------------------------------------------- */
    var tabBtns = document.querySelectorAll('.tab-btn');
    for (var tb = 0; tb < tabBtns.length; tb++) {
      tabBtns[tb].addEventListener('click', function (e) {
        var btn = e.currentTarget;
        var parent = btn.closest('.product-tabs');
        if (!parent) return;
        var siblings = parent.querySelectorAll('.tab-btn');
        for (var sib = 0; sib < siblings.length; sib++) siblings[sib].classList.remove('active');
        btn.classList.add('active');

        var target = btn.getAttribute('data-tab');
        var panels = parent.querySelectorAll('.tab-content');
        for (var p = 0; p < panels.length; p++) {
          panels[p].classList.toggle('active', panels[p].id === target);
        }
      });
    }

    /* ----------------------------------------------------------------
        10. FAQ ACCORDION
    ---------------------------------------------------------------- */
    var faqQuestions = document.querySelectorAll('.faq-question');
    for (var fq = 0; fq < faqQuestions.length; fq++) {
      faqQuestions[fq].addEventListener('click', function (e) {
        var question = e.currentTarget;
        var expanded = question.getAttribute('aria-expanded') === 'true';
        var answer = question.nextElementSibling;
        if (!answer) return;

        if (expanded) {
          question.setAttribute('aria-expanded', 'false');
          question.classList.remove('open');
          answer.style.maxHeight = '0';
          answer.style.padding = '0 1.5rem';
        } else {
          question.setAttribute('aria-expanded', 'true');
          question.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
          answer.style.padding = '0 1.5rem 1.5rem';
        }
      });
    }

    /* ----------------------------------------------------------------
        11. QUANTITY SELECTORS (product detail)
    ---------------------------------------------------------------- */
    var minusBtns = document.querySelectorAll('.quantity-minus');
    var plusBtns = document.querySelectorAll('.quantity-plus');
    for (var mi = 0; mi < minusBtns.length; mi++) {
      minusBtns[mi].addEventListener('click', function () {
        var parent = this.closest('.quantity-selector');
        if (!parent) return;
        var valEl = parent.querySelector('.quantity-value');
        var val = parseInt(valEl.textContent, 10) || 1;
        if (val > 1) { valEl.textContent = val - 1; updateAddToCartQty(parent); }
      });
    }
    for (var pl = 0; pl < plusBtns.length; pl++) {
      plusBtns[pl].addEventListener('click', function () {
        var parent = this.closest('.quantity-selector');
        if (!parent) return;
        var valEl = parent.querySelector('.quantity-value');
        var val = parseInt(valEl.textContent, 10) || 1;
        if (val < 10) { valEl.textContent = val + 1; updateAddToCartQty(parent); }
      });
    }

    function updateAddToCartQty (parent) {
      var section = parent.closest('.product-info__actions');
      if (!section) return;
      var btn = section.querySelector('.js-add-to-cart');
      if (!btn) return;
      var valEl = parent.querySelector('.quantity-value');
      var qty = parseInt(valEl.textContent, 10) || 1;
      btn.removeEventListener('click', handleQuantityAdd);
      btn.addEventListener('click', handleQuantityAdd);
      function handleQuantityAdd (e) {
        e.preventDefault();
        var b = e.currentTarget;
        var id = b.getAttribute('data-product-id');
        var name = b.getAttribute('data-product-name');
        var size = b.getAttribute('data-product-size');
        var price = b.getAttribute('data-product-price');
        addToCart(id, name, size, price, qty);
      }
    }

    /* ----------------------------------------------------------------
        12. SIZE SELECTOR (product detail)
    ---------------------------------------------------------------- */
    var sizeOptions = document.querySelectorAll('.size-option');
    for (var so = 0; so < sizeOptions.length; so++) {
      sizeOptions[so].addEventListener('click', function () {
        var parent = this.closest('.size-options');
        if (!parent) return;
        var siblings = parent.querySelectorAll('.size-option');
        for (var si = 0; si < siblings.length; si++) siblings[si].classList.remove('selected');
        this.classList.add('selected');
        var price = this.getAttribute('data-price');
        var section = this.closest('.product-detail');
        if (section) {
          var priceEl = section.querySelector('.product-info__price');
          if (priceEl) priceEl.innerHTML = price + ' <span class="product-info__vat">incl. VAT</span>';
          var btn = section.querySelector('.js-add-to-cart');
          if (btn) {
            var sizeText = this.textContent.trim().split('·')[0].trim();
            btn.setAttribute('data-product-size', sizeText);
            btn.setAttribute('data-product-price', price);
          }
        }
      });
    }

    /* ----------------------------------------------------------------
        13. INIT CART ON PAGE LOAD
    ---------------------------------------------------------------- */
    loadCart();
    updateUI();

    /* expose clearCart globally so cart.html can call it */
    window.cart = { clearCart: clearCart, getCart: getCart };
  });

})();
