const STORAGE_KEY = 'MOC_AN_PLASTIC_CATALOG_V3';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('moc_an_live_sync') : null;

const FALLBACK_DATA = {
  brand: {
    name: 'TUẤN KHẢI',
    tagline: 'NỘI THẤT NHỰA CAO CẤP',
    logoUrl: '',
    accentColor: '#2C5E6E',
    topbarPromo: '✨ Miễn phí khảo sát đo đạc tận nơi & thiết kế 3D cho Tủ quần áo, Tủ bếp, Giường, Tủ Tivi, Kệ nhựa cao cấp',
    heroBg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    heroBadge: 'CATALOG NỘI THẤT NHỰA CAO CẤP 2026',
    heroTitle: 'Giải Pháp Nội Thất Nhựa Cao Cấp — Chống Nước, Bền Đẹp Vượt Thời Gian',
    heroSubtitle: 'Chuyên thiết kế, sản xuất và thi công theo yêu cầu: Tủ quần áo kịch trần, Tủ bếp chống nước tuyệt đối, Giường ngủ, Tủ tivi và Kệ trang trí từ nhựa Ecoplast, Picomat, ChinHuei chính hãng.',
    storyImg: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
    storyTitle: 'Vì Sao Nội Thất Nhựa Cao Cấp Là Lựa Chọn Hoàn Hảo Cho Ngôi Nhà Hiện Đại?',
    storyP1: 'Khác biệt hoàn toàn với các dòng nhựa thông thường trước đây, nội thất nhựa cao cấp thế hệ mới (Ecoplast, Picomat, ChinHuei Đài Loan dày 2 lớp) sở hữu kết cấu gân chịu lực siêu cứng cáp, bề mặt phủ vân gỗ hoặc Acrylic bóng gương sang trọng không thua kém gỗ tự nhiên hay gỗ công nghiệp cao cấp.',
    storyP2: 'Đặc biệt phù hợp với khí hậu Việt Nam: Chống nước 100%, tuyệt đối không ẩm mốc, không mối mọt, không cong vênh và an toàn tuyệt đối cho sức khoẻ gia đình. Mỗi sản phẩm đều được khảo sát, đo đạc và thiết kế may đo riêng cho từng không gian.'
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
      price: 12500000,
      oldPrice: 0,
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
      price: 18500000,
      oldPrice: 0,
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
      price: 5800000,
      oldPrice: 0,
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
      price: 6900000,
      oldPrice: 0,
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
      price: 8900000,
      oldPrice: 0,
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
      price: 4500000,
      oldPrice: 0,
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
let activeCategory = 'Tất cả';
let searchQuery = '';
let sortMode = 'featured';

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

function saveCustomerInquiry(newInquiry) {
  if (!Array.isArray(storeData.orders)) storeData.orders = [];
  storeData.orders.unshift(newInquiry);
  storeData.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
  if (syncChannel) {
    syncChannel.postMessage({ type: 'DATA_UPDATED', data: storeData });
  }
}

function formatPriceDisplay(amount) {
  const num = Number(amount) || 0;
  if (num <= 0) return 'Liên hệ báo giá';
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

  document.documentElement.style.setProperty('--accent-primary', brand.accentColor || '#2C5E6E');

  document.getElementById('pageTitle').textContent = `${brand.name} — ${brand.tagline}`;
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

  document.getElementById('footerBrandName').textContent = `${brand.name} — ${brand.tagline}`;
  document.getElementById('footerAddress').textContent = contact.address;
  document.getElementById('footerPhone').textContent = contact.phone;
  document.getElementById('footerEmail').textContent = contact.email;
  document.getElementById('copyrightBrand').textContent = brand.name;
}

function renderCategories() {
  const defaultCats = ['Tất cả', 'Tủ quần áo', 'Tủ bếp', 'Giường ngủ', 'Tủ tivi', 'Kệ trang trí'];
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

  if (sortMode === 'name-asc') {
    list.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'vi'));
  } else if (sortMode === 'newest') {
    list.reverse();
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Không tìm thấy mẫu nội thất phù hợp</h3>
        <p style="color: var(--text-secondary); margin-bottom: 16px;">Hãy thử tìm với từ khoá khác hoặc chọn danh mục "Tất cả".</p>
        <button class="btn btn-secondary btn-sm" id="resetFilterBtn">Xem toàn bộ Catalog</button>
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
          ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
          <span class="photo-count-badge">📷 ${imgs.length} ảnh thực tế</span>
          <img src="${imgs[0] || prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=80'" />
          <div class="product-quick-actions">
            <span class="quick-btn">👁️ Xem trọn bộ ${imgs.length} ảnh</span>
          </div>
        </a>

        <div class="product-body">
          <span class="product-category">${prod.category}</span>
          <a href="${detailUrl}">
            <h3 class="product-title">${prod.name}</h3>
          </a>
          <p class="product-meta">${prod.material || 'Nhựa cao cấp chống nước 100%'}</p>

          <div class="product-footer">
            <div class="price-wrap">
              <span style="font-size: 0.82rem; font-weight: 600; color: var(--accent-primary);">📐 Đóng theo kích thước yêu cầu</span>
            </div>
            <a href="${detailUrl}" class="btn btn-primary btn-sm">Xem Chi Tiết →</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
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
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initStoreData();

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

  document.getElementById('consultationForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('inqName').value.trim();
    const phone = document.getElementById('inqPhone').value.trim();
    const area = document.getElementById('inqEmail').value.trim();
    const service = document.getElementById('inqService').value;
    const msg = document.getElementById('inqMessage').value.trim();

    saveCustomerInquiry({
      type: 'inquiry',
      status: 'Chờ tư vấn',
      name,
      phone,
      time: new Date().toLocaleString('vi-VN'),
      details: `Hạng mục: ${service} ${area ? '| Khu vực: ' + area : ''} | Yêu cầu: ${msg || 'Cần khảo sát đo đạc & báo giá'}`
    });

    e.target.reset();
    showToast('✅ Đã gửi yêu cầu báo giá! Kỹ thuật viên sẽ liên hệ với bạn sớm nhất.');
  });
});
