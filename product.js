const STORAGE_KEY = 'MOC_AN_PLASTIC_CATALOG_V3';
const ADMIN_AUTH_SESSION = 'MOC_AN_ADMIN_SESSION_V2';
const GH_CONFIG_KEY = 'MOC_AN_GITHUB_SYNC_CONFIG';
const INQUIRY_CLOUD_TOPIC = 'tuankhai_noithat_orders_sync_v3';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('moc_an_live_sync') : null;

const DEFAULT_LOGO_SVG = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232C5E6E'/%3E%3Cstop offset='100%25' stop-color='%2316323B'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='26' fill='url(%23g)'/%3E%3Crect x='7' y='7' width='106' height='106' rx='20' fill='none' stroke='%23C89B65' stroke-width='2.5' stroke-opacity='0.75'/%3E%3Ctext x='60' y='73' font-family='Georgia,serif' font-size='46' font-weight='bold' fill='%23FFFFFF' text-anchor='middle' letter-spacing='1'%3ETK%3C/text%3E%3Cline x1='34' y1='88' x2='86' y2='88' stroke='%23C89B65' stroke-width='3.5' stroke-linecap='round'/%3E%3C/svg%3E";

const FALLBACK_DATA = {
  updatedAt: 1000,
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
  orders: [],
  deletedOrderIds: []
};

let storeData = structuredClone(FALLBACK_DATA);
let currentProduct = null;
let galleryImages = [];
let currentImgIdx = 0;

// Zoom & Pan State for Inline Gallery
let zoomScale = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

// Zoom & Pan State for Fullscreen Lightbox
let lbScale = 1;
let lbPanX = 0;
let lbPanY = 0;
let lbDragging = false;
let lbDragStartX = 0;
let lbDragStartY = 0;

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4.0;
const ZOOM_STEP = 0.25;

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

function mergeOrders(localOrders = [], remoteOrders = [], deletedIds = []) {
  const delSet = new Set(deletedIds || []);
  const map = new Map();
  [...(localOrders || []), ...(remoteOrders || [])].forEach(o => {
    if (!o) return;
    const key = o.id || `${o.phone}_${o.time}`;
    if (delSet.has(key)) return;
    if (!map.has(key)) {
      map.set(key, { ...o, id: key });
    }
  });
  return Array.from(map.values());
}

async function fetchRemoteCatalogData() {
  let owner = 'ngclaam4444';
  let repo = 'noithattuankhai';
  let branch = 'main';
  let token = '';
  try {
    const cfg = JSON.parse(localStorage.getItem(GH_CONFIG_KEY) || '{}');
    if (cfg.owner) owner = cfg.owner;
    if (cfg.repo) repo = cfg.repo;
    if (cfg.branch) branch = cfg.branch;
    if (cfg.token) token = cfg.token;
  } catch (e) {}

  // 1. Fetch from raw.githubusercontent.com (no 1MB limit and no 60-req/hr API limit)
  try {
    const rawRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/data.json?t=${Date.now()}`, {
      cache: 'no-store'
    });
    if (rawRes.ok) {
      return await rawRes.json();
    }
  } catch (e) {}

  // 2. Fallback to local/static data.json
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
    const localUpdated = (localParsed && Number(localParsed.updatedAt)) || 0;
    const remoteUpdated = Number(remoteData.updatedAt) || 0;
    const mergedDeleted = [...new Set([...(localParsed?.deletedOrderIds || []), ...(remoteData.deletedOrderIds || [])])];
    const combinedOrders = mergeOrders(localParsed?.orders, remoteData.orders, mergedDeleted);

    if (!localParsed || remoteUpdated > localUpdated) {
      storeData = {
        ...FALLBACK_DATA,
        ...remoteData,
        brand: { ...FALLBACK_DATA.brand, ...(remoteData.brand || {}) },
        contact: { ...FALLBACK_DATA.contact, ...(remoteData.contact || {}) },
        orders: combinedOrders,
        deletedOrderIds: mergedDeleted
      };
    } else {
      storeData.orders = combinedOrders;
      storeData.deletedOrderIds = mergedDeleted;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
    } catch (e) {}
    renderAdminBar();
    renderBrandAndContact();
    renderCurrentProduct();
  }
}

function renderAdminBar() {
  const adminBar = document.getElementById('adminQuickBar');
  if (!adminBar) return;
  adminBar.style.display = isAdminLogged() ? 'block' : 'none';
  const countEl = document.getElementById('adminBarOrderCount');
  if (countEl) {
    countEl.textContent = (storeData.orders || []).length;
  }
}

function renderBrandAndContact() {
  const { brand, contact } = storeData;
  document.documentElement.style.setProperty('--accent-primary', brand.accentColor || '#2C5E6E');

  document.getElementById('brandNameText').textContent = brand.name;
  document.getElementById('brandTaglineText').textContent = brand.tagline;
  document.getElementById('topbarPromo').textContent = brand.topbarPromo;

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

function applyInlineZoomTransform() {
  const mainImg = document.getElementById('mainGalleryImg');
  const resetBtn = document.getElementById('zoomResetBtn');
  const barResetBtn = document.getElementById('barZoomResetBtn');
  const zoomSlider = document.getElementById('zoomRangeSlider');
  const wrap = document.getElementById('galleryMainWrap');
  if (!mainImg) return;

  if (zoomScale <= 1) {
    panX = 0;
    panY = 0;
  }

  const pct = Math.round(zoomScale * 100);
  mainImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
  if (resetBtn) resetBtn.textContent = `${pct}%`;
  if (barResetBtn) barResetBtn.textContent = `${pct}%`;
  if (zoomSlider) zoomSlider.value = String(pct);
  if (wrap) {
    wrap.style.cursor = zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in';
  }
}

function setInlineZoom(newScale) {
  zoomScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(newScale * 100) / 100));
  applyInlineZoomTransform();
}

function applyLightboxZoomTransform() {
  const lbImg = document.getElementById('lightboxImg');
  const lbResetBtn = document.getElementById('lbZoomResetBtn');
  if (!lbImg) return;

  if (lbScale <= 1) {
    lbPanX = 0;
    lbPanY = 0;
  }

  lbImg.style.transform = `translate(${lbPanX}px, ${lbPanY}px) scale(${lbScale})`;
  if (lbResetBtn) {
    lbResetBtn.textContent = `${Math.round(lbScale * 100)}%`;
  }
}

function setLightboxZoom(newScale) {
  lbScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(newScale * 100) / 100));
  applyLightboxZoomTransform();
}

function syncLightboxView() {
  const lbModal = document.getElementById('lightboxModal');
  if (!lbModal || !lbModal.classList.contains('open')) return;
  const lbImg = document.getElementById('lightboxImg');
  const lbCounter = document.getElementById('lightboxCounter');
  if (lbImg && galleryImages[currentImgIdx]) {
    lbImg.src = galleryImages[currentImgIdx];
  }
  if (lbCounter) {
    lbCounter.textContent = `Ảnh ${currentImgIdx + 1} / ${galleryImages.length} — ${currentProduct ? currentProduct.name : ''}`;
  }
  lbScale = 1;
  lbPanX = 0;
  lbPanY = 0;
  applyLightboxZoomTransform();
}

function openLightbox() {
  const lbModal = document.getElementById('lightboxModal');
  if (!lbModal || galleryImages.length === 0) return;
  lbModal.classList.add('open');
  syncLightboxView();
}

function closeLightbox() {
  const lbModal = document.getElementById('lightboxModal');
  if (lbModal) lbModal.classList.remove('open');
}

function renderGalleryView() {
  if (galleryImages.length === 0) return;

  const mainImg = document.getElementById('mainGalleryImg');
  mainImg.src = galleryImages[currentImgIdx];
  mainImg.alt = `${currentProduct.name} - Ảnh ${currentImgIdx + 1}`;

  // Reset zoom to 100% when switching images
  zoomScale = 1;
  panX = 0;
  panY = 0;
  applyInlineZoomTransform();
  syncLightboxView();

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
    const imgs = getProductImages(prod);
    const imgCount = imgs.length;
    return `
      <article class="product-card">
        <a href="product.html?id=${encodeURIComponent(prod.id)}" class="product-media">
          ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
          <span class="photo-count-badge">📷 ${imgCount} ảnh</span>
          <img src="${imgs[0] || prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=80'" />
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

async function pushStoreDataToGitHubIfConfigured() {
  try {
    const cfg = JSON.parse(localStorage.getItem(GH_CONFIG_KEY) || '{}');
    if (!cfg.owner || !cfg.repo || !cfg.token) return;
    const apiUrl = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/data.json`;
    const branch = cfg.branch || 'main';

    let sha = undefined;
    const getRes = await fetch(`${apiUrl}?ref=${branch}&t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    if (getRes.ok) {
      const info = await getRes.json();
      sha = info.sha;
    }

    const jsonString = JSON.stringify(storeData, null, 2);
    const bytes = new TextEncoder().encode(jsonString);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Content = btoa(binary);

    await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Khách gửi yêu cầu báo giá mới (${new Date().toLocaleString('vi-VN')})`,
        content: base64Content,
        branch,
        ...(sha ? { sha } : {})
      })
    });
  } catch (e) {}
}

async function saveCustomerInquiry(newInquiry) {
  const inquiryWithId = {
    id: 'inq_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    ...newInquiry
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      storeData = { ...storeData, ...parsed };
    }
  } catch (e) {}

  if (!Array.isArray(storeData.orders)) storeData.orders = [];
  storeData.orders.unshift(inquiryWithId);
  storeData.updatedAt = Date.now();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
  } catch (e) {}

  renderAdminBar();

  if (syncChannel) {
    syncChannel.postMessage({ type: 'DATA_UPDATED', data: storeData });
  }

  try {
    fetch(`https://ntfy.sh/${INQUIRY_CLOUD_TOPIC}`, {
      method: 'POST',
      body: JSON.stringify(inquiryWithId)
    }).catch(() => {});
  } catch (e) {}

  pushStoreDataToGitHubIfConfigured();
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
    renderAdminBar();
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

  document.getElementById('prevImgBtn').addEventListener('click', e => {
    e.stopPropagation();
    if (galleryImages.length === 0) return;
    currentImgIdx = (currentImgIdx - 1 + galleryImages.length) % galleryImages.length;
    renderGalleryView();
  });

  document.getElementById('nextImgBtn').addEventListener('click', e => {
    e.stopPropagation();
    if (galleryImages.length === 0) return;
    currentImgIdx = (currentImgIdx + 1) % galleryImages.length;
    renderGalleryView();
  });

  // --- Inline Gallery Zoom & Pan Controls ---
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const zoomResetBtn = document.getElementById('zoomResetBtn');
  const openLightboxBtn = document.getElementById('openLightboxBtn');
  const barZoomInBtn = document.getElementById('barZoomInBtn');
  const barZoomOutBtn = document.getElementById('barZoomOutBtn');
  const barZoomResetBtn = document.getElementById('barZoomResetBtn');
  const barLightboxBtn = document.getElementById('barLightboxBtn');
  const zoomRangeSlider = document.getElementById('zoomRangeSlider');
  const galleryWrap = document.getElementById('galleryMainWrap');
  const mainImg = document.getElementById('mainGalleryImg');

  const handleZoomIn = e => {
    e.stopPropagation();
    setInlineZoom(zoomScale + ZOOM_STEP);
  };
  const handleZoomOut = e => {
    e.stopPropagation();
    setInlineZoom(zoomScale - ZOOM_STEP);
  };
  const handleZoomReset = e => {
    e.stopPropagation();
    zoomScale = 1;
    panX = 0;
    panY = 0;
    applyInlineZoomTransform();
  };
  const handleOpenLightbox = e => {
    e.stopPropagation();
    openLightbox();
  };

  if (zoomInBtn) zoomInBtn.addEventListener('click', handleZoomIn);
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', handleZoomOut);
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', handleZoomReset);
  if (openLightboxBtn) openLightboxBtn.addEventListener('click', handleOpenLightbox);

  if (barZoomInBtn) barZoomInBtn.addEventListener('click', handleZoomIn);
  if (barZoomOutBtn) barZoomOutBtn.addEventListener('click', handleZoomOut);
  if (barZoomResetBtn) barZoomResetBtn.addEventListener('click', handleZoomReset);
  if (barLightboxBtn) barLightboxBtn.addEventListener('click', handleOpenLightbox);

  if (zoomRangeSlider) {
    zoomRangeSlider.addEventListener('input', e => {
      const val = Number(e.target.value) || 100;
      setInlineZoom(val / 100);
    });
  }

  if (galleryWrap && mainImg) {
    let pointerMoved = false;

    // Mouse wheel zoom
    galleryWrap.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      setInlineZoom(zoomScale + delta);
    }, { passive: false });

    // Click on image (without dragging) cycles zoom: 100% -> 175% -> 250% -> 100%
    galleryWrap.addEventListener('click', e => {
      if (e.target.closest('button') || pointerMoved) return;
      if (zoomScale < 1.5) {
        setInlineZoom(1.75);
      } else if (zoomScale < 2.25) {
        setInlineZoom(2.5);
      } else {
        zoomScale = 1;
        panX = 0;
        panY = 0;
        applyInlineZoomTransform();
      }
    });

    // Mouse drag panning when zoomed in
    galleryWrap.addEventListener('mousedown', e => {
      if (e.target.closest('button')) return;
      pointerMoved = false;
      if (zoomScale <= 1) return;
      isDragging = true;
      dragStartX = e.clientX - panX;
      dragStartY = e.clientY - panY;
      mainImg.classList.add('is-dragging');
      applyInlineZoomTransform();
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      pointerMoved = true;
      panX = e.clientX - dragStartX;
      panY = e.clientY - dragStartY;
      applyInlineZoomTransform();
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      mainImg.classList.remove('is-dragging');
      applyInlineZoomTransform();
    });

    // Touch pinch-to-zoom & 1-finger pan on mobile
    let initialPinchDist = null;
    let initialZoomScale = 1;

    galleryWrap.addEventListener('touchstart', e => {
      if (e.target.closest('button')) return;
      if (e.touches.length === 2) {
        e.preventDefault();
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialZoomScale = zoomScale;
      } else if (e.touches.length === 1 && zoomScale > 1) {
        isDragging = true;
        dragStartX = e.touches[0].clientX - panX;
        dragStartY = e.touches[0].clientY - panY;
        mainImg.classList.add('is-dragging');
      }
    }, { passive: false });

    galleryWrap.addEventListener('touchmove', e => {
      if (e.touches.length === 2 && initialPinchDist) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const ratio = dist / initialPinchDist;
        setInlineZoom(initialZoomScale * ratio);
      } else if (e.touches.length === 1 && isDragging && zoomScale > 1) {
        e.preventDefault();
        panX = e.touches[0].clientX - dragStartX;
        panY = e.touches[0].clientY - dragStartY;
        applyInlineZoomTransform();
      }
    }, { passive: false });

    galleryWrap.addEventListener('touchend', () => {
      initialPinchDist = null;
      isDragging = false;
      mainImg.classList.remove('is-dragging');
    });
  }

  // --- Fullscreen Lightbox Controls ---
  const lbModal = document.getElementById('lightboxModal');
  const lbStage = document.getElementById('lightboxStage');
  const lbImg = document.getElementById('lightboxImg');
  const lbZoomInBtn = document.getElementById('lbZoomInBtn');
  const lbZoomOutBtn = document.getElementById('lbZoomOutBtn');
  const lbZoomResetBtn = document.getElementById('lbZoomResetBtn');
  const closeLbBtn = document.getElementById('closeLightboxBtn');
  const lbPrevBtn = document.getElementById('lbPrevImgBtn');
  const lbNextBtn = document.getElementById('lbNextImgBtn');

  if (lbZoomInBtn) lbZoomInBtn.addEventListener('click', () => setLightboxZoom(lbScale + ZOOM_STEP));
  if (lbZoomOutBtn) lbZoomOutBtn.addEventListener('click', () => setLightboxZoom(lbScale - ZOOM_STEP));
  if (lbZoomResetBtn) {
    lbZoomResetBtn.addEventListener('click', () => {
      lbScale = 1;
      lbPanX = 0;
      lbPanY = 0;
      applyLightboxZoomTransform();
    });
  }
  if (closeLbBtn) closeLbBtn.addEventListener('click', closeLightbox);

  if (lbPrevBtn) {
    lbPrevBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (galleryImages.length === 0) return;
      currentImgIdx = (currentImgIdx - 1 + galleryImages.length) % galleryImages.length;
      renderGalleryView();
    });
  }
  if (lbNextBtn) {
    lbNextBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (galleryImages.length === 0) return;
      currentImgIdx = (currentImgIdx + 1) % galleryImages.length;
      renderGalleryView();
    });
  }

  if (lbStage && lbImg) {
    lbStage.addEventListener('wheel', e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      setLightboxZoom(lbScale + delta);
    }, { passive: false });

    lbStage.addEventListener('dblclick', e => {
      if (e.target.closest('button')) return;
      if (lbScale !== 1) {
        lbScale = 1;
        lbPanX = 0;
        lbPanY = 0;
      } else {
        lbScale = 2.25;
      }
      applyLightboxZoomTransform();
    });

    lbStage.addEventListener('mousedown', e => {
      if (e.target.closest('button') || lbScale <= 1) return;
      lbDragging = true;
      lbDragStartX = e.clientX - lbPanX;
      lbDragStartY = e.clientY - lbPanY;
      lbImg.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', e => {
      if (!lbDragging) return;
      lbPanX = e.clientX - lbDragStartX;
      lbPanY = e.clientY - lbDragStartY;
      applyLightboxZoomTransform();
    });

    window.addEventListener('mouseup', () => {
      if (!lbDragging) return;
      lbDragging = false;
      lbImg.classList.remove('is-dragging');
    });

    // Touch pinch & drag in Lightbox
    let lbPinchDist = null;
    let lbInitScale = 1;

    lbStage.addEventListener('touchstart', e => {
      if (e.target.closest('button')) return;
      if (e.touches.length === 2) {
        e.preventDefault();
        lbPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        lbInitScale = lbScale;
      } else if (e.touches.length === 1 && lbScale > 1) {
        lbDragging = true;
        lbDragStartX = e.touches[0].clientX - lbPanX;
        lbDragStartY = e.touches[0].clientY - lbPanY;
        lbImg.classList.add('is-dragging');
      }
    }, { passive: false });

    lbStage.addEventListener('touchmove', e => {
      if (e.touches.length === 2 && lbPinchDist) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        setLightboxZoom(lbInitScale * (dist / lbPinchDist));
      } else if (e.touches.length === 1 && lbDragging && lbScale > 1) {
        e.preventDefault();
        lbPanX = e.touches[0].clientX - lbDragStartX;
        lbPanY = e.touches[0].clientY - lbDragStartY;
        applyLightboxZoomTransform();
      }
    }, { passive: false });

    lbStage.addEventListener('touchend', () => {
      lbPinchDist = null;
      lbDragging = false;
      lbImg.classList.remove('is-dragging');
    });
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lbModal && lbModal.classList.contains('open')) {
      closeLightbox();
    }
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
    showToast('✅ Đã gửi yêu cầu báo giá mẫu này! Đã chuyển về hệ thống Quản trị.');
  });
});
