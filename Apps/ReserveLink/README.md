# ReserveLink | Hibrit Rezervasyon ve Yönetim Platformu

ReserveLink, modern otel konaklamaları ve hizmet odaklı randevu (Salon, Klinik, Danışmanlık vb.) süreçlerini tek bir çatı altında toplayan, kullanıcı dostu ve şık bir rezervasyon yönetim platformudur.

---

## 🚀 Hızlı Kurulum (Docker)

Sistemi localinizde en hızlı şekilde çalıştırmak için Docker gereklidir.

1.  **Docker Desktop İndirin:** [Docker Desktop Download](https://www.docker.com/products/docker-desktop/)
2.  **Projeyi Çalıştırın:** Proje ana dizininde terminali açın ve şu komutu yazın:
    ```bash
    docker-compose up --build
    ```
3.  **Erişim:** Tarayıcınızdan `http://localhost:5000` adresine gidin.
    *   **Not:** Veritabanı (PostgreSQL) otomatik olarak oluşturulur ve örnek veriler (Oteller, Hizmetler) sistem ilk açıldığında otomatik yüklenir (Auto-Seed).

---

## ✨ Temel Özellikler ve Kullanım Klavuzu

### 1. Müşteri Ekranı (Üye ve Misafir Deneyimi)

Sistem hibrit bir yapıda olduğu için iki farklı rezervasyon türünü destekler:

*   **Otel Rezervasyonu (Konaklama):**
    *   **Nasıl Yapılır?** Ana sayfada "Otel" etiketli işletmeleri seçin. Oda listesini görmek için giriş ve çıkış tarihlerini belirleyin. Müsait (yeşil) bir odaya tıklayarak rezervasyonu tamamlayın.
    *   **Özellik:** Tarih bazlı kontrol yapar, çakışan rezervasyonlara izin vermez.
*   **Randevu Sistemi (Hizmet):**
    *   **Nasıl Yapılır?** "Randevu" etiketli profesyonel hizmetleri (Kuaför, Klinik vb.) seçin. Takvimden bir gün seçtiğinizde o gün için tanımlanmış saat dilimleri (`09:00 - 10:00` vb.) karşınıza gelir. Uygun bir saat seçip onaylayın.
*   **Rezervasyonlarım:** Giriş yapmış kullanıcılar, sağ üstteki menüden tüm geçmiş ve aktif rezervasyonlarını tipine göre (Otel/Randevu) detaylıca inceleyebilir.

### 2. Yönetim Paneli (Admin Deneyimi)

Sistemi yönetmek için sol üstteki **Yönetim Paneli** veya **İşletme Yönetimi** sekmeleri kullanılır.

*   **İşletme Yönetimi:**
    *   **Erişim:** Navbar -> İşletme Yönetimi.
    *   **İşlem:** Sisteme yeni oteller veya salonlar ekleyebilir, mevcut işletmelerin adres ve resim bilgilerini güncelleyebilirsiniz.
*   **Hizmet & Oda Yönetimi:**
    *   **Erişim:** Yönetim Paneli -> Hizmet/Oda Yönetimi.
    *   **İşlem:** Otellerinize yeni oda numaraları ekleyebilir veya salonlarınız için yeni hizmetler tanımlayabilirsiniz.
    *   **Müsaitlik Tanımlama (Kritik):** Randevu hizmetleri için "Müsaitlik Tanımla" butonuna basarak 7 günlük otomatik çalışma takvimi oluşturabilirsiniz. Saat dilimleri bu işlemden sonra müşteriye görünür olur.
*   **Rezervasyon Onaylama:**
    *   **Erişim:** Yönetim Paneli -> Rezervasyonlar.
    *   **İşlem:** Gelen tüm talepler "Beklemede" (Pending) olarak düşer. Admin buradan "Onayla" veya "Reddet" diyerek süreci yönetir.

### 3. Sistem Günlükleri (Logs)
Sistemde yapılan tüm kritik işlemler (Giriş, Rezervasyon, Silme) admin tarafından "Sistem Günlükleri" sayfasından anlık olarak takip edilebilir.

---

## 🛠️ Teknik Altyapı
*   **Backend:** Python Flask & SQLAlchemy
*   **Frontend:** Vanilla JS & Modern CSS
*   **Veritabanı:** PostgreSQL
*   **Güvenlik:** JWT tabanlı kimlik doğrulama

---
*ReserveLink - Konforlu Konaklama ve Akıllı Randevu Çözümleri.*
