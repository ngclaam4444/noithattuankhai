const STORAGE_KEY = 'MOC_AN_PLASTIC_CATALOG_V3';
const ADMIN_AUTH_SESSION = 'MOC_AN_ADMIN_SESSION_V2';
const GH_CONFIG_KEY = 'MOC_AN_GITHUB_SYNC_CONFIG';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('moc_an_live_sync') : null;

const DEFAULT_LOGO_SVG = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232C5E6E'/%3E%3Cstop offset='100%25' stop-color='%2316323B'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='26' fill='url(%23g)'/%3E%3Crect x='7' y='7' width='106' height='106' rx='20' fill='none' stroke='%23C89B65' stroke-width='2.5' stroke-opacity='0.75'/%3E%3Ctext x='60' y='73' font-family='Georgia,serif' font-size='46' font-weight='bold' fill='%23FFFFFF' text-anchor='middle' letter-spacing='1'%3ETK%3C/text%3E%3Cline x1='34' y1='88' x2='86' y2='88' stroke='%23C89B65' stroke-width='3.5' stroke-linecap='round'/%3E%3C/svg%3E";

const DEFAULT_DATA = {
  updatedAt: 1761280000000,
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

let storeData = structuredClone(DEFAULT_DATA);
let ghConfig = loadGhConfig();

function loadGhConfig() {
  try {
    const raw = localStorage.getItem(GH_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        owner: parsed.owner || 'ngclaam4444',
        repo: parsed.repo || 'noithattuankhai',
        branch: parsed.branch || 'main',
        token: parsed.token || ''
      };
    }
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

async function fetchRemoteCatalogData() {
  const owner = ghConfig.owner || 'ngclaam4444';
  const repo = ghConfig.repo || 'noithattuankhai';
  const branch = ghConfig.branch || 'main';

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

async function initAdminData() {
  let localParsed = null;
  const localRaw = localStorage.getItem(STORAGE_KEY);
  if (localRaw) {
    try {
      localParsed = JSON.parse(localRaw);
      storeData = {
        ...DEFAULT_DATA,
        ...localParsed,
        brand: { ...DEFAULT_DATA.brand, ...(localParsed.brand || {}) },
        contact: { ...DEFAULT_DATA.contact, ...(localParsed.contact || {}) }
      };
    } catch (e) {}
  }

  populateAllFields();

  const remoteData = await fetchRemoteCatalogData();
  if (remoteData) {
    const localUpdated = (localParsed && localParsed.updatedAt) || 0;
    const remoteUpdated = remoteData.updatedAt || 0;
    if (!localParsed || remoteUpdated > localUpdated) {
      storeData = {
        ...DEFAULT_DATA,
        ...remoteData,
        brand: { ...DEFAULT_DATA.brand, ...(remoteData.brand || {}) },
        contact: { ...DEFAULT_DATA.contact, ...(remoteData.contact || {}) }
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
      } catch (e) {}
      populateAllFields();
    }
  }

  handleUrlActions();
}

function handleUrlActions() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  const editId = params.get('edit');
  const action = params.get('action');

  if (tab) {
    switchTab(tab);
  }
  if (editId) {
    switchTab('pane-products');
    setTimeout(() => openProductModal(editId), 100);
  } else if (action === 'add') {
    switchTab('pane-products');
    setTimeout(() => openProductModal(null), 100);
  }
}

function switchTab(tabId) {
  const targetPane = document.getElementById(tabId);
  if (!targetPane) return;
  document.querySelectorAll('.nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === tabId);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

function markUnsaved() {
  const badge = document.getElementById('syncStatusBadge');
  badge.textContent = '🟡 Có thay đổi chưa bấm Lưu';
  badge.classList.add('unsaved');
  updateLiveHeaderPreview();
}

function markSaved(msg = '🟢 Đã đồng bộ dữ liệu') {
  const badge = document.getElementById('syncStatusBadge');
  badge.textContent = msg;
  badge.classList.remove('unsaved');
}

function updateCloudPillStatus() {
  const pill = document.getElementById('ghStatusPill');
  if (!pill) return;
  if (ghConfig.owner && ghConfig.repo && ghConfig.token) {
    pill.textContent = `☁️ Đã kết nối GitHub (${ghConfig.owner}/${ghConfig.repo})`;
    pill.classList.add('connected');
  } else {
    pill.textContent = '⚠️ Chưa nhập GitHub Token (Bấm để kết nối đồng bộ sang Mobile)';
    pill.classList.remove('connected');
  }
}

function updateLiveHeaderPreview() {
  const nameVal = document.getElementById('cfgBrandName').value.trim() || 'TUẤN KHẢI';
  const subVal = document.getElementById('cfgBrandTagline').value.trim() || 'NỘI THẤT NHỰA CAO CẤP';
  const rawLogo = document.getElementById('cfgLogoUrl').value.trim();
  const logoSrc = rawLogo !== '' ? rawLogo : DEFAULT_LOGO_SVG;
  const accentVal = document.getElementById('cfgAccentColor').value || '#2C5E6E';

  document.documentElement.style.setProperty('--accent', accentVal);

  ['prevLogoDesktop', 'prevLogoMobile', 'sidebarLogoImg', 'loginLogoImg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.src = logoSrc;
      el.onerror = () => { el.src = DEFAULT_LOGO_SVG; };
    }
  });

  document.getElementById('prevNameDesktop').textContent = nameVal;
  document.getElementById('prevSubDesktop').textContent = subVal;
  document.getElementById('prevNameMobile').textContent = nameVal;
  document.getElementById('prevSubMobile').textContent = subVal;
  document.getElementById('sidebarBrandTitle').textContent = nameVal;
  document.getElementById('sidebarBrandTagline').textContent = subVal;
}

function collectFormIntoStoreData() {
  storeData.brand = {
    name: document.getElementById('cfgBrandName').value.trim() || 'TUẤN KHẢI',
    tagline: document.getElementById('cfgBrandTagline').value.trim() || 'NỘI THẤT NHỰA CAO CẤP',
    accentColor: document.getElementById('cfgAccentColor').value || '#2C5E6E',
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
}

async function saveAndPublishAll(triggerMsg = '✅ Đã lưu và đồng bộ ngay sang trang Catalog!') {
  collectFormIntoStoreData();

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
    markSaved('⏳ Đang đẩy dữ liệu lên GitHub...');
    const ok = await pushDataJsonToGitHub();
    if (ok) {
      markSaved('🟢 Đã đồng bộ lên GitHub (PC & Mobile)');
      showToast('🚀 Đã lưu và cập nhật trực tiếp lên GitHub cho cả Web & Mobile!');
      return;
    }
  }

  markSaved('🟢 Đã lưu trên trình duyệt này');
  showToast(triggerMsg);
}

async function pushDataJsonToGitHub() {
  const { owner, repo, branch, token } = ghConfig;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/data.json`;

  try {
    let sha = undefined;
    const getRes = await fetch(`${apiUrl}?ref=${branch || 'main'}&t=${Date.now()}`, {
      cache: 'no-store',
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
    const bytes = new TextEncoder().encode(jsonString);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Content = btoa(binary);

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Cập nhật Catalog Nội Thất Nhựa từ Admin (${new Date().toLocaleString('vi-VN')})`,
        content: base64Content,
        branch: branch || 'main',
        ...(sha ? { sha } : {})
      })
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      showToast(`⚠️ Lỗi GitHub API: ${errData.message || 'Kiểm tra lại mã Token'}`);
      return false;
    }
    return true;
  } catch (err) {
    showToast('⚠️ Không thể kết nối GitHub API, đã lưu trên trình duyệt.');
    return false;
  }
}

function exportDataJsonFile() {
  collectFormIntoStoreData();
  const jsonString = JSON.stringify(storeData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📥 Đã tải xuống file data.json mới nhất!');
}

function populateAllFields() {
  const { brand, contact, adminAuth, products, orders } = storeData;

  const orderList = orders || [];
  const cats = new Set((products || []).map(p => p.category).filter(Boolean));

  document.getElementById('statProducts').textContent = (products || []).length;
  document.getElementById('statCategories').textContent = Math.max(5, cats.size);
  document.getElementById('statInquiries').textContent = orderList.length;
  document.getElementById('navOrderBadge').textContent = orderList.length;

  document.getElementById('cfgBrandName').value = brand.name || 'TUẤN KHẢI';
  document.getElementById('cfgBrandTagline').value = brand.tagline || 'NỘI THẤT NHỰA CAO CẤP';
  document.getElementById('cfgAccentColor').value = brand.accentColor || '#2C5E6E';
  document.getElementById('cfgTopbarPromo').value = brand.topbarPromo || '';
  document.getElementById('cfgLogoUrl').value = brand.logoUrl || '';

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

  document.getElementById('ghOwner').value = ghConfig.owner || 'ngclaam4444';
  document.getElementById('ghRepo').value = ghConfig.repo || 'noithattuankhai';
  document.getElementById('ghBranch').value = ghConfig.branch || 'main';
  document.getElementById('ghToken').value = ghConfig.token || '';

  updateCloudPillStatus();
  updateLiveHeaderPreview();
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
                <a href="product.html?id=${encodeURIComponent(p.id)}" style="font-size: 0.76rem; color: var(--accent); font-weight: 600;">👁️ Xem trang chi tiết mẫu →</a>
              </div>
            </div>
          </div>
        </td>
        <td><span style="background: var(--accent-soft); color: var(--accent); padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 600;">${p.category}</span></td>
        <td><span style="background: #EBF7F0; color: var(--success); padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 600;">📷 ${imgs.length} ảnh góc chụp</span></td>
        <td>${p.badge ? `<span style="background:#14252E; color:#fff; padding: 3px 9px; border-radius:999px; font-size:0.75rem;">${p.badge}</span>` : '—'}</td>
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
    <div style="padding: 16px; border: 1px solid var(--border); border-radius: 10px; margin-bottom: 12px; background: #F8FAFC;">
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

function compressImageFile(file, isLogo = false) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_W = isLogo ? 400 : 1000;
        let w = img.width;
        let h = img.height;
        if (w > MAX_W) {
          h = Math.round((h * MAX_W) / w);
          w = MAX_W;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        // Preserve PNG transparency for Logo if PNG
        if (isLogo && file.type === 'image/png') {
          resolve(canvas.toDataURL('image/png'));
        } else {
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function bindImagePicker(fileInputId, textInputId, previewImgId, isLogo = false) {
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
    const dataUrl = await compressImageFile(file, isLogo);
    textEl.value = dataUrl;
    if (prevEl) prevEl.src = dataUrl;
    markUnsaved();
    showToast('📸 Đã nạp ảnh! Bấm Lưu để áp dụng lên web.');
  });
}

if (syncChannel) {
  syncChannel.onmessage = ev => {
    if (ev.data && ev.data.type === 'DATA_UPDATED') {
      storeData = ev.data.data;
      populateAllFields();
      showToast('🔔 Dữ liệu vừa được cập nhật trực tiếp!');
    }
  };
}

window.addEventListener('storage', e => {
  if (e.key === STORAGE_KEY && e.newValue) {
    try {
      storeData = JSON.parse(e.newValue);
      populateAllFields();
    } catch (err) {}
  }
});

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
      showToast('👑 Đã đăng nhập hệ thống quản trị TUẤN KHẢI!');
    } else {
      document.getElementById('loginErr').style.display = 'block';
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem(ADMIN_AUTH_SESSION);
    document.getElementById('loginScreen').classList.remove('hidden');
  });

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('ghStatusPill').addEventListener('click', () => {
    switchTab('pane-cloud');
  });

  document.getElementById('masterSaveBtn').addEventListener('click', () => {
    saveAndPublishAll();
  });

  document.getElementById('exportJsonBtn').addEventListener('click', () => {
    exportDataJsonFile();
  });

  document.querySelectorAll('#pane-brand input, #pane-brand textarea, #pane-contact input, #pane-cloud input').forEach(inp => {
    inp.addEventListener('input', markUnsaved);
  });

  bindImagePicker('fileLogo', 'cfgLogoUrl', null, true);
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
    updateLiveHeaderPreview();
    saveAndPublishAll('🏷️ Đã áp dụng Logo biểu tượng TK mặc định cho cả PC & Mobile!');
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
      owner: document.getElementById('ghOwner').value.trim() || 'ngclaam4444',
      repo: document.getElementById('ghRepo').value.trim() || 'noithattuankhai',
      branch: document.getElementById('ghBranch').value.trim() || 'main',
      token: document.getElementById('ghToken').value.trim()
    };
    localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(ghConfig));
    updateCloudPillStatus();
    saveAndPublishAll('🔗 Đã lưu kết nối GitHub và đẩy dữ liệu lên Cloud!');
  });

  document.getElementById('resetDefaultBtn').addEventListener('click', () => {
    if (!confirm('Bạn có chắc muốn khôi phục toàn bộ mẫu sản phẩm, logo và giao diện về mặc định ban đầu?')) return;
    storeData = structuredClone(DEFAULT_DATA);
    storeData.updatedAt = Date.now();
    populateAllFields();
    saveAndPublishAll('🔄 Đã khôi phục dữ liệu mặc định!');
  });
});
