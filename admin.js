const STORAGE_KEY = 'MOC_AN_SHARED_DATA_V2';
const ADMIN_AUTH_SESSION = 'MOC_AN_ADMIN_SESSION_V2';
const GH_CONFIG_KEY = 'MOC_AN_GITHUB_SYNC_CONFIG';
const syncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('moc_an_live_sync') : null;

const DEFAULT_DATA = {
  adminAuth: {
    username: 'admin',
    password: '123456'
  },
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
      const parsed = JSON.parse(localRaw);
      if (Array.isArray(parsed.products)) {
        parsed.products = parsed.products.map(p => {
          const defProd = DEFAULT_DATA.products.find(d => d.id === p.id);
          if ((!p.images || p.images.length <= 1) && defProd && defProd.images) {
            return { ...p, images: defProd.images };
          }
          return p;
        });
      }
      storeData = { ...DEFAULT_DATA, ...parsed };
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
    name: document.getElementById('cfgBrandName').value.trim() || 'MỘC AN',
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
        message: `Cập nhật dữ liệu website từ Admin Portal (${new Date().toLocaleString('vi-VN')})`,
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

  document.getElementById('sidebarBrandTitle').textContent = brand.name || 'MỘC AN';

  const orderList = orders || [];
  const ordersCount = orderList.filter(o => o.type === 'order').length;
  const inqCount = orderList.filter(o => o.type !== 'order').length;

  document.getElementById('statProducts').textContent = (products || []).length;
  document.getElementById('statOrders').textContent = ordersCount;
  document.getElementById('statInquiries').textContent = inqCount;
  document.getElementById('navOrderBadge').textContent = orderList.length;

  document.getElementById('cfgBrandName').value = brand.name || '';
  document.getElementById('cfgBrandTagline').value = brand.tagline || '';
  document.getElementById('cfgAccentColor').value = brand.accentColor || '#8C583A';
  document.getElementById('cfgTopbarPromo').value = brand.topbarPromo || '';
  document.getElementById('cfgLogoUrl').value = brand.logoUrl || '';
  document.getElementById('prevLogo').src = brand.logoUrl || 'https://placehold.co/200x80/EFE6DD/8C583A?text=LOGO+CHU';

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
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 30px; color: var(--text-muted);">Chưa có sản phẩm nào. Hãy bấm "+ Thêm Sản Phẩm Mới".</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(p => {
    const imgs = getProductImages(p);
    return `
      <tr>
        <td>
          <div class="prod-cell">
            <img src="${imgs[0] || p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80'" />
            <div>
              <strong style="display: block; font-size: 0.95rem;">${p.name}</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${p.material || ''}</span>
              <div style="margin-top: 4px;">
                <span style="background: #EBF7F0; color: var(--success); padding: 2px 8px; border-radius: 999px; font-size: 0.72rem; font-weight: 600;">📷 ${imgs.length} ảnh góc chụp</span>
                <a href="product.html?id=${encodeURIComponent(p.id)}" target="_blank" style="font-size: 0.75rem; color: var(--accent); margin-left: 8px; font-weight: 600;">Xem trang SP ↗</a>
              </div>
            </div>
          </div>
        </td>
        <td><span style="background: var(--accent-soft); color: var(--accent); padding: 4px 10px; border-radius: 999px; font-size: 0.78rem; font-weight: 600;">${p.category}</span></td>
        <td><strong style="color: var(--accent);">${formatVND(p.price)}</strong></td>
        <td style="color: var(--text-muted); text-decoration: line-through;">${p.oldPrice > p.price ? formatVND(p.oldPrice) : '—'}</td>
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
      if (!confirm(`Xoá sản phẩm "${prod.name}"?`)) return;
      storeData.products = storeData.products.filter(x => x.id !== id);
      saveAndPublishAll('🗑️ Đã xoá sản phẩm và cập nhật lên web!');
    });
  });
}

function renderOrdersList() {
  const container = document.getElementById('ordersContainer');
  const orders = storeData.orders || [];

  if (orders.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); padding: 20px 0; text-align: center;">Chưa có đơn đặt hàng hoặc yêu cầu tư vấn nào từ khách hàng.</p>`;
    return;
  }

  container.innerHTML = orders.map((ord, idx) => `
    <div style="padding: 16px; border: 1px solid var(--border); border-radius: 10px; margin-bottom: 12px; background: #FAF8F5;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
        <strong style="font-size: 0.98rem;">
          ${ord.type === 'order' ? '🛒 Đơn đặt hàng' : '💬 Yêu cầu tư vấn'} — ${ord.name}
          (<a href="tel:${ord.phone}" style="color: var(--accent);">${ord.phone}</a>)
        </strong>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${ord.time}</span>
      </div>
      <p style="font-size: 0.9rem; margin-bottom: 12px;">${ord.details}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <label style="font-size: 0.8rem; font-weight: 600; margin-right: 6px;">Trạng thái:</label>
          <select data-ord-status="${idx}" style="padding: 6px 12px; border-radius: 999px; border: 1px solid var(--border); font-weight: 600;">
            <option value="Chờ xử lý" ${(ord.status || 'Chờ xử lý') === 'Chờ xử lý' ? 'selected' : ''}>⏳ Chờ xử lý</option>
            <option value="Đã liên hệ" ${ord.status === 'Đã liên hệ' ? 'selected' : ''}>📞 Đã liên hệ</option>
            <option value="Đang giao hàng" ${ord.status === 'Đang giao hàng' ? 'selected' : ''}>🚚 Đang giao hàng</option>
            <option value="Hoàn thành" ${ord.status === 'Hoàn thành' ? 'selected' : ''}>✅ Hoàn thành</option>
            <option value="Đã huỷ" ${ord.status === 'Đã huỷ' ? 'selected' : ''}>❌ Đã huỷ</option>
          </select>
        </div>
        <button class="btn btn-danger btn-sm" data-ord-del="${idx}">🗑️ Xoá đơn này</button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('[data-ord-status]').forEach(sel => {
    sel.addEventListener('change', () => {
      const idx = Number(sel.dataset.ordStatus);
      storeData.orders[idx].status = sel.value;
      saveAndPublishAll(`📦 Đã đổi trạng thái đơn thành: ${sel.value}`);
    });
  });

  container.querySelectorAll('[data-ord-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.ordDel);
      storeData.orders.splice(idx, 1);
      saveAndPublishAll('🗑️ Đã xoá đơn hàng!');
    });
  });
}

function openProductModal(productId = null) {
  const modal = document.getElementById('prodModal');
  const form = document.getElementById('prodForm');
  form.reset();

  const placeholderImg = 'https://placehold.co/160x120/EFE6DD/8C583A?text=Trong';

  if (productId) {
    const p = storeData.products.find(x => x.id === productId);
    if (!p) return;
    const imgs = getProductImages(p);

    document.getElementById('prodModalTitle').textContent = `✏️ Sửa Sản Phẩm: ${p.name}`;
    document.getElementById('prodId').value = p.id;
    document.getElementById('prodName').value = p.name;
    document.getElementById('prodCategory').value = p.category;
    document.getElementById('prodPrice').value = p.price;
    document.getElementById('prodOldPrice').value = p.oldPrice || '';
    document.getElementById('prodMaterial').value = p.material || '';
    document.getElementById('prodBadge').value = p.badge || '';
    document.getElementById('prodDesc').value = p.description || '';

    for (let i = 1; i <= 5; i++) {
      const val = imgs[i - 1] || '';
      document.getElementById(`prodImage${i}`).value = val;
      document.getElementById(`prevProdImg${i}`).src = val || placeholderImg;
    }
  } else {
    document.getElementById('prodModalTitle').textContent = '➕ Thêm Sản Phẩm Mới (Hỗ trợ 4–5 ảnh)';
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
    if (prevEl) prevEl.src = textEl.value.trim() || 'https://placehold.co/160x120/EFE6DD/8C583A?text=Trong';
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
      showToast('🔔 Có đơn đặt hàng / yêu cầu tư vấn mới từ khách hàng!');
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

  // Brand & Story Image Pickers
  bindImagePicker('fileLogo', 'cfgLogoUrl', 'prevLogo');
  bindImagePicker('fileHeroBg', 'cfgHeroBg', 'prevHeroBg');
  bindImagePicker('fileStoryImg', 'cfgStoryImg', 'prevStoryImg');

  // 5 Product Image Slots Pickers
  for (let i = 1; i <= 5; i++) {
    bindImagePicker(`fileProdImg${i}`, `prodImage${i}`, `prevProdImg${i}`);
  }

  // Multi-file picker (select 4-5 images at once!)
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
    document.getElementById('prevLogo').src = 'https://placehold.co/200x80/EFE6DD/8C583A?text=LOGO+CHU';
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
      price: Number(document.getElementById('prodPrice').value) || 0,
      oldPrice: Number(document.getElementById('prodOldPrice').value) || 0,
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
    saveAndPublishAll(`✅ Đã lưu sản phẩm (${collectedImages.length} ảnh) và cập nhật lên web!`);
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
    if (!confirm('Bạn có chắc muốn khôi phục toàn bộ sản phẩm, logo và giao diện về mặc định ban đầu?')) return;
    storeData = structuredClone(DEFAULT_DATA);
    populateAllFields();
    saveAndPublishAll('🔄 Đã khôi phục dữ liệu mặc định!');
  });
});
