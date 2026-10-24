const STORAGE_KEY = 'MOC_AN_PLASTIC_CATALOG_V3';
const ADMIN_AUTH_SESSION = 'MOC_AN_ADMIN_SESSION_V2';
const GH_CONFIG_KEY = 'MOC_AN_GITHUB_SYNC_CONFIG';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('moc_an_live_sync') : null;

const DEFAULT_DATA = {
  adminAuth: {
    username: 'admin',
    password: '123456'
  },
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

let storeData = structuredClone(DEFAULT_DATA);
let ghConfig = loadGhConfig();

function loadGhConfig() {
  try {
    const raw = localStorage.getItem(GH_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  let autoOwner = 'ngclaam4444';
  let autoRepo = 'noithattuankhai';
  if (location.hostname.endsWith('.github.io')) {
    autoOwner = location.hostname.replace('.github.io', '');
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length > 0 && parts[0] !== 'admin.html') {
      autoRepo = parts[0];
    }
  }
  return { owner: autoOwner, repo: autoRepo, branch: 'main', token: '' };
}

function getProductImages(prod) {
  if (Array.isArray(prod.images) && prod.images.filter(Boolean).length > 0) {
    return prod.images.filter(Boolean);
  }
  return [prod.image].filter(Boolean);
}

async function initAdminData() {
  const localRaw = localStorage.getItem(STORAGE_KEY);
  if (localRaw) {
    try {
      storeData = { ...DEFAULT_DATA, ...JSON.parse(localRaw) };
    } catch (e) {}
  }

  try {
    const res = await fetch(`data.json?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const remoteData = await res.json();
      const localUpdated = storeData.updatedAt || 0;
      const remoteUpdated = remoteData.updatedAt || 0;
      if (!localRaw || remoteUpdated >= localUpdated) {
        storeData = { ...DEFAULT_DATA, ...remoteData };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
      }
    }
  } catch (err) {}

  populateAllFields();
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
  }, 3500);
}

function markUnsaved() {
  const badge = document.getElementById('syncStatusBadge');
  badge.textContent = '🟡 Có thay đổi chưa bấm Lưu';
  badge.classList.add('unsaved');
}

function markSaved(msg = '🟢 Đã đồng bộ dữ liệu') {
  const badge = document.getElementById('syncStatusBadge');
  badge.textContent = msg;
  badge.classList.remove('unsaved');
}

async function saveAndPublishAll(triggerMsg = '✅ Đã lưu và cập nhật ngay lên trang web!') {
  storeData.brand = {
    name: document.getElementById('cfgBrandName').value.trim() || 'TUẤN KHẢI',
    tagline: document.getElementById('cfgBrandTagline').value.trim(),
    accentColor: document.getElementById('cfgAccentColor').value,
    topbarPromo: document.getElementById('cfgTopbarPromo').value.trim(),
    logoUrl: document.getElementById('cfgLogoUrl').value.trim(),
    heroBg: document.getElementById('cfgHeroBg').value.trim(),
    heroBadge: document.getElementById('cfgHeroBadge').value.trim(),
    heroTitle: document.getElementById('cfgHeroTitle').value.trim(),
    heroSubtitle: document.getElementById('cfgHeroSubtitle').value.trim(),
    storyImg: document.getElementById('cfgStoryImg').value.trim(),
    storyTitle: document.getElementById('cfgStoryTitle').value.trim(),
    storyP1: document.getElementById('cfgStoryP1').value.trim(),
    storyP2: document.getElementById('cfgStoryP2').value.trim()
  };

  storeData.contact = {
    address: document.getElementById('cfgAddress').value.trim(),
    phone: document.getElementById('cfgPhone').value.trim(),
    email: document.getElementById('cfgEmail').value.trim(),
    hours: document.getElementById('cfgHours').value.trim(),
    facebook: document.getElementById('cfgFacebook').value.trim(),
    zalo: document.getElementById('cfgZalo').value.trim(),
    instagram: document.getElementById('cfgInstagram').value.trim()
  };

  const newUser = document.getElementById('cfgAdminUser').value.trim();
  const newPass = document.getElementById('cfgAdminPass').value.trim();
  if (newUser && newPass) {
    storeData.adminAuth = { username: newUser, password: newPass };
  }

  storeData.updatedAt = Date.now();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
    if (syncChannel) {
      syncChannel.postMessage({ type: 'DATA_UPDATED', data: storeData });
    }
  } catch (e) {
    showToast('⚠️ Ảnh tải lên quá nặng, vui lòng chọn ảnh dung lượng nhỏ hơn!');
    return;
  }

  populateAllFields();

  if (ghConfig.owner && ghConfig.repo && ghConfig.token) {
    markSaved('⏳ Đang đồng bộ lên GitHub...');
    const ok = await pushDataJsonToGitHub();
    if (ok) {
      markSaved('🟢 Đã lưu & đồng bộ trực tiếp lên GitHub!');
      showToast('🚀 Đã lưu và đẩy trực tiếp lên GitHub Pages thành công!');
      return;
    }
  }

  markSaved('🟢 Đã lưu & cập nhật trực tiếp');
  showToast(triggerMsg);
}

async function pushDataJsonToGitHub() {
  const { owner, repo, branch, token } = ghConfig;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/data.json`;

  try {
    let sha = undefined;
    const getRes = await fetch(`${apiUrl}?ref=${branch || 'main'}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    if (getRes.ok) {
      const fileInfo = await getRes.json();
      sha = fileInfo.sha;
    }

    const jsonString = JSON.stringify(storeData, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Cập nhật Catalog Nội Thất Nhựa từ Admin Portal (${new Date().toLocaleString('vi-VN')})`,
        content: base64Content,
        branch: branch || 'main',
        ...(sha ? { sha } : {})
      })
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      showToast(`⚠️ Lỗi GitHub API: ${errData.message || 'Kiểm tra lại Token/Repo'}`);
      return false;
    }
    return true;
  } catch (err) {
    showToast('⚠️ Không thể kết nối GitHub API, đã lưu trên trình duyệt.');
    return false;
  }
}

function populateAllFields() {
  const { brand, contact, adminAuth, products, orders } = storeData;

  document.getElementById('sidebarBrandTitle').textContent = brand.name || 'TUẤN KHẢI';

  const orderList = orders || [];
  const ordersCount = orderList.filter(o => o.type === 'order').length;
  const inqCount = orderList.filter(o => o.type !== 'order').length;

  document.getElementById('statProducts').textContent = (products || []).length;
  document.getElementById('statOrders').textContent = ordersCount;
  document.getElementById('statInquiries').textContent = inqCount;
  document.getElementById('navOrderBadge').textContent = orderList.length;

  document.getElementById('cfgBrandName').value = brand.name || '';
  document.getElementById('cfgBrandTagline').value = brand.tagline || '';
  document.getElementById('cfgAccentColor').value = brand.accentColor || '#2C5E6E';
  document.getElementById('cfgTopbarPromo').value = brand.topbarPromo || '';
  document.getElementById('cfgLogoUrl').value = brand.logoUrl || '';
  document.getElementById('prevLogo').src = brand.logoUrl || 'https://placehold.co/200x80/E4F0F4/2C5E6E?text=LOGO+CHU';

  document.getElementById('cfgHeroBg').value = brand.heroBg || '';
  document.getElementById('prevHeroBg').src = brand.heroBg || '';
  document.getElementById('cfgHeroBadge').value = brand.heroBadge || '';
  document.getElementById('cfgHeroTitle').value = brand.heroTitle || '';
  document.getElementById('cfgHeroSubtitle').value = brand.heroSubtitle || '';

  document.getElementById('cfgStoryImg').value = brand.storyImg || '';
  document.getElementById('prevStoryImg').src = brand.storyImg || '';
  document.getElementById('cfgStoryTitle').value = brand.storyTitle || '';
  document.getElementById('cfgStoryP1').value = brand.storyP1 || '';
  document.getElementById('cfgStoryP2').value = brand.storyP2 || '';

  document.getElementById('cfgAddress').value = contact.address || '';
  document.getElementById('cfgPhone').value = contact.phone || '';
  document.getElementById('cfgEmail').value = contact.email || '';
  document.getElementById('cfgHours').value = contact.hours || '';
  document.getElementById('cfgFacebook').value = contact.facebook || '';
  document.getElementById('cfgZalo').value = contact.zalo || '';
  document.getElementById('cfgInstagram').value = contact.instagram || '';

  document.getElementById('cfgAdminUser').value = (adminAuth && adminAuth.username) || 'admin';
  document.getElementById('cfgAdminPass').value = (adminAuth && adminAuth.password) || '123456';

  document.getElementById('ghOwner').value = ghConfig.owner || '';
  document.getElementById('ghRepo').value = ghConfig.repo || '';
  document.getElementById('ghBranch').value = ghConfig.branch || 'main';
  document.getElementById('ghToken').value = ghConfig.token || '';

  renderProductsTable();
  renderOrdersList();
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  const list = storeData.products || [];

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 30px; color: var(--text-muted);">Chưa có mẫu sản phẩm nào. Hãy bấm "+ Thêm Mẫu Mới".</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(p => {
    const imgs = getProductImages(p);
    return `
      <tr>
        <td>
          <div class="prod-cell">
            <img src="${imgs[0] || p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80'" />
            <div>
              <strong style="display: block; font-size: 0.95rem;">${p.name}</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${p.material || ''}</span>
              <div style="margin-top: 4px;">
                <a href="product.html?id=${encodeURIComponent(p.id)}" target="_blank" style="font-size: 0.75rem; color: var(--accent); font-weight: 600;">Xem trang mẫu ↗</a>
              </div>
            </div>
          </div>
        </td>
        <td><span style="background: var(--accent-soft); color: var(--accent); padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 600;">${p.category}</span></td>
        <td><span style="background: #EBF7F0; color: var(--success); padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 600;">📷 ${imgs.length} ảnh góc chụp</span></td>
        <td>${p.badge ? `<span style="background:#1E1610; color:#fff; padding: 3px 9px; border-radius:999px; font-size:0.75rem;">${p.badge}</span>` : '—'}</td>
        <td style="text-align: right; white-space: nowrap;">
          <button class="btn btn-secondary btn-sm" data-edit="${p.id}">✏️ Sửa (${imgs.length} ảnh)</button>
          <button class="btn btn-danger btn-sm" data-del="${p.id}">🗑️ Xoá</button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => openProductModal(btn.dataset.edit));
  });

  tbody.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.del;
      const prod = storeData.products.find(x => x.id === id);
      if (!prod) return;
      if (!confirm(`Xoá mẫu "${prod.name}"?`)) return;
      storeData.products = storeData.products.filter(x => x.id !== id);
      saveAndPublishAll('🗑️ Đã xoá mẫu và cập nhật lên Catalog!');
    });
  });
}

function renderOrdersList() {
  const container = document.getElementById('ordersContainer');
  const orders = storeData.orders || [];

  if (orders.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); padding: 20px 0; text-align: center;">Chưa có yêu cầu báo giá hoặc khảo sát nào từ khách hàng.</p>`;
    return;
  }

  container.innerHTML = orders.map((ord, idx) => `
    <div style="padding: 16px; border: 1px solid var(--border); border-radius: 10px; margin-bottom: 12px; background: #FAF8F5;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
        <strong style="font-size: 0.98rem;">
          📐 Yêu cầu báo giá / tư vấn — ${ord.name}
          (<a href="tel:${ord.phone}" style="color: var(--accent);">${ord.phone}</a>)
        </strong>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${ord.time}</span>
      </div>
      <p style="font-size: 0.9rem; margin-bottom: 12px;">${ord.details}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; margin-right: 6px;">Trạng thái:</label>
          <select data-ord-status="${idx}" style="padding: 6px 12px; border-radius: 999px; border: 1px solid var(--border); font-weight: 600;">
            <option value="Chờ tư vấn" ${(ord.status || 'Chờ tư vấn') === 'Chờ tư vấn' ? 'selected' : ''}>⏳ Chờ tư vấn</option>
            <option value="Đã báo giá" ${ord.status === 'Đã báo giá' ? 'selected' : ''}>📞 Đã báo giá</option>
            <option value="Đang khảo sát đo đạc" ${ord.status === 'Đang khảo sát đo đạc' ? 'selected' : ''}>📐 Đang khảo sát đo đạc</option>
            <option value="Đã chốt thi công" ${ord.status === 'Đã chốt thi công' ? 'selected' : ''}>✅ Đã chốt thi công</option>
            <option value="Đã huỷ" ${ord.status === 'Đã huỷ' ? 'selected' : ''}>❌ Đã huỷ</option>
          </select>
        </div>
        <button class="btn btn-danger btn-sm" data-ord-del="${idx}">🗑️ Xoá yêu cầu</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('[data-ord-status]').forEach(sel => {
    sel.addEventListener('change', () => {
      const idx = Number(sel.dataset.ordStatus);
      storeData.orders[idx].status = sel.value;
      saveAndPublishAll(`📦 Đã đổi trạng thái thành: ${sel.value}`);
    });
  });

  container.querySelectorAll('[data-ord-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.ordDel);
      storeData.orders.splice(idx, 1);
      saveAndPublishAll('🗑️ Đã xoá yêu cầu!');
    });
  });
}

function openProductModal(productId = null) {
  const modal = document.getElementById('prodModal');
  const form = document.getElementById('prodForm');
  form.reset();

  const placeholderImg = 'https://placehold.co/160x120/E4F0F4/2C5E6E?text=Trong';

  if (productId) {
    const p = storeData.products.find(x => x.id === productId);
    if (!p) return;
    const imgs = getProductImages(p);

    document.getElementById('prodModalTitle').textContent = `✏️ Sửa Mẫu: ${p.name}`;
    document.getElementById('prodId').value = p.id;
    document.getElementById('prodName').value = p.name;
    document.getElementById('prodCategory').value = p.category;
    document.getElementById('prodMaterial').value = p.material || '';
    document.getElementById('prodBadge').value = p.badge || '';
    document.getElementById('prodDesc').value = p.description || '';

    for (let i = 1; i <= 5; i++) {
      const val = imgs[i - 1] || '';
      document.getElementById(`prodImage${i}`).value = val;
      document.getElementById(`prevProdImg${i}`).src = val || placeholderImg;
    }
  } else {
    document.getElementById('prodModalTitle').textContent = '➕ Thêm Mẫu Nội Thất Nhựa Mới (4–5 ảnh)';
    document.getElementById('prodId').value = '';
    for (let i = 1; i <= 5; i++) {
      document.getElementById(`prodImage${i}`).value = '';
      document.getElementById(`prevProdImg${i}`).src = placeholderImg;
    }
  }

  modal.classList.add('open');
}

function closeProductModal() {
  document.getElementById('prodModal').classList.remove('open');
}

function compressImageFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_W = 1000;
        let w = img.width;
        let h = img.height;
        if (w > MAX_W) {
          h = Math.round((h * MAX_W) / w);
          w = MAX_W;
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function bindImagePicker(fileInputId, textInputId, previewImgId) {
  const fileEl = document.getElementById(fileInputId);
  const textEl = document.getElementById(textInputId);
  const prevEl = document.getElementById(previewImgId);
  if (!fileEl || !textEl) return;

  textEl.addEventListener('input', () => {
    if (prevEl) prevEl.src = textEl.value.trim() || 'https://placehold.co/160x120/E4F0F4/2C5E6E?text=Trong';
    markUnsaved();
  });

  fileEl.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await compressImageFile(file);
    textEl.value = dataUrl;
    if (prevEl) prevEl.src = dataUrl;
    markUnsaved();
    showToast('📸 Đã nạp ảnh! Bấm Lưu để áp dụng.');
  });
}

if (syncChannel) {
  syncChannel.onmessage = ev => {
    if (ev.data && ev.data.type === 'DATA_UPDATED') {
      storeData = ev.data.data;
      populateAllFields();
      showToast('🔔 Có yêu cầu báo giá / tư vấn mới từ khách hàng!');
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  initAdminData();

  if (localStorage.getItem(ADMIN_AUTH_SESSION) === 'true') {
    document.getElementById('loginScreen').classList.add('hidden');
  }

  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const u = document.getElementById('loginUser').value.trim();
    const p = document.getElementById('loginPass').value.trim();
    const validU = (storeData.adminAuth && storeData.adminAuth.username) || 'admin';
    const validP = (storeData.adminAuth && storeData.adminAuth.password) || '123456';

    if (u === validU && p === validP) {
      localStorage.setItem(ADMIN_AUTH_SESSION, 'true');
      document.getElementById('loginScreen').classList.add('hidden');
      showToast('👑 Chào mừng Quản trị viên!');
    } else {
      document.getElementById('loginErr').style.display = 'block';
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem(ADMIN_AUTH_SESSION);
    document.getElementById('loginScreen').classList.remove('hidden');
  });

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  document.getElementById('masterSaveBtn').addEventListener('click', () => {
    saveAndPublishAll();
  });

  document.querySelectorAll('#pane-brand input, #pane-brand textarea, #pane-contact input, #pane-cloud input').forEach(inp => {
    inp.addEventListener('input', markUnsaved);
  });

  bindImagePicker('fileLogo', 'cfgLogoUrl', 'prevLogo');
  bindImagePicker('fileHeroBg', 'cfgHeroBg', 'prevHeroBg');
  bindImagePicker('fileStoryImg', 'cfgStoryImg', 'prevStoryImg');

  for (let i = 1; i <= 5; i++) {
    bindImagePicker(`fileProdImg${i}`, `prodImage${i}`, `prevProdImg${i}`);
  }

  const multiInput = document.getElementById('multiProdFiles');
  if (multiInput) {
    multiInput.addEventListener('change', async e => {
      const files = Array.from(e.target.files || []).slice(0, 5);
      if (files.length === 0) return;
      for (let i = 0; i < files.length; i++) {
        const dataUrl = await compressImageFile(files[i]);
        const slotIdx = i + 1;
        document.getElementById(`prodImage${slotIdx}`).value = dataUrl;
        document.getElementById(`prevProdImg${slotIdx}`).src = dataUrl;
      }
      showToast(`📸 Đã nạp nhanh ${files.length} ảnh vào các khung!`);
    });
  }

  document.getElementById('clearLogoBtn').addEventListener('click', () => {
    document.getElementById('cfgLogoUrl').value = '';
    document.getElementById('prevLogo').src = 'https://placehold.co/200x80/E4F0F4/2C5E6E?text=LOGO+CHU';
    saveAndPublishAll('🏷️ Đã chuyển sang dùng Logo chữ!');
  });

  document.getElementById('openAddProdModalBtn').addEventListener('click', () => openProductModal(null));
  document.getElementById('closeProdModalBtn').addEventListener('click', closeProductModal);
  document.getElementById('cancelProdModalBtn').addEventListener('click', closeProductModal);

  document.getElementById('prodForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('prodId').value;
    const collectedImages = [];
    for (let i = 1; i <= 5; i++) {
      const val = document.getElementById(`prodImage${i}`).value.trim();
      if (val) collectedImages.push(val);
    }

    const item = {
      id: id || 'p_' + Date.now(),
      name: document.getElementById('prodName').value.trim(),
      category: document.getElementById('prodCategory').value,
      material: document.getElementById('prodMaterial').value.trim(),
      badge: document.getElementById('prodBadge').value.trim(),
      image: collectedImages[0] || '',
      images: collectedImages,
      description: document.getElementById('prodDesc').value.trim()
    };

    if (id) {
      const idx = storeData.products.findIndex(x => x.id === id);
      if (idx !== -1) storeData.products[idx] = item;
    } else {
      storeData.products.unshift(item);
    }

    closeProductModal();
    saveAndPublishAll(`✅ Đã lưu mẫu (${collectedImages.length} ảnh) và cập nhật lên Catalog!`);
  });

  document.getElementById('saveGhConfigBtn').addEventListener('click', () => {
    ghConfig = {
      owner: document.getElementById('ghOwner').value.trim(),
      repo: document.getElementById('ghRepo').value.trim(),
      branch: document.getElementById('ghBranch').value.trim() || 'main',
      token: document.getElementById('ghToken').value.trim()
    };
    localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(ghConfig));
    saveAndPublishAll('🔗 Đã lưu kết nối GitHub và đồng bộ dữ liệu!');
  });

  document.getElementById('resetDefaultBtn').addEventListener('click', () => {
    if (!confirm('Bạn có chắc muốn khôi phục toàn bộ mẫu sản phẩm, logo và giao diện về mặc định ban đầu?')) return;
    storeData = structuredClone(DEFAULT_DATA);
    populateAllFields();
    saveAndPublishAll('🔄 Đã khôi phục dữ liệu mặc định!');
  });
});
