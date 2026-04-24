/* ReserveLink Application Logic */

const LOCALE = {
    NAV: {
        HOME: "Oteller",
        RESERVATIONS: "Rezervasyonlarım",
        ADMIN: "Yönetim Paneli",
        LOGS: "Sistem Günlükleri",
        LOGOUT: "Çıkış Yap",
        LOGIN: "Giriş Yap",
        REGISTER: "Kayıt Ol"
    },
    STATUS: {
        pending: "Beklemede",
        approved: "Onaylandı",
        rejected: "Reddedildi"
    },
    MESSAGES: {
        LOGIN_SUCCESS: "Giriş başarılı! Hoş geldiniz.",
        REGISTER_SUCCESS: "Kayıt başarılı! Şimdi giriş yapabilirsiniz.",
        BOOKING_SUCCESS: "Rezervasyonunuz başarıyla oluşturuldu.",
        BOOKING_ERROR: "Rezervasyon sırasında bir hata oluştu.",
        CANCEL_SUCCESS: "Rezervasyon iptal edildi.",
        UNAUTHORIZED: "Lütfen önce giriş yapın."
    }
};


function renderNavbar() {
    const navLinks = document.getElementById('nav-links');
    const authButtons = document.getElementById('auth-buttons');
    if (!navLinks || !authButtons) return;

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (token) {
        navLinks.innerHTML = `
            <li><a href="#hotels">Ana Sayfa</a></li>
            <li><a href="#reservations">${LOCALE.NAV.RESERVATIONS}</a></li>
            ${user.role === 'admin' ? `<li><a href="#admin-businesses">İşletme Yönetimi</a></li>` : ''}
            ${user.role === 'admin' ? `<li><a href="#admin">${LOCALE.NAV.ADMIN}</a></li>` : ''}
            ${user.role === 'admin' ? `<li><a href="#logs">${LOCALE.NAV.LOGS}</a></li>` : ''}
        `;
        authButtons.innerHTML = `
            <span style="font-size: 0.8rem; opacity: 0.8;">${user.name}</span>
            <button class="btn btn-outline btn-sm" onclick="logout()">Çıkış</button>
        `;
    } else {
        navLinks.innerHTML = `<li><a href="#hotels">Ana Sayfa</a></li>`;
        authButtons.innerHTML = `
            <a href="#login" class="btn btn-sm">Giriş</a>
            <a href="#register" class="btn btn-primary btn-sm">Kayıt</a>
        `;
    }
}

window.logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.hash = '#login';
};

// --- UI Components ---
window.showModal = (title, htmlContent) => {
    let overlay = document.getElementById('modal-overlay');
    let content = document.getElementById('modal-content');
    
    // Robustness: If somehow deleted, recreate
    if (!overlay || !content) {
        const div = document.createElement('div');
        div.id = 'modal-overlay';
        div.className = 'modal-overlay';
        div.innerHTML = '<div id="modal-content" class="modal-content"></div>';
        document.body.appendChild(div);
        overlay = div;
        content = document.getElementById('modal-content');
    }

    content.innerHTML = `
        <div class="modal-header">
            <h2 style="margin: 0;">${title}</h2>
            <span class="modal-close" onclick="closeModal()">&times;</span>
        </div>
        <div class="modal-body">${htmlContent}</div>
    `;
    overlay.classList.add('active');
    overlay.onclick = (e) => { if(e.target === overlay) closeModal(); };
};

window.closeModal = () => document.getElementById('modal-overlay').classList.remove('active');

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.background = type === 'success' ? 'var(--success)' : 'var(--error)';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// --- View Functions ---

async function viewHotels(container) {
    try {
        const [hotelData, serviceData] = await Promise.all([
            API.customer.getHotels(),
            API.customer.getServices(1, '', 'appointment')
        ]);

        container.innerHTML = `
            <section class="hero-section">
                <div class="container">
                    <h1 style="color: white; font-size: 3.5rem; margin-bottom: 1.5rem;">İstediğiniz Zaman, İstediğiniz Yerde Rezervasyon</h1>
                    <p style="color: #ddd; font-size: 1.2rem; max-width: 700px; margin: 0 auto;">
                        Lüks otellerden profesyonel hizmetlere kadar her şey tek platformda.
                    </p>
                </div>
            </section>
            
            <div class="container" style="padding-top: 4rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2>Lüks Oteller ve Konaklama</h2>
                    <a href="#hotels" style="color: var(--accent); font-weight: 600;">Tümünü Gör</a>
                </div>
                <div class="services-grid" id="hotels-grid">
                    ${hotelData.businesses.map(b => `
                        <div class="service-card item-card">
                            <img src="${b.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600'}" class="service-img">
                            <div class="service-info">
                                <span class="badge" style="background: #f3f4f6; color: #374151; margin-bottom: 0.5rem; display: inline-block;">OTEL</span>
                                <h3 style="font-size: 1.3rem;">${b.name}</h3>
                                <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">📍 ${b.address || 'Konum bilgisi yok'}</p>
                                <a href="#hotel-detail?id=${b.id}" class="btn btn-primary" style="width: 100%;">Odaları Gör</a>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6rem; margin-bottom: 2rem; border-top: 1px solid #eee; padding-top: 4rem;">
                    <h2>Popüler Hizmetler ve Randevular</h2>
                    <input type="text" placeholder="Hizmet ara..." class="glass" style="max-width: 300px; padding: 0.8rem; border-radius: 8px; border: 1px solid #ddd;" onkeyup="handleSearch(event, 'service-grid-card')">
                </div>
                <div class="services-grid" id="services-grid">
                    ${serviceData.services.map(s => `
                        <div class="service-card service-grid-card item-card">
                            <img src="${s.image_url || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600'}" class="service-img">
                            <div class="service-info">
                                <span class="badge" style="background: var(--accent); color: white; margin-bottom: 0.5rem; display: inline-block;">RANDEVU</span>
                                <h3 style="font-size: 1.3rem;">${s.name}</h3>
                                <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">⏱️ ${s.duration} Dakika</p>
                                <button class="btn btn-outline" style="width: 100%; border-color: var(--accent); color: var(--accent);" onclick="window.location.hash = '#service-detail?id=${s.id}'">Hemen Randevu Al</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<div class="container" style="padding: 5rem;">Hata: ${e.message}</div>`;
    }
}

window.generateSlots = async (id) => {
    if (!confirm("Bu hizmet için 7 günlük örnek müsaitlik oluşturulsun mu?")) return;
    try {
        await API.admin.generateServiceSlots(id);
        showToast("Müsaitlik tanımlandı.");
        window.loadAdminServices();
    } catch (e) { showToast(e.message, 'error'); }
};

window.deleteService = async (id) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
        try { await API.admin.deleteService(id); window.loadAdminServices(); } catch (e) { showToast(e.message, 'error'); }
    }
};

async function viewHotelDetail(container) {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const hotelId = params.get('id');

    try {
        const hotels = await API.customer.getHotels();
        const hotel = hotels.businesses.find(b => b.id == hotelId);

        if (!hotel) return container.innerHTML = 'Otel bulunamadı.';

        container.innerHTML = `
            <div class="container" style="padding-top: 4rem;">
                <div style="margin-bottom: 3rem;">
                    <a href="#hotels" style="color: var(--accent); font-weight: 600;">← Otellere Geri Dön</a>
                    <h1 style="font-size: 3rem; margin-top: 1rem;">${hotel.name}</h1>
                    <p style="color: var(--text-muted); font-size: 1.1rem;">${hotel.description}</p>
                </div>

                <div class="card" style="padding: 2.5rem; background: white; border-radius: 20px; box-shadow: var(--shadow);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1.5rem;">
                        <div>
                            <h3 style="margin-bottom: 0.5rem;">Oda Seçimi & Müsaitlik</h3>
                            <p style="font-size: 0.9rem; color: var(--text-muted);">Lütfen tarih seçin, ardından müsait bir odaya tıklayın.</p>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <div class="form-group" style="margin: 0;">
                                <label style="font-size: 0.8rem;">Giriş</label>
                                <input type="date" id="grid-check-in" class="btn-outline" style="padding: 0.5rem;" min="${new Date().toISOString().split('T')[0]}" onchange="refreshRoomGrid(${hotelId})">
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label style="font-size: 0.8rem;">Çıkış</label>
                                <input type="date" id="grid-check-out" class="btn-outline" style="padding: 0.5rem;" min="${new Date().toISOString().split('T')[0]}" onchange="refreshRoomGrid(${hotelId})">
                            </div>
                        </div>
                    </div>

                    <div id="room-grid-container" class="room-grid">
                        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #999;">
                            <span style="font-size: 3rem;">📅</span><br>Müsaitlik durumunu görmek için tarih seçiniz.
                        </div>
                    </div>
                </div>
            </div>
        `;

        window.refreshRoomGrid = async (id) => {
            const start = document.getElementById('grid-check-in').value;
            const end = document.getElementById('grid-check-out').value;
            const grid = document.getElementById('room-grid-container');

            if (!start || !end) return;
            if (new Date(end) <= new Date(start)) {
                showToast("Çıkış tarihi girişten sonra olmalıdır.", "error");
                return;
            }

            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center;">Yükleniyor...</div>';

            try {
                const rooms = await API.customer.getHotelRooms(id);
                const gridHtml = await Promise.all(rooms.rooms.map(async room => {
                    const avail = await API.customer.getAvailability(room.id);
                    const isBooked = avail.booked_ranges?.some(r => {
                        return (new Date(start) < new Date(r.check_out)) && (new Date(end) > new Date(r.check_in));
                    });

                    return `
                        <div class="room-item ${isBooked ? 'booked' : 'available'}" 
                             ${isBooked ? '' : `onclick="selectRoomForBooking(${room.id}, '${room.name}', this)"`}>
                            <div class="status-indicator ${isBooked ? 'status-booked' : 'status-available'}"></div>
                            <div class="room-number">${room.category === 'hotel' ? (room.room_number || '#') : 'Svc'}</div>
                            <div class="room-type-label">${room.category === 'hotel' ? (room.room_type || 'Standart') : room.name}</div>
                            <div style="font-size: 0.65rem; margin-top: 0.5rem; opacity: 0.7;">${isBooked ? 'DOLU' : 'MÜSAİT'}</div>
                        </div>
                    `;
                }));
                grid.innerHTML = gridHtml.join('') + `
                    <div id="booking-cta" style="grid-column: 1/-1; margin-top: 3rem; display: none; text-align: center; border-top: 1px solid #eee; padding-top: 2rem;">
                        <p id="selected-room-info" style="font-weight: 600; margin-bottom: 1rem;"></p>
                        <button class="btn btn-primary" style="padding: 1rem 3rem;" onclick="redirectToBooking()">Devam Et ve Rezerve Et</button>
                    </div>
                `;
            } catch (e) { grid.innerHTML = 'Hata: ' + e.message; }
        };

        window.selectRoomForBooking = (roomId, name, el) => {
            document.querySelectorAll('.room-item').forEach(r => r.classList.remove('selected'));
            el.classList.add('selected');
            
            // Set it on window to ensure redirectToBooking (which is also window) sees it
            window.lastSelectedRoomId = roomId; 
            
            const cta = document.getElementById('booking-cta');
            cta.style.display = 'block';
            document.getElementById('selected-room-info').innerHTML = `Seçilen Oda: <span style="color:var(--accent)">${name}</span>`;
            cta.scrollIntoView({ behavior: 'smooth' });
        };

        window.redirectToBooking = () => {
            if (!window.lastSelectedRoomId) return showToast("Lütfen önce bir oda seçin.", "error");
            const start = document.getElementById('grid-check-in').value;
            const end = document.getElementById('grid-check-out').value;
            window.location.hash = `#service-detail?id=${window.lastSelectedRoomId}&start=${start}&end=${end}`;
        };

    } catch (e) {
        container.innerHTML = e.message;
    }
}

async function viewServiceDetail(container) {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const id = params.get('id');
    const urlStart = params.get('start');
    const urlEnd = params.get('end');

    try {
        const s = await API.customer.getService(id);
        if (!s) return container.innerHTML = `<div class="container" style="padding:5rem; text-align:center;"><h2>Hizmet bulunamadı. (ID: ${id})</h2><p>Lütfen ana sayfaya dönüp tekrar deneyin.</p><button onclick="window.location.hash='#hotels'" class="btn btn-primary" style="margin-top:1rem;">Ana Sayfaya Dön</button></div>`;

        const isHotel = s.category === 'hotel';

        container.innerHTML = `
            <div class="container detail-layout">
                <div class="detail-content">
                    <img src="${s.image_url || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200'}" style="width: 100%; height: 500px; object-fit: cover; border-radius: 20px;">
                    <div style="margin-top: 2rem;">
                        <span class="badge" style="background: ${isHotel ? '#f3f4f6' : 'var(--accent)'}; color: ${isHotel ? '#374151' : 'white'}; margin-bottom: 1rem; display: inline-block;">
                            ${isHotel ? '🏨 KONAKLAMA' : '📅 RANDEVU HİZMETİ'}
                        </span>
                        <h1 style="font-size: 2.5rem;">${s.name}</h1>
                        <p style="color: var(--text-muted); margin: 1rem 0; font-size: 1.1rem;">${s.description}</p>
                        
                        ${!isHotel ? `
                            <div style="margin-top: 3rem; background: white; padding: 2rem; border-radius: 12px; box-shadow: var(--shadow);">
                                <h3>1. Gün Seçin</h3>
                                <input type="date" id="appointment-date" class="btn-outline" style="margin-top: 1rem; padding: 1rem; width: 100%; max-width: 300px;" onchange="window.loadAppointmentSlots(${id}, this.value)">
                                
                                <h3 style="margin-top: 2rem;">2. Saat Dilimi Seçin</h3>
                                <div id="appointment-slots" class="slot-grid" style="margin-top: 1rem;">
                                    <p style="color: #999;">Lütfen önce bir tarih seçin.</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="detail-sidebar">
                    <div class="booking-panel">
                        <h3>Rezervasyon Özeti</h3>
                        <div id="booking-summary" style="margin-top: 1.5rem; padding: 1.5rem; background: #fafafa; border-radius: 12px;">
                            ${isHotel ? `
                                <p><strong>Giriş:</strong> ${urlStart}</p>
                                <p><strong>Çıkış:</strong> ${urlEnd}</p>
                            ` : '<p id="selected-slot-text">Henüz tarih ve saat seçilmedi.</p>'}
                        </div>
                        <div class="form-group" style="margin-top: 1.5rem;">
                            <label>Kişi Sayısı</label>
                            <input type="number" id="adults" value="1" min="1" style="width: 100%;">
                        </div>
                        <div style="padding-bottom:1rem">
                           <label>Varsa Notunuz</label>
                           <textarea id="note" class="form-control" style="width:100%"></textarea>
                        </div>
                        <button class="btn btn-primary" onclick="window.submitFinalBooking(${id}, '${s.category}')">Rezervasyonu Tamamla</button>
                    </div>
                </div>
            </div>
        `;

        let selectedSlotId = null;

        window.selectSlot = (slotId, date, time, el) => {
            document.querySelectorAll('.slot-item').forEach(s => s.classList.remove('selected'));
            el.classList.add('selected');
            selectedSlotId = slotId;
            document.getElementById('selected-slot-text').innerHTML = `
                <strong>Tarih:</strong> ${date}<br>
                <strong>Saat:</strong> ${time.substring(0, 5)}
            `;
        };

        window.loadAppointmentSlots = async (svcId, date) => {
            const container = document.getElementById('appointment-slots');
            container.innerHTML = 'Yükleniyor...';
            try {
                const data = await API.customer.getAvailability(svcId, date);
                if (data.slots && data.slots.length > 0) {
                    container.innerHTML = data.slots.map(s => `
                        <div class="slot-item ${s.is_available ? 'available' : 'booked'}" 
                             onclick="${s.is_available ? `window.selectSlot(${s.id}, '${s.date}', '${s.start_time}', this)` : ''}">
                            ${s.start_time.substring(0, 5)}
                        </div>
                    `).join('');
                } else {
                    container.innerHTML = '<p style="color: var(--error);">Bu tarihte müsait randevu bulunamadı.</p>';
                }
            } catch (e) { container.innerHTML = 'Hata: ' + e.message; }
        };

        window.submitFinalBooking = async (svcId, category) => {
            const payload = {
                service_id: svcId,
                note: document.getElementById('note').value,
                guests: { adults: document.getElementById('adults').value }
            };

            if (category === 'hotel') {
                payload.check_in = urlStart;
                payload.check_out = urlEnd;
            } else {
                if (!selectedSlotId) return showToast("Lütfen bir saat seçin.", "error");
                payload.time_slot_id = selectedSlotId;
            }

            try {
                await API.customer.createReservation(payload);
                showToast("Rezervasyon başarıyla oluşturuldu.");
                window.location.hash = '#reservations';
            } catch (err) { showToast(err.message, 'error'); }
        };

    } catch (e) {
        container.innerHTML = `<div class="container" style="padding: 5rem;">Hata: ${e.message}</div>`;
    }
}

// --- Auth Views ---
async function viewLogin(container) {
    container.innerHTML = `
        <div style="max-width: 450px; margin: 8rem auto;" class="service-card">
            <div style="padding: 3rem;">
                <h2 style="text-align: center; margin-bottom: 2rem;">Giriş Yap</h2>
                <form id="login-form">
                    <div class="form-group"><label>E-posta Adresi</label><input type="email" id="login-email" required></div>
                    <div class="form-group"><label>Şifre</label><input type="password" id="login-password" required></div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">Oturum Aç</button>
                </form>
            </div>
        </div>
    `;
    document.getElementById('login-form').onsubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.auth.login(document.getElementById('login-email').value, document.getElementById('login-password').value);
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('user', JSON.stringify(res.user));
            showToast(LOCALE.MESSAGES.LOGIN_SUCCESS);
            window.location.hash = '#hotels';
        } catch (err) { showToast(err.message, 'error'); }
    };
}

async function viewRegister(container) {
    container.innerHTML = `
        <div style="max-width: 450px; margin: 8rem auto;" class="service-card">
            <div style="padding: 3rem;">
                <h2 style="text-align: center; margin-bottom: 2rem;">Kayıt Ol</h2>
                <form id="register-form">
                    <div class="form-group"><label>Ad Soyad</label><input type="text" id="reg-name" required></div>
                    <div class="form-group"><label>E-posta</label><input type="email" id="reg-email" required></div>
                    <div class="form-group"><label>Şifre</label><input type="password" id="reg-password" required></div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">Hesap Oluştur</button>
                </form>
            </div>
        </div>
    `;
    document.getElementById('register-form').onsubmit = async (e) => {
        e.preventDefault();
        try {
            await API.auth.register({ name: document.getElementById('reg-name').value, email: document.getElementById('reg-email').value, password: document.getElementById('reg-password').value });
            showToast(LOCALE.MESSAGES.REGISTER_SUCCESS);
            window.location.hash = '#login';
        } catch (err) { showToast(err.message, 'error'); }
    };
}

// --- Dashboard & Admin Logic ---
async function viewDashboard(container) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role === 'admin') viewAdmin(container);
    else viewMyReservations(container);
}

async function viewMyReservations(container) {
    try {
        const data = await API.customer.getMyReservations();
        container.innerHTML = `
            <div class="container" style="padding-top: 4rem;">
                <h1 style="margin-bottom: 3rem;">Rezervasyonlarım</h1>
                <div class="grid">
                    ${data.reservations.length ? data.reservations.map(r => `
                        <div class="service-card" style="display: flex; flex-direction: row; align-items: center; padding: 1.5rem; gap: 2rem; margin-bottom: 1.5rem;">
                            <div style="width: 80px; height: 80px; background: #fafafa; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">🏨</div>
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between;">
                                    <h3 style="font-size: 1.2rem;">${r.service_name}</h3>
                                    <span class="badge badge-${r.status}">${LOCALE.STATUS[r.status]}</span>
                                </div>
                                <p style="margin: 0.5rem 0; color: var(--text-muted); font-size: 0.9rem;">
                                    📅 ${r.type === 'hotel' ? `${r.check_in} / ${r.check_out}` : `${r.slot_date} | Saat: ${r.slot_time}`}
                                </p>
                                <p style="font-size: 0.85rem;">👤 ${r.total_guests} Misafir | Not: ${r.note || '-'}</p>
                            </div>
                            <div>
                                ${r.status === 'pending' ? `<button class="btn btn-outline" style="color: var(--error); border-color: var(--error);" onclick="window.cancelBooking(${r.id})">İptal Et</button>` : ''}
                            </div>
                        </div>
                    `).join('') : '<p>Rezervasyonunuz bulunamadı.</p>'}
                </div>
            </div>
        `;
        window.cancelBooking = async (id) => {
            if (confirm("Silmek istiyor musunuz?")) {
                try { await API.customer.cancelReservation(id); viewMyReservations(container); } catch (e) { showToast(e.message, 'error'); }
            }
        };
    } catch (e) { container.innerHTML = e.message; }
}

async function viewAdmin(container) {
    container.innerHTML = `
        <div class="container" style="padding-top: 4rem;">
            <div style="display: flex; gap: 1rem; margin-bottom: 3rem;">
                <button class="btn btn-outline" onclick="window.location.hash = '#admin-businesses'">İşletme Yönetimi</button>
                <button class="btn btn-primary" onclick="window.location.hash = '#admin'">Hizmet/Oda Yönetimi</button>
                <button class="btn btn-outline" onclick="window.location.hash = '#admin-reservations'">Rezervasyonlar</button>
                <button class="btn btn-outline" onclick="window.location.hash = '#admin-users'">Kullanıcılar</button>
            </div>
            <div id="admin-main-content">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h1>Sistem Yönetimi</h1>
                    <button class="btn btn-primary" onclick="window.showCreateServiceModal()">+ Yeni Oda/Hizmet</button>
                </div>
                <div id="admin-services-list" style="margin-top: 2rem;">Yükleniyor...</div>
            </div>
        </div>
    `;
    window.loadAdminServices();
}

window.loadAdminServices = async () => {
    const list = document.getElementById('admin-services-list');
    if (!list) return;
    try {
        const data = await API.customer.getServices();
        list.innerHTML = `
            <table class="admin-table">
                <thead><tr><th>Ad</th><th>Kategori</th><th>İşlemler</th></tr></thead>
                <tbody>
                    ${data.services.map(s => `
                        <tr>
                            <td><strong>${s.name}</strong></td>
                            <td><span class="badge" style="background:#eee">${s.category === 'hotel' ? 'Oda' : 'Randevu'}</span></td>
                            <td>
                            <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                                ${s.category === 'appointment' ? `<button class="btn btn-outline btn-sm" onclick="window.generateSlots(${s.id})">Müsaitlik Tanımla</button>` : ''}
                                <button class="btn btn-outline btn-sm" onclick="window.showServiceFormModal(${JSON.stringify(s).replace(/"/g, '&quot;')})">Düzenle</button>
                                <button class="btn btn-danger btn-sm" onclick="window.deleteService(${s.id})">Sil</button>
                            </div>
                        </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (e) { list.innerHTML = e.message; }
}

async function viewAdminReservations(container) {
    container.innerHTML = `<div class="container" style="padding-top: 4rem;">
        <div style="display: flex; gap: 1rem; margin-bottom: 3rem;">
            <button class="btn btn-outline" onclick="window.location.hash = '#admin'">Hizmet/Oda Yönetimi</button>
            <button class="btn btn-primary" onclick="window.location.hash = '#admin-reservations'">Rezervasyonlar</button>
            <button class="btn btn-outline" onclick="window.location.hash = '#admin-users'">Kullanıcılar</button>
        </div>
        <h1>Tüm Rezervasyonlar</h1><div id="res-list">Yükleniyor...</div></div>`;
    const resList = document.getElementById('res-list');
    try {
        const data = await API.request('/admin/reservations');
        resList.innerHTML = `
            <table class="admin-table">
                <thead><tr><th>Müşteri</th><th>Hizmet</th><th>Durum</th><th>İşlemler</th></tr></thead>
                <tbody>
                    ${data.reservations.map(r => `
                        <tr>
                            <td>${r.user_name}</td>
                            <td>${r.service_name}</td>
                            <td><span class="badge badge-${r.status}">${LOCALE.STATUS[r.status]}</span></td>
                            <td>
                                ${r.status === 'pending' ? `
                                    <button onclick="window.manageReservationStatus(${r.id}, 'approved')">Onayla</button>
                                    <button onclick="window.manageReservationStatus(${r.id}, 'rejected')">Reddet</button>
                                ` : ''}
                                <button onclick="window.adminDeleteReservation(${r.id})">Sil</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (e) { resList.innerHTML = e.message; }
}

async function viewLogs(container) {
    try {
        const data = await API.admin.getLogs();
        container.innerHTML = `<div class="container" style="padding-top: 4rem;"><h1>Sistem Günlükleri</h1><div id="log-list">Yükleniyor...</div></div>`;
        document.getElementById('log-list').innerHTML = `<table class="admin-table">
            <thead><tr><th>Zaman</th><th>İşlem</th><th>Kullanıcı</th></tr></thead>
            <tbody>${data.logs.map(l => `<tr><td>${l.timestamp}</td><td>${l.action}</td><td>${l.user_id}</td></tr>`).join('')}</tbody>
        </table>`;
    } catch (e) { container.innerHTML = e.message; }
}

async function viewAdminUsers(container) {
    try {
        const data = await API.admin.getUsers();
        container.innerHTML = `<div class="container" style="padding-top: 4rem;"><h1>Sistem Kullanıcıları</h1><div id="user-list">Yükleniyor...</div></div>`;
        document.getElementById('user-list').innerHTML = `<table class="admin-table">
            <thead><tr><th>Ad</th><th>E-posta</th><th>Rol</th></tr></thead>
            <tbody>${data.users.map(u => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td></tr>`).join('')}</tbody>
        </table>`;
    } catch (e) { container.innerHTML = e.message; }
}

// --- Admin Helper Functions (Global for onclick) ---

window.showCreateServiceModal = () => {
    showServiceFormModal(null, "Sisteme Yeni Hizmet/Oda Ekle");
};

window.editService = async (id) => {
    try {
        const data = await API.customer.getServices();
        const s = data.services.find(item => item.id == id);
        showServiceFormModal(s, "Hizmeti Düzenle");
    } catch (e) { showToast(e.message, 'error'); }
};

window.generateSlots = async (id) => {
    if (!confirm("Bu hizmet için 7 günlük varsayılan çalışma saatleri (09:00-17:00) oluşturulacak. Devam edilsin mi?")) return;
    try {
        await API.admin.generateServiceSlots(id);
        showToast("7 günlük randevu takvimi oluşturuldu!");
    } catch (err) { showToast(err.message, 'error'); }
};

window.showCreateServiceModal = () => window.showServiceFormModal();

window.showServiceFormModal = async (service = null, title = "Hizmet İşlemleri") => {
    let businesses = { businesses: [] };
    try {
        businesses = await API.admin.getBusinesses();
    } catch(e) { console.warn("İşletmeler yüklenemedi"); }

    const html = `
        <form id="service-form">
            <div class="form-group"><label>Hizmet/Oda Adı</label><input type="text" id="svc-name" value="${service ? service.name : ''}" required></div>
            <div class="form-group"><label>Açıklama</label><textarea id="svc-desc">${service ? service.description : ''}</textarea></div>
            
            <div class="form-group"><label>Kategori</label>
                <select id="svc-cat" onchange="toggleHotelFields(this.value)">
                    <option value="hotel" ${service?.category === 'hotel' ? 'selected' : ''}>Otel Odası</option>
                    <option value="appointment" ${service?.category === 'appointment' ? 'selected' : ''}>Randevu Hizmeti</option>
                </select>
            </div>

            <div id="hotel-fields" style="display: ${service?.category === 'appointment' ? 'none' : 'block'}">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group"><label>Oda No</label><input type="text" id="svc-room-num" value="${service ? service.room_number || '' : ''}"></div>
                    <div class="form-group"><label>Oda Tipi</label><input type="text" id="svc-room-type" value="${service ? service.room_type || '' : ''}"></div>
                </div>
            </div>

            <div class="form-group"><label>Bağlı İşletme</label>
                <select id="svc-biz">
                    <option value="">İşletme Seçin (Opsiyonel)</option>
                    ${businesses.businesses.map(b => `<option value="${b.id}" ${service?.business_id === b.id ? 'selected' : ''}>${b.name}</option>`).join('')}
                </select>
            </div>

            <div class="form-group">
                <label>Hizmet Resmi</label>
                <div class="image-upload-wrapper ${service?.image_url ? 'has-image' : ''}" onclick="document.getElementById('file-input').click()">
                    <img src="${service ? service.image_url : ''}" id="image-preview" class="image-preview" style="display: ${service?.image_url ? 'block' : 'none'}">
                    <div class="image-upload-placeholder">
                        <span style="font-size: 2rem;">📸</span>
                        <p>Resim Yüklemek İçin Tıklayın</p>
                    </div>
                    <input type="file" id="file-input" hidden onchange="handleImageUpload(event)">
                </div>
                <input type="hidden" id="svc-img" value="${service ? service.image_url : ''}">
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">${service ? 'Değişiklikleri Kaydet' : 'Hizmeti Oluştur'}</button>
        </form>
    `;
    showModal(title, html);
    
    document.getElementById('service-form').onsubmit = async (e) => {
        e.preventDefault();
        const bizValue = document.getElementById('svc-biz').value;
        const payload = {
            name: document.getElementById('svc-name').value,
            description: document.getElementById('svc-desc').value,
            category: document.getElementById('svc-cat').value,
            business_id: bizValue === "" ? null : bizValue,
            room_number: document.getElementById('svc-room-num')?.value || null,
            room_type: document.getElementById('svc-room-type')?.value || null,
            image_url: document.getElementById('svc-img').value,
            duration: 60
        };
        try {
            if (service) await API.admin.updateService(service.id, payload);
            else await API.admin.createService(payload);
            showToast("Başarıyla kaydedildi");
            closeModal();
            loadAdminServices();
        } catch (err) { showToast(err.message, 'error'); }
    };
}

window.toggleHotelFields = (val) => {
    document.getElementById('hotel-fields').style.display = val === 'hotel' ? 'block' : 'none';
};

window.deleteService = async (id) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
        try { await API.admin.deleteService(id); loadAdminServices(); } catch (e) { showToast(e.message, 'error'); }
    }
};

window.manageReservationStatus = async (id, status) => {
    try { await API.admin.updateReservationStatus(id, status); viewAdminReservations(document.getElementById('app-root')); } catch (e) { showToast(e.message, 'error'); }
};

window.adminDeleteReservation = async (id) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
        try { await API.request(`/admin/reservations/${id}`, { method: 'DELETE' }); viewAdminReservations(document.getElementById('app-root')); } catch (e) { showToast(e.message, 'error'); }
    }
};

async function viewAdminBusinesses(container) {
    container.innerHTML = `
        <div class="container" style="padding-top: 4rem;">
            <div style="display: flex; gap: 1rem; margin-bottom: 3rem;">
                <button class="btn btn-primary" onclick="window.location.hash = '#admin-businesses'">İşletme Yönetimi</button>
                <button class="btn btn-outline" onclick="window.location.hash = '#admin'">Hizmet/Oda Yönetimi</button>
                <button class="btn btn-outline" onclick="window.location.hash = '#admin-reservations'">Rezervasyonlar</button>
                <button class="btn btn-outline" onclick="window.location.hash = '#admin-users'">Kullanıcılar</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h1>İşletme Yönetimi</h1>
                <button class="btn btn-primary" onclick="window.showBusinessFormModal()">+ Yeni İşletme Ekle</button>
            </div>
            <div id="admin-businesses-list" style="margin-top: 2rem;">Yükleniyor...</div>
        </div>
    `;
    window.loadAdminBusinesses();
}

window.loadAdminBusinesses = async () => {
    const list = document.getElementById('admin-businesses-list');
    try {
        const data = await API.admin.getBusinesses();
        list.innerHTML = `
            <table class="admin-table">
                <thead><tr><th>Ad</th><th>Tür</th><th>Adres</th><th>İşlemler</th></tr></thead>
                <tbody>
                    ${data.businesses.map(b => `
                        <tr>
                            <td><strong>${b.name}</strong></td>
                            <td><span class="badge" style="background:#eee">${b.type.toUpperCase()}</span></td>
                            <td>${b.address || '-'}</td>
                            <td>
                                <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                                    <button class="btn btn-outline btn-sm" onclick="window.showBusinessFormModal(${JSON.stringify(b).replace(/"/g, '&quot;')})">Düzenle</button>
                                    <button class="btn btn-danger btn-sm" onclick="window.deleteBusiness(${b.id})">Sil</button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (e) { list.innerHTML = e.message; }
}

window.showBusinessFormModal = async (biz = null) => {
    const isEdit = !!biz;
    const title = isEdit ? 'İşletme Düzenle' : 'Yeni İşletme Ekle';
    
    const html = `
        <form id="biz-form" style="margin-top: 0.5rem;">
            <div class="form-group"><label>İşletme Adı</label><input type="text" id="biz-name" value="${biz?.name || ''}" required></div>
            <div class="form-group"><label>Tür</label>
                <select id="biz-type" class="glass" style="width:100%; border:1px solid #ddd; padding:0.8rem; border-radius:8px;">
                    <option value="hotel" ${biz?.type === 'hotel' ? 'selected' : ''}>Otel</option>
                    <option value="salon" ${biz?.type === 'salon' ? 'selected' : ''}>Güzellik Salonu / Diğer</option>
                </select>
            </div>
            <div class="form-group"><label>Açıklama</label><textarea id="biz-desc">${biz?.description || ''}</textarea></div>
            <div class="form-group"><label>Adres</label><input type="text" id="biz-address" value="${biz?.address || ''}"></div>
            <div class="form-group"><label>Görsel URL</label><input type="text" id="biz-image" value="${biz?.image_url || ''}"></div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">${isEdit ? 'Güncelle' : 'Ekle'}</button>
        </form>
    `;

    window.showModal(title, html);

    document.getElementById('biz-form').onsubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('biz-name').value,
            type: document.getElementById('biz-type').value,
            description: document.getElementById('biz-desc').value,
            address: document.getElementById('biz-address').value,
            image_url: document.getElementById('biz-image').value
        };
        try {
            if (isEdit) await API.admin.updateBusiness(biz.id, data);
            else await API.admin.createBusiness(data);
            showToast("İşletme başarıyla kaydedildi.");
            window.closeModal();
            window.loadAdminBusinesses();
        } catch (err) { showToast(err.message, 'error'); }
    }
};

window.deleteBusiness = async (id) => {
    if (!confirm("İşletmeyi silmek istediğinize emin misiniz? Bağlı tüm hizmetler etkilenebilir.")) return;
    try {
        await API.admin.deleteBusiness(id);
        showToast("İşletme silindi.");
        loadAdminBusinesses();
    } catch (e) { showToast(e.message, 'error'); }
};

async function router() {
    renderNavbar();
    const hash = window.location.hash || '#hotels';
    const container = document.getElementById('app-root');
    
    // Hide main modal on route change instead of removing skeleton
    if (window.closeModal) window.closeModal();
    // Only remove dynamic modals (like the business form)
    document.querySelectorAll('.modal-overlay:not(#modal-overlay)').forEach(m => m.remove());

    if (hash === '#login') viewLogin(container);
    else if (hash === '#register') viewRegister(container);
    else if (hash === '#hotels') viewHotels(container);
    else if (hash === '#reservations') viewMyReservations(container);
    else if (hash.startsWith('#service-detail')) viewServiceDetail(container);
    else if (hash.startsWith('#hotel-detail')) viewHotelDetail(container);
    else if (hash === '#admin-businesses') viewAdminBusinesses(container);
    else if (hash === '#admin') viewAdmin(container);
    else if (hash === '#admin-reservations') viewAdminReservations(container);
    else if (hash === '#admin-users') viewAdminUsers(container);
    else if (hash === '#logs') viewLogs(container);
    else viewHotels(container);
}

window.handleSearch = (e, className) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.' + className).forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
};

window.handleImageUpload = async (e) => { 
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const overlay = document.querySelector('.image-upload-wrapper');
    overlay.style.opacity = '0.5';
    overlay.style.pointerEvents = 'none';

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/admin/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('svc-img').value = data.url;
            const preview = document.getElementById('image-preview');
            preview.src = data.url;
            preview.style.display = 'block';
            overlay.classList.add('has-image');
            showToast("Resim başarıyla yüklendi");
        } else {
            showToast(data.msg || "Yükleme hatası", 'error');
        }
    } catch (err) {
        showToast("Sunucu hatası oluştu", 'error');
    } finally {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
    }
};

window.onhashchange = router;
window.onload = router;
router();
