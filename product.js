const STORAGE_KEY = 'MOC_AN_SHARED_DATA_V2';
const CART_KEY = 'MOC_AN_CART_V2';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('moc_an_live_sync') : null;

const FALLBACK_DATA = {
  brand: {
    name: 'MỘC AN',
    tagline: 'INTERIOR & LIVING',
    logoUrl: '',
    accentColor: '#8C583A',
    topbarPromo: '✨ Miễn phí vận chuyển & lắp đặt nội thành cho đơn hàng từ 10.000.000đ'
  },
  contact: {
    address: 'Số 128 Nguyễn Cơ Thạch, Khu đô thị Sala, Quận 2, TP. Hồ Chí Minh',
    phone: '0909 888 999',
    email: 'lienhe@mocanliving.vn',
    hours: '08:30 - 21:00 (T2 - CN)',
    facebook: 'https://facebook.com',
    zalo: 'https://zalo.me/0909888999',
    instagram: 'https://instagram.com'
  },
  products: [
    {
      id: 'p1',
      name: 'Sofa Văng Gỗ Óc Chó Bắc Mỹ Kyoto',
      category: 'Phòng khách',
      price: 28500000,
      oldPrice: 32000000,
      material: 'Gỗ Óc Chó & Da Bò Ý | 230x88x78cm',
      badge: 'Bán chạy',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Thiết kế tinh giản lấy cảm hứng từ phong cách Japandi, khung gỗ óc chó Bắc Mỹ nguyên khối kết hợp đệm bọc da bò thật mềm mại, nâng đỡ cột sống tối ưu. Từng góc bo và đường chỉ khâu tay được hoàn thiện tỉ mỉ bởi nghệ nhân lâu năm.'
    },
    {
      id: 'p2',
      name: 'Bàn Ăn Nguyên Tấm Gỗ Sồi Nga 6 Ghế Oslo',
      category: 'Phòng ăn',
      price: 19800000,
      oldPrice: 23500000,
      material: 'Gỗ Sồi Nga Tự Nhiên | 180x90x75cm',
      badge: '-15%',
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Bộ bàn ăn 6 ghế bo góc mềm mại, an toàn cho gia đình có trẻ nhỏ. Bề mặt phủ dầu lau thực vật giữ nguyên vân gỗ tự nhiên và chống thấm nước, chống trầy xước hiệu quả trong quá trình sử dụng hàng ngày.'
    },
    {
      id: 'p3',
      name: 'Giường Ngủ Bọc Nỉ Linen Cao Cấp Cloud',
      category: 'Phòng ngủ',
      price: 16500000,
      oldPrice: 18900000,
      material: 'Khung Gỗ Tần Bì & Vải Linen Bỉ | 180x200cm',
      badge: 'Mới 2026',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1540518614846-7ede433c4576?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Tựa đầu giường êm ái như mây, bọc vải Linen Bỉ thoáng khí, kháng khuẩn. Kết cấu giạt giường gỗ tự nhiên chịu lực lên tới 500kg, không phát ra tiếng kêu khi trở mình.'
    },
    {
      id: 'p4',
      name: 'Ghế Thư Giãn Bọc Da Lounge Armchair',
      category: 'Phòng khách',
      price: 7900000,
      oldPrice: 9200000,
      material: 'Gỗ Tần Bì Uốn Cong & Da Microfiber | 78x82x80cm',
      badge: 'Yêu thích',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Chiếc ghế thư giãn hoàn hảo cho góc đọc sách hoặc phòng khách hiện đại. Độ nghiêng lưng 105 độ chuẩn công thái học giúp thả lỏng cơ thể sau ngày làm việc.'
    },
    {
      id: 'p5',
      name: 'Bàn Làm Việc Giám Đốc Tại Gia Artisan',
      category: 'Phòng làm việc',
      price: 11200000,
      oldPrice: 0,
      material: 'Gỗ Óc Chó & Chân Đồng Thau | 150x70x75cm',
      badge: 'Cao cấp',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Tích hợp hộc kéo ẩn và khe đi dây điện thông minh, mang lại không gian làm việc gọn gàng, truyền cảm hứng sáng tạo mỗi ngày.'
    },
    {
      id: 'p6',
      name: 'Đèn Sàn Nghệ Thuật Chụp Vải Lụa WarmGlow',
      category: 'Trang trí',
      price: 3450000,
      oldPrice: 4100000,
      material: 'Thân Gỗ Sồi & Chụp Lụa Tự Nhiên | Cao 165cm',
      badge: 'Bán chạy',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Ánh sáng vàng ấm 2700K dịu nhẹ lan toả qua lớp chụp lụa dệt tay, tạo điểm nhấn ấm cúng cho góc sofa hoặc phòng ngủ.'
    }
  ],
  orders: []
};

let storeData = structuredClone(FALLBACK_DATA);
let cart = loadCart();
let currentProduct = null;
let galleryImages = [];
let currentImgIdx = 0;

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatVND(amount) {
  const num = Number(amount) || 0;
  return num.toLocaleString('vi-VN') + 'đ';
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function getProductImages(prod) {
  if (Array.isArray(prod.images) && prod.images.filter(Boolean).length > 0) {
    return prod.images.filter(Boolean);
  }
  return [prod.image].filter(Boolean);
}

async function initProductPage() {
  const localRaw = localStorage.getItem(STORAGE_KEY);
  if (localRaw) {
    try {
      const parsed = JSON.parse(localRaw);
      // Merge default multi-image arrays if older local storage didn't have `images`
      if (Array.isArray(parsed.products)) {
        parsed.products = parsed.products.map(p => {
          const defProd = FALLBACK_DATA.products.find(d => d.id === p.id);
          if ((!p.images || p.images.length <= 1) && defProd && defProd.images) {
            return { ...p, images: defProd.images };
          }
          return p;
        });
      }
      storeData = { ...FALLBACK_DATA, ...parsed };
    } catch (e) {}
  }

  try {
    const res = await fetch(`data.json?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const remoteData = await res.json();
      const localUpdated = storeData.updatedAt || 0;
      const remoteUpdated = remoteData.updatedAt || 0;
      if (!localRaw || remoteUpdated >= localUpdated) {
        storeData = { ...FALLBACK_DATA, ...remoteData };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
      }
    }
  } catch (err) {}

  renderBrandAndContact();
  renderCurrentProduct();
  renderCart();
}

function renderBrandAndContact() {
  const { brand, contact } = storeData;
  document.documentElement.style.setProperty('--accent-primary', brand.accentColor || '#8C583A');

  document.getElementById('brandNameText').textContent = brand.name;
  document.getElementById('brandTaglineText').textContent = brand.tagline;
  document.getElementById('topbarPromo').textContent = brand.topbarPromo;

  const logoImg = document.getElementById('brandLogoImg');
  if (brand.logoUrl && brand.logoUrl.trim() !== '') {
    logoImg.src = brand.logoUrl;
    logoImg.style.display = 'block';
  } else {
    logoImg.style.display = 'none';
  }

  document.getElementById('topbarPhone').textContent = contact.phone;
  document.getElementById('topbarHours').textContent = contact.hours;
  document.getElementById('detHotline').textContent = contact.phone;
  document.getElementById('detZaloBtn').href = contact.zalo || '#';

  document.getElementById('footerBrandName').textContent = `${brand.name} ${brand.tagline}`;
  document.getElementById('footerAddress').textContent = contact.address;
  document.getElementById('footerPhone').textContent = contact.phone;
  document.getElementById('footerEmail').textContent = contact.email;
  document.getElementById('copyrightBrand').textContent = brand.name;
}

function renderCurrentProduct() {
  const params = new URLSearchParams(window.location.search);
  const prodId = params.get('id');
  const products = storeData.products || [];

  currentProduct = products.find(p => p.id === prodId) || products[0];
  if (!currentProduct) return;

  document.getElementById('pageTitle').textContent = `${currentProduct.name} — ${storeData.brand.name}`;
  document.getElementById('bcCategory').textContent = currentProduct.category;
  document.getElementById('bcProductName').textContent = currentProduct.name;

  document.getElementById('detCategory').textContent = currentProduct.category;
  const badgeEl = document.getElementById('detBadge');
  if (currentProduct.badge) {
    badgeEl.textContent = currentProduct.badge;
    badgeEl.style.display = 'inline-block';
  } else {
    badgeEl.style.display = 'none';
  }

  document.getElementById('detName').textContent = currentProduct.name;
  document.getElementById('detPrice').textContent = formatVND(currentProduct.price);

  const oldPriceEl = document.getElementById('detOldPrice');
  const discPill = document.getElementById('detDiscountPill');
  if (currentProduct.oldPrice && currentProduct.oldPrice > currentProduct.price) {
    oldPriceEl.textContent = formatVND(currentProduct.oldPrice);
    const pct = Math.round(((currentProduct.oldPrice - currentProduct.price) / currentProduct.oldPrice) * 100);
    discPill.textContent = `Tiết kiệm ${pct}%`;
    discPill.style.display = 'inline-block';
  } else {
    oldPriceEl.textContent = '';
    discPill.style.display = 'none';
  }

  document.getElementById('detMaterial').textContent = currentProduct.material || 'Gỗ tự nhiên tuyển chọn';
  document.getElementById('detDescription').textContent =
    currentProduct.description ||
    'Sản phẩm nội thất cao cấp được chế tác tỉ mỉ từ nguồn vật liệu tuyển chọn, bảo hành kết cấu 5 năm và hỗ trợ tuỳ chỉnh kích thước theo yêu cầu riêng của gia chủ.';

  // Setup 4-5 Image Gallery
  galleryImages = getProductImages(currentProduct);
  currentImgIdx = 0;
  renderGalleryView();

  // Render Related Products
  renderRelatedProducts();
}

function renderGalleryView() {
  if (galleryImages.length === 0) return;

  const mainImg = document.getElementById('mainGalleryImg');
  mainImg.src = galleryImages[currentImgIdx];
  mainImg.alt = `${currentProduct.name} - Ảnh ${currentImgIdx + 1}`;

  document.getElementById('galleryCounter').textContent = `Ảnh ${currentImgIdx + 1} / ${galleryImages.length}`;

  const thumbsContainer = document.getElementById('galleryThumbs');
  thumbsContainer.innerHTML = galleryImages.map((imgUrl, idx) => `
    <div class="gallery-thumb ${idx === currentImgIdx ? 'active' : ''}" data-idx="${idx}">
      <img src="${imgUrl}" alt="Góc chụp ${idx + 1}" onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80'" />
    </div>
  `).join('');

  thumbsContainer.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentImgIdx = Number(thumb.dataset.idx);
      renderGalleryView();
    });
  });
}

function renderRelatedProducts() {
  const grid = document.getElementById('relatedProductsGrid');
  const others = (storeData.products || []).filter(p => p.id !== currentProduct.id).slice(0, 4);

  grid.innerHTML = others.map(prod => {
    const imgCount = getProductImages(prod).length;
    return `
      <article class="product-card">
        <a href="product.html?id=${encodeURIComponent(prod.id)}" class="product-media">
          ${prod.badge ? `<span class="product-badge ${prod.oldPrice > prod.price ? 'sale' : ''}">${prod.badge}</span>` : ''}
          <span class="photo-count-badge">📷 ${imgCount} ảnh</span>
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
        </a>

        <div class="product-body">
          <span class="product-category">${prod.category}</span>
          <a href="product.html?id=${encodeURIComponent(prod.id)}">
            <h3 class="product-title">${prod.name}</h3>
          </a>
          <p class="product-meta">${prod.material || 'Gỗ tự nhiên cao cấp'}</p>

          <div class="product-footer">
            <div class="price-wrap">
              <span class="price-current">${formatVND(prod.price)}</span>
              ${prod.oldPrice && prod.oldPrice > prod.price ? `<span class="price-old">${formatVND(prod.oldPrice)}</span>` : ''}
            </div>
            <a href="product.html?id=${encodeURIComponent(prod.id)}" class="btn btn-secondary btn-sm">Xem ${imgCount} ảnh →</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function addToCart(prod, qty = 1) {
  if (!prod) return;
  const existing = cart.find(i => i.id === prod.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty });
  }
  saveCart();
  renderCart();
  showToast(`🛒 Đã thêm ${qty}x "${prod.name}" vào giỏ hàng!`);
}

function renderCart() {
  const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  document.getElementById('cartCount').textContent = totalCount;
  document.getElementById('cartTotalPrice').textContent = formatVND(totalPrice);

  const listEl = document.getElementById('cartItemsList');
  if (cart.length === 0) {
    listEl.innerHTML = `<p style="text-align: center; color: var(--text-secondary); padding: 40px 0;">Giỏ hàng của bạn đang trống.</p>`;
    document.getElementById('checkoutForm').style.display = 'none';
    document.getElementById('proceedCheckoutBtn').style.display = 'none';
    return;
  }

  document.getElementById('proceedCheckoutBtn').style.display = 'block';
  listEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div style="color: var(--accent-primary); font-weight: 600; font-size: 0.9rem;">${formatVND(item.price)}</div>
        <div class="cart-qty-controls">
          <button type="button" data-qty="${item.id}" data-delta="-1">−</button>
          <span>${item.qty}</span>
          <button type="button" data-qty="${item.id}" data-delta="1">+</button>
        </div>
      </div>
    </div>
  `).join('');

  listEl.querySelectorAll('[data-qty]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.qty;
      const delta = Number(btn.dataset.delta);
      const item = cart.find(i => i.id === id);
      if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
          cart = cart.filter(i => i.id !== id);
        }
        saveCart();
        renderCart();
      }
    });
  });
}

function saveCustomerOrder(newOrder) {
  if (!Array.isArray(storeData.orders)) storeData.orders = [];
  storeData.orders.unshift(newOrder);
  storeData.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
  if (syncChannel) {
    syncChannel.postMessage({ type: 'DATA_UPDATED', data: storeData });
  }
}

function closeOverlays() {
  document.getElementById('backdrop').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
}

if (syncChannel) {
  syncChannel.onmessage = ev => {
    if (ev.data && ev.data.type === 'DATA_UPDATED') {
      storeData = ev.data.data;
      renderBrandAndContact();
      renderCurrentProduct();
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  initProductPage();

  // Gallery Prev/Next Buttons
  document.getElementById('prevImgBtn').addEventListener('click', () => {
    if (galleryImages.length === 0) return;
    currentImgIdx = (currentImgIdx - 1 + galleryImages.length) % galleryImages.length;
    renderGalleryView();
  });

  document.getElementById('nextImgBtn').addEventListener('click', () => {
    if (galleryImages.length === 0) return;
    currentImgIdx = (currentImgIdx + 1) % galleryImages.length;
    renderGalleryView();
  });

  // Quantity Controls
  const qtyInput = document.getElementById('qtyInput');
  document.getElementById('qtyMinus').addEventListener('click', () => {
    const val = Math.max(1, Number(qtyInput.value) - 1);
    qtyInput.value = val;
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    const val = Math.min(99, Number(qtyInput.value) + 1);
    qtyInput.value = val;
  });

  // Add to Cart & Buy Now
  document.getElementById('addToCartDetailBtn').addEventListener('click', () => {
    const qty = Number(qtyInput.value) || 1;
    addToCart(currentProduct, qty);
  });

  document.getElementById('buyNowDetailBtn').addEventListener('click', () => {
    const qty = Number(qtyInput.value) || 1;
    addToCart(currentProduct, qty);
    document.getElementById('backdrop').classList.add('open');
    document.getElementById('cartDrawer').classList.add('open');
    const form = document.getElementById('checkoutForm');
    form.style.display = 'block';
    setTimeout(() => form.scrollIntoView({ behavior: 'smooth' }), 150);
  });

  // Cart Drawer
  document.getElementById('openCartBtn').addEventListener('click', () => {
    document.getElementById('backdrop').classList.add('open');
    document.getElementById('cartDrawer').classList.add('open');
  });
  document.getElementById('closeCartBtn').addEventListener('click', closeOverlays);
  document.getElementById('backdrop').addEventListener('click', closeOverlays);

  document.getElementById('proceedCheckoutBtn').addEventListener('click', () => {
    const form = document.getElementById('checkoutForm');
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('orderName').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    const address = document.getElementById('orderAddress').value.trim();
    const note = document.getElementById('orderNote').value.trim();
    const itemsSummary = cart.map(i => `${i.name} (x${i.qty})`).join(', ');
    const total = formatVND(cart.reduce((s, i) => s + i.price * i.qty, 0));

    saveCustomerOrder({
      type: 'order',
      status: 'Chờ xử lý',
      name,
      phone,
      time: new Date().toLocaleString('vi-VN'),
      details: `Giao tới: ${address} | SP: ${itemsSummary} | Tổng: ${total} ${note ? '| Ghi chú: ' + note : ''}`
    });

    cart = [];
    saveCart();
    renderCart();
    e.target.reset();
    closeOverlays();
    showToast('🎉 Đặt hàng thành công! Cửa hàng sẽ liên hệ xác nhận ngay.');
  });
});
