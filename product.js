const STORAGE_KEY = 'MOC_AN_PLASTIC_CATALOG_V3';
const ADMIN_AUTH_SESSION = 'MOC_AN_ADMIN_SESSION_V2';
const GH_CONFIG_KEY = 'MOC_AN_GITHUB_SYNC_CONFIG';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('moc_an_live_sync') : null;

const DEFAULT_LOGO_SVG = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232C5E6E'/%3E%3Cstop offset='100%25' stop-color='%2316323B'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='26' fill='url(%23g)'/%3E%3Crect x='7' y='7' width='106' height='106' rx='20' fill='none' stroke='%23C89B65' stroke-width='2.5' stroke-opacity='0.75'/%3E%3Ctext x='60' y='73' font-family='Georgia,serif' font-size='46' font-weight='bold' fill='%23FFFFFF' text-anchor='middle' letter-spacing='1'%3ETK%3C/text%3E%3Cline x1='34' y1='88' x2='86' y2='88' stroke='%23C89B65' stroke-width='3.5' stroke-linecap='round'/%3E%3C/svg%3E";

const FALLBACK_DATA = {
  updatedAt: 1761280000000,
  brand: {
    name: 'TUẤN KHẢI',
    tagline: 'NỘI THẤT NHỰA CAO CẤP',
    logoUrl: '',
    accentColor: '#2C5E6E',
    topbarPromo: '✨ Miễn phí khảo sát đo đạc tận nơi & thiết kế 3D cho Tủ quần áo, Tủ bếp, Giường, Tủ Tivi, Kệ nhựa cao cấp'
  },
  contact: {
    address: 'Xưởng & Showroom: Liên hệ để nhận vị trí chi tiết và xem mẫu ván nhựa thực tế',
    phone: '0909 888 999',
    email: 'lienhe@noithattuankhai.vn',
    hours: '08:00 - 20:30 (Tất cả các ngày trong tuần)',
    facebook: 'https://facebook.com',
    zalo: 'https://zalo.me/0909888999',
    instagram: 'https://instagram.com'
  },
  products: [
    {
      id: 'p1',
      name: 'Tủ Quần Áo Nhựa Ecoplast Kịch Trần Cánh Kính Phối Đèn LED',
      category: 'Tủ quần áo',
      material: 'Nhựa Ecoplast Cao Cấp + Cánh Kính Khung Nhôm | May đo theo phòng',
      badge: 'Mẫu Hot 2026',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1540518614846-7ede433c4576?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Mẫu tủ quần áo kịch trần tối ưu diện tích lưu trữ, thi công từ tấm nhựa nội thất Ecoplast cốt đặc dày dặn chống ẩm mốc tuyệt đối. Kết hợp khoang trưng bày túi xách cánh kính cường lực và hệ đèn LED cảm biến sang trọng.'
    },
    {
      id: 'p2',
      name: 'Tủ Bếp Nhựa Đặc Picomat Phủ Acrylic Bóng Gương Chữ L',
      category: 'Tủ bếp',
      material: 'Thùng Nhựa Đặc Picomat Chống Nước 100% + Cánh Acrylic | Thiết kế theo bếp',
      badge: 'Chống nước 100%',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Giải pháp hoàn hảo nhất cho phòng bếp: Thùng tủ bếp dưới bằng nhựa đặc Picomat/Ecoplast ngâm nước không trương nở, triệt tiêu 100% nỗi lo mối mọt và ẩm mốc. Bề mặt cánh phủ Acrylic bóng gương dễ dàng lau sạch dầu mỡ.'
    },
    {
      id: 'p3',
      name: 'Giường Ngủ Nhựa Ecoplast Cao Cấp Tích Hợp Ngăn Kéo Đa Năng',
      category: 'Giường ngủ',
      material: 'Nhựa Ecoplast Gân Chịu Lực Dày Dặn | Kích thước 1m6x2m / 1m8x2m',
      badge: 'Bền bỉ 15 năm',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1540518614846-7ede433c4576?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Giường ngủ nhựa cao cấp kết cấu đan xương chịu tải trọng lớn tới 500kg, không phát tiếng kêu cọt kẹt. Tích hợp 2–3 ngăn kéo lớn bên hông giường giúp cất chăn ga gối đệm cực kỳ gọn gàng.'
    },
    {
      id: 'p4',
      name: 'Hệ Tủ Tivi Kết Hợp Vách Lam Sóng Nhựa Cao Cấp Phòng Khách',
      category: 'Tủ tivi',
      material: 'Nhựa Ecoplast Vân Gỗ Óc Chó & Lam Sóng PVC | Dài 2m0 - 2m6',
      badge: 'Sang trọng',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Biến bức tường phòng khách trở nên đẳng cấp với hệ tủ Tivi treo hoặc đặt sàn kết hợp tủ rượu trang trí và vách lam sóng nhựa giả gỗ/giả đá chống ẩm tường tuyệt đối.'
    },
    {
      id: 'p5',
      name: 'Tủ Quần Áo Nhựa ChinHuei Đài Loan 4 Cánh Mở Kèm Bàn Trang Điểm',
      category: 'Tủ quần áo',
      material: 'Nhựa ChinHuei Chính Hãng Dày 2 Lớp | 200x240x55cm',
      badge: 'Được ưa chuộng',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Thiết kế thông minh 2 trong 1 vừa làm tủ quần áo kịch trần vừa tích hợp bàn trang điểm gọn đẹp. Màu trắng kem phối vân gỗ sồi hiện đại, bản lề giảm chấn inox 304 đóng mở êm ái.'
    },
    {
      id: 'p6',
      name: 'Hệ Kệ Trang Trí & Tủ Giày Kịch Trần Nhựa Cao Cấp',
      category: 'Kệ trang trí',
      material: 'Nhựa Ecoplast Chống Nước, Dễ Vệ Sinh | Đặt đóng theo kích thước',
      badge: 'Thiết kế thông minh',
      image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1000&q=80',
      images: [
        'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Kệ trang trí phòng khách, vách ngăn cầu thang hoặc tủ giày thông minh bằng nhựa cao cấp không bám mùi, dễ dàng lau rửa bằng nước mà không lo bong tróc.'
    }
  ],
  orders: []
};

let storeData = structuredClone(FALLBACK_DATA);
let currentProduct = null;
let galleryImages = [];
let currentImgIdx = 0;

function isAdminLogged() {
  return localStorage.getItem(ADMIN_AUTH_SESSION) === 'true';
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

async function fetchRemoteCatalogData() {
  let owner = 'ngclaam4444';
  let repo = 'noithattuankhai';
  let branch = 'main';
  try {
    const cfg = JSON.parse(localStorage.getItem(GH_CONFIG_KEY) || '{}');
    if (cfg.owner) owner = cfg.owner;
    if (cfg.repo) repo = cfg.repo;
    if (cfg.branch) branch = cfg.branch;
  } catch (e) {}

  try {
    const apiRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data.json?ref=${branch}&t=${Date.now()}`, {
      cache: 'no-store',
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (apiRes.ok) {
      const info = await apiRes.json();
      if (info && info.content) {
        const cleanB64 = info.content.replace(/\s/g, '');
        const jsonStr = new TextDecoder().decode(Uint8Array.from(atob(cleanB64), c => c.charCodeAt(0)));
        return JSON.parse(jsonStr);
      }
    }
  } catch (e) {}

  try {
    const res = await fetch(`data.json?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}

  return null;
}

async function initProductPage() {
  let localParsed = null;
  const localRaw = localStorage.getItem(STORAGE_KEY);
  if (localRaw) {
    try {
      localParsed = JSON.parse(localRaw);
      storeData = {
        ...FALLBACK_DATA,
        ...localParsed,
        brand: { ...FALLBACK_DATA.brand, ...(localParsed.brand || {}) },
        contact: { ...FALLBACK_DATA.contact, ...(localParsed.contact || {}) }
      };
    } catch (e) {}
  }

  renderAdminBar();
  renderBrandAndContact();
  renderCurrentProduct();

  const remoteData = await fetchRemoteCatalogData();
  if (remoteData) {
    const localUpdated = (localParsed && localParsed.updatedAt) || 0;
    const remoteUpdated = remoteData.updatedAt || 0;

    if (!localParsed || !isAdminLogged() || remoteUpdated >= localUpdated) {
      storeData = {
        ...FALLBACK_DATA,
        ...remoteData,
        brand: { ...FALLBACK_DATA.brand, ...(remoteData.brand || {}) },
        contact: { ...FALLBACK_DATA.contact, ...(remoteData.contact || {}) },
        orders: (localParsed && Array.isArray(localParsed.orders) && localParsed.orders.length > (remoteData.orders || []).length)
          ? localParsed.orders
          : (remoteData.orders || [])
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
      } catch (e) {}
      renderBrandAndContact();
      renderCurrentProduct();
    }
  }
}

function renderAdminBar() {
  const adminBar = document.getElementById('adminQuickBar');
  if (!adminBar) return;
  adminBar.style.display = isAdminLogged() ? 'block' : 'none';
}

function renderBrandAndContact() {
  const { brand, contact } = storeData;
  document.documentElement.style.setProperty('--accent-primary', brand.accentColor || '#2C5E6E');

  document.getElementById('brandNameText').textContent = brand.name;
  document.getElementById('brandTaglineText').textContent = brand.tagline;
  document.getElementById('topbarPromo').textContent = brand.topbarPromo;

  // Always show Logo on both Desktop & Mobile
  const activeLogoSrc = (brand.logoUrl && brand.logoUrl.trim() !== '') ? brand.logoUrl.trim() : DEFAULT_LOGO_SVG;
  const logoImg = document.getElementById('brandLogoImg');
  if (logoImg) {
    logoImg.src = activeLogoSrc;
    logoImg.style.display = 'block';
    if (brand.logoUrl && brand.logoUrl.trim() !== '') {
      logoImg.classList.add('custom-wide-logo');
    } else {
      logoImg.classList.remove('custom-wide-logo');
    }
    logoImg.onerror = () => {
      logoImg.src = DEFAULT_LOGO_SVG;
      logoImg.classList.remove('custom-wide-logo');
    };
  }

  const footerLogoImg = document.getElementById('footerLogoImg');
  if (footerLogoImg) {
    footerLogoImg.src = activeLogoSrc;
    footerLogoImg.onerror = () => {
      footerLogoImg.src = DEFAULT_LOGO_SVG;
    };
  }

  document.getElementById('topbarPhone').textContent = contact.phone;
  document.getElementById('topbarHours').textContent = contact.hours;
  const hotlineEl = document.getElementById('detHotline');
  hotlineEl.textContent = contact.phone;
  hotlineEl.href = `tel:${contact.phone.replace(/\s+/g, '')}`;
  document.getElementById('detZaloBtn').href = contact.zalo || '#';

  document.getElementById('footerBrandName').textContent = `${brand.name} — ${brand.tagline}`;
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

  const adminEditBtn = document.getElementById('adminEditCurrentBtn');
  if (adminEditBtn) {
    adminEditBtn.href = `admin.html?edit=${encodeURIComponent(currentProduct.id)}`;
  }

  document.getElementById('pageTitle').textContent = `${currentProduct.name} — ${storeData.brand.name}`;
  const bcCat = document.getElementById('bcCategory');
  bcCat.textContent = currentProduct.category;
  bcCat.href = `index.html?cat=${encodeURIComponent(currentProduct.category)}#products`;
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
  document.getElementById('detMaterial').textContent = currentProduct.material || 'Nhựa cao cấp chống nước 100%';
  document.getElementById('detDescription').textContent =
    currentProduct.description ||
    'Mẫu nội thất nhựa cao cấp chống nước 100%, không mối mọt, không cong vênh. Nhận khảo sát đo đạc và thiết kế kích thước, màu sắc theo yêu cầu riêng của gia chủ.';

  galleryImages = getProductImages(currentProduct);
  currentImgIdx = 0;
  renderGalleryView();
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
      <img src="${imgUrl}" alt="Góc chụp ${idx + 1}" onerror="this.src='https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80'" />
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
          ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
          <span class="photo-count-badge">📷 ${imgCount} ảnh</span>
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
        </a>

        <div class="product-body">
          <span class="product-category">${prod.category}</span>
          <a href="product.html?id=${encodeURIComponent(prod.id)}">
            <h3 class="product-title">${prod.name}</h3>
          </a>
          <p class="product-meta">${prod.material || 'Nhựa cao cấp chống nước'}</p>

          <div class="product-footer">
            <span style="font-size: 0.82rem; font-weight: 600; color: var(--accent-primary);">📐 Đóng theo kích thước yêu cầu</span>
            <a href="product.html?id=${encodeURIComponent(prod.id)}" class="btn btn-secondary btn-sm">Xem ${imgCount} ảnh →</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function openQuoteModal() {
  if (!currentProduct) return;
  document.getElementById('quoteModalProdName').textContent = currentProduct.name;
  document.getElementById('backdrop').classList.add('open');
  document.getElementById('quoteModal').classList.add('open');
}

function closeOverlays() {
  document.getElementById('backdrop').classList.remove('open');
  document.getElementById('quoteModal').classList.remove('open');
}

function saveCustomerInquiry(newInquiry) {
  if (!Array.isArray(storeData.orders)) storeData.orders = [];
  storeData.orders.unshift(newInquiry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
  if (syncChannel) {
    syncChannel.postMessage({ type: 'DATA_UPDATED', data: storeData });
  }
}

function reloadFromLocalStorage() {
  renderAdminBar();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    storeData = {
      ...FALLBACK_DATA,
      ...parsed,
      brand: { ...FALLBACK_DATA.brand, ...(parsed.brand || {}) },
      contact: { ...FALLBACK_DATA.contact, ...(parsed.contact || {}) }
    };
    renderBrandAndContact();
    renderCurrentProduct();
  } catch (e) {}
}

if (syncChannel) {
  syncChannel.onmessage = ev => {
    if (ev.data && ev.data.type === 'DATA_UPDATED') {
      storeData = ev.data.data;
      renderAdminBar();
      renderBrandAndContact();
      renderCurrentProduct();
    }
  };
}

window.addEventListener('storage', e => {
  if (e.key === STORAGE_KEY || e.key === ADMIN_AUTH_SESSION) {
    reloadFromLocalStorage();
  }
});

window.addEventListener('focus', () => {
  reloadFromLocalStorage();
});

document.addEventListener('DOMContentLoaded', () => {
  initProductPage();

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

  document.getElementById('openQuoteModalBtn').addEventListener('click', openQuoteModal);
  document.getElementById('headerQuoteBtn').addEventListener('click', openQuoteModal);
  document.getElementById('closeQuoteModalBtn').addEventListener('click', closeOverlays);
  document.getElementById('backdrop').addEventListener('click', closeOverlays);

  document.getElementById('quoteModalForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('qName').value.trim();
    const phone = document.getElementById('qPhone').value.trim();
    const address = document.getElementById('qAddress').value.trim();
    const note = document.getElementById('qNote').value.trim();

    saveCustomerInquiry({
      type: 'inquiry',
      status: 'Chờ tư vấn',
      name,
      phone,
      time: new Date().toLocaleString('vi-VN'),
      details: `Mẫu quan tâm: ${currentProduct.name} (${currentProduct.category}) ${address ? '| Đ/c: ' + address : ''} ${note ? '| Ghi chú: ' + note : ''}`
    });

    e.target.reset();
    closeOverlays();
    showToast('✅ Đã gửi yêu cầu báo giá mẫu này! Chúng tôi sẽ liên hệ sớm nhất.');
  });
});
