const STORAGE_KEY = 'MOC_AN_SHARED_DATA_V2';
const CART_KEY = 'MOC_AN_CART_V2';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('moc_an_live_sync') : null;

const FALLBACK_DATA = {
  brand: {
    name: 'MỘC AN',
    tagline: 'INTERIOR & LIVING',
    logoUrl: '',
    accentColor: '#8C583A',
    topbarPromo: '✨ Miễn phí vận chuyển & lắp đặt nội thành cho đơn hàng từ 10.000.000đ',
    heroBg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    heroBadge: 'BỘ SƯU TẬP MỚI 2026',
    heroTitle: 'Kiến Tạo Không Gian Sống Đậm Chất Nghệ Thuật',
    heroSubtitle: 'Sự giao thoa hoàn hảo giữa gỗ tự nhiên tuyển chọn và phong cách thiết kế đương đại ấm cúng, mang lại cảm giác bình yên cho tổ ấm của bạn.',
    storyImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    storyTitle: 'Hành Trình Đưa Sự Ấm Áp Tự Nhiên Vào Từng Ngôi Nhà Việt',
    storyP1: 'Khởi nguồn từ xưởng mộc thủ công truyền thống, Mộc An Living ra đời với khát vọng tạo nên những sản phẩm nội thất vừa mang nét thanh lịch đương đại, vừa giữ trọn vẹn hơi thở mộc mạc, ấm áp của gỗ tự nhiên.',
    storyP2: 'Chúng tôi tin rằng ngôi nhà không chỉ là nơi để ở, mà là không gian nuôi dưỡng cảm xúc và gắn kết gia đình. Từng đường vân gỗ, từng mũi khâu da hay lớp đệm êm ái đều được chăm chút tỉ mỉ.'
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
      description: 'Thiết kế tinh giản lấy cảm hứng từ phong cách Japandi, khung gỗ óc chó Bắc Mỹ nguyên khối kết hợp đệm bọc da bò thật mềm mại, nâng đỡ cột sống tối ưu.'
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
      description: 'Bộ bàn ăn 6 ghế bo góc mềm mại, an toàn cho gia đình có trẻ nhỏ. Bề mặt phủ dầu lau thực vật giữ nguyên vân gỗ tự nhiên và chống thấm nước.'
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
      description: 'Tựa đầu giường êm ái như mây, bọc vải Linen Bỉ thoáng khí, kháng khuẩn. Kết cấu giạt giường gỗ tự nhiên chịu lực lên tới 500kg.'
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
      description: 'Chiếc ghế thư giãn hoàn hảo cho góc đọc sách hoặc phòng khách hiện đại. Độ nghiêng lưng 105 độ chuẩn công thái học giúp thả lỏng cơ thể.'
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
let activeCategory = 'Tất cả';
let searchQuery = '';
let sortMode = 'featured';

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

function getProductImages(prod) {
  if (Array.isArray(prod.images) && prod.images.filter(Boolean).length > 0) {
    return prod.images.filter(Boolean);
  }
  return [prod.image].filter(Boolean);
}

async function initStoreData() {
  const localRaw = localStorage.getItem(STORAGE_KEY);
  if (localRaw) {
    try {
      const parsed = JSON.parse(localRaw);
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
        storeData = {
          ...FALLBACK_DATA,
          ...remoteData,
          orders: storeData.orders && storeData.orders.length > (remoteData.orders || []).length
            ? storeData.orders
            : (remoteData.orders || [])
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
      }
    }
  } catch (err) {}

  renderSiteConfig();
  renderCategories();
  renderProducts();
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

function renderSiteConfig() {
  const { brand, contact } = storeData;

  document.documentElement.style.setProperty('--accent-primary', brand.accentColor || '#8C583A');

  document.getElementById('pageTitle').textContent = `${brand.name} — Nội Thất Hiện Đại & Ấm Cúng`;
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

  const heroEl = document.getElementById('home');
  heroEl.style.backgroundImage = `url('${brand.heroBg}')`;
  document.getElementById('heroBadge').textContent = brand.heroBadge;
  document.getElementById('heroTitle').textContent = brand.heroTitle;
  document.getElementById('heroSubtitle').textContent = brand.heroSubtitle;

  document.getElementById('storyImage').src = brand.storyImg;
  document.getElementById('storyTitle').textContent = brand.storyTitle;
  document.getElementById('storyParagraph1').textContent = brand.storyP1;
  document.getElementById('storyParagraph2').textContent = brand.storyP2;

  document.getElementById('topbarPhone').textContent = contact.phone;
  document.getElementById('topbarHours').textContent = contact.hours;
  document.getElementById('contactAddress').textContent = contact.address;

  const phoneEl = document.getElementById('contactPhone');
  phoneEl.textContent = contact.phone;
  phoneEl.href = `tel:${contact.phone.replace(/\s+/g, '')}`;

  const emailEl = document.getElementById('contactEmail');
  emailEl.textContent = contact.email;
  emailEl.href = `mailto:${contact.email}`;

  document.getElementById('contactHours').textContent = contact.hours;
  document.getElementById('socialFacebook').href = contact.facebook || '#';
  document.getElementById('socialZalo').href = contact.zalo || '#';
  document.getElementById('socialInstagram').href = contact.instagram || '#';

  document.getElementById('footerBrandName').textContent = `${brand.name} ${brand.tagline}`;
  document.getElementById('footerAddress').textContent = contact.address;
  document.getElementById('footerPhone').textContent = contact.phone;
  document.getElementById('footerEmail').textContent = contact.email;
  document.getElementById('copyrightBrand').textContent = brand.name;
}

function renderCategories() {
  const defaultCats = ['Tất cả', 'Phòng khách', 'Phòng ăn', 'Phòng ngủ', 'Phòng làm việc', 'Trang trí'];
  const productCats = (storeData.products || []).map(p => p.category).filter(Boolean);
  const allCats = [...new Set([...defaultCats, ...productCats])];

  const container = document.getElementById('categoryPills');
  container.innerHTML = allCats.map(cat => `
    <button class="category-pill ${cat === activeCategory ? 'active' : ''}" data-cat="${cat}">
      ${cat}
    </button>
  `).join('');

  container.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      renderCategories();
      renderProducts();
    });
  });
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  let list = [...(storeData.products || [])];

  if (activeCategory !== 'Tất cả') {
    list = list.filter(p => p.category === activeCategory);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.material && p.material.toLowerCase().includes(q))
    );
  }

  if (sortMode === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortMode === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortMode === 'newest') {
    list.reverse();
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Không tìm thấy sản phẩm phù hợp</h3>
        <p style="color: var(--text-secondary); margin-bottom: 16px;">Hãy thử tìm với từ khoá khác hoặc chọn danh mục "Tất cả".</p>
        <button class="btn btn-secondary btn-sm" id="resetFilterBtn">Xem tất cả sản phẩm</button>
      </div>
    `;
    const resetBtn = document.getElementById('resetFilterBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCategory = 'Tất cả';
        searchQuery = '';
        document.getElementById('searchInput').value = '';
        renderCategories();
        renderProducts();
      });
    }
    return;
  }

  grid.innerHTML = list.map(prod => {
    const imgs = getProductImages(prod);
    const detailUrl = `product.html?id=${encodeURIComponent(prod.id)}`;
    return `
      <article class="product-card">
        <a href="${detailUrl}" class="product-media">
          ${prod.badge ? `<span class="product-badge ${prod.oldPrice > prod.price ? 'sale' : ''}">${prod.badge}</span>` : ''}
          <span class="photo-count-badge">📷 ${imgs.length} ảnh</span>
          <img src="${imgs[0] || prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80'" />
          <div class="product-quick-actions">
            <span class="quick-btn">👁️ Xem chi tiết (${imgs.length} ảnh)</span>
          </div>
        </a>

        <div class="product-body">
          <span class="product-category">${prod.category}</span>
          <a href="${detailUrl}">
            <h3 class="product-title">${prod.name}</h3>
          </a>
          <p class="product-meta">${prod.material || 'Gỗ tự nhiên cao cấp'}</p>

          <div class="product-footer">
            <div class="price-wrap">
              <span class="price-current">${formatVND(prod.price)}</span>
              ${prod.oldPrice && prod.oldPrice > prod.price ? `<span class="price-old">${formatVND(prod.oldPrice)}</span>` : ''}
            </div>
            <button class="btn btn-primary btn-sm" data-addcart="${prod.id}">+ Giỏ hàng</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-addcart]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.addcart));
  });
}

function addToCart(productId) {
  const prod = (storeData.products || []).find(p => p.id === productId);
  if (!prod) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty: 1 });
  }
  saveCart();
  renderCart();
  showToast(`🛒 Đã thêm "${prod.name}" vào giỏ hàng!`);
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

function closeAllOverlays() {
  document.getElementById('backdrop').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  const qv = document.getElementById('quickViewModal');
  if (qv) qv.classList.remove('open');
}

if (syncChannel) {
  syncChannel.onmessage = ev => {
    if (ev.data && ev.data.type === 'DATA_UPDATED') {
      storeData = ev.data.data;
      renderSiteConfig();
      renderCategories();
      renderProducts();
    }
  };
}

window.addEventListener('storage', e => {
  if (e.key === STORAGE_KEY && e.newValue) {
    try {
      storeData = JSON.parse(e.newValue);
      renderSiteConfig();
      renderCategories();
      renderProducts();
    } catch (err) {}
  } else if (e.key === CART_KEY) {
    cart = loadCart();
    renderCart();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initStoreData();
  renderCart();

  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderProducts();
  });

  document.getElementById('sortSelect').addEventListener('change', e => {
    sortMode = e.target.value;
    renderProducts();
  });

  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', () => {
      activeCategory = link.dataset.filter;
      renderCategories();
      renderProducts();
    });
  });

  document.getElementById('openCartBtn').addEventListener('click', () => {
    document.getElementById('backdrop').classList.add('open');
    document.getElementById('cartDrawer').classList.add('open');
  });

  document.getElementById('closeCartBtn').addEventListener('click', closeAllOverlays);
  document.getElementById('backdrop').addEventListener('click', closeAllOverlays);

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
    closeAllOverlays();
    showToast('🎉 Đặt hàng thành công! Cửa hàng sẽ liên hệ xác nhận ngay.');
  });

  document.getElementById('consultationForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('inqName').value.trim();
    const phone = document.getElementById('inqPhone').value.trim();
    const service = document.getElementById('inqService').value;
    const msg = document.getElementById('inqMessage').value.trim();

    saveCustomerOrder({
      type: 'inquiry',
      status: 'Chờ xử lý',
      name,
      phone,
      time: new Date().toLocaleString('vi-VN'),
      details: `Nhu cầu: ${service} | Lời nhắn: ${msg || 'Cần tư vấn báo giá'}`
    });

    e.target.reset();
    showToast('✅ Đã gửi yêu cầu tư vấn! Chúng tôi sẽ gọi lại cho bạn sớm nhất.');
  });
});
