import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { WhatsappButtonComponent } from '../../shared/components/whatsapp-button/whatsapp-button.component';
import { AdminOverlayComponent } from '../../shared/components/admin-overlay/admin-overlay.component';

@Component({
  selector: 'app-kafe',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ButtonComponent, WhatsappButtonComponent, AdminOverlayComponent],
  template: `
    <div class="kafe-theme">
      <app-navbar businessName="Espresso & Co" [isDemo]="true">
        <a href="#menu">Dijital Menü</a>
        <a href="#rezervasyon">Rezervasyon</a>
        <a href="#hakkimizda">Hikayemiz</a>
      </app-navbar>

      <main>
        <section class="hero-kafe">
          <div class="container section-container">
            <div class="hero-content">
              <span class="eyebrow">ARTISAN KAHVE DENEYİMİ</span>
              <h1>Lezzetin En Saf Hali</h1>
              <p>Özenle seçilmiş çekirdekler, ustalıkla hazırlanan tarifler ve huzurlu bir ortam sizi bekliyor.</p>
              <div class="btn-group">
                <app-button variant="primary" size="lg">Dijital Menüyü Aç</app-button>
                <app-button variant="outline" size="lg">Masa Rezerve Et</app-button>
              </div>
            </div>
          </div>
        </section>

        <section id="menu" class="menu-preivew section-container">
            <h2 class="section-title">Şefin Seçtikleri</h2>
            <div class="menu-grid">
                <div class="menu-item" *ngFor="let item of menuHighlights">
                    <div class="item-info">
                        <h3>{{item.name}}</h3>
                        <p>{{item.desc}}</p>
                    </div>
                    <div class="item-price">{{item.price}}</div>
                </div>
            </div>
            
            <!-- QR Integration Illusion -->
            <div class="qr-integration">
                <div class="qr-card">
                    <div class="qr-code-box">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://volkanb.com/demo/kafe/menu" alt="QR Menu">
                        <div class="qr-scanner-line"></div>
                    </div>
                    <div class="qr-text">
                        <h4>Dijital Menü Kapınızda</h4>
                        <p>Masadaki QR kodu taratarak siparişinizi anında verebilirsiniz.</p>
                    </div>
                </div>
            </div>
        </section>

        <app-whatsapp-button message="Merhaba, bugün için rezervasyon yaptırmak istiyorum."></app-whatsapp-button>
        <app-admin-overlay businessName="Espresso & Co"></app-admin-overlay>
      </main>
    </div>
  `,
  styles: [`
    .kafe-theme {
      --k-coffee: #d4a373;
      --k-cream: #fefae0;
      --k-dark: #1a1a1a;
      background: #0f0f0f;
      color: #fff;
      min-height: 100vh;
    }
    .hero-kafe {
      background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop') center/cover;
      height: 90vh;
      display: flex;
      align-items: center;
      text-align: center;
    }
    .hero-content { margin: 0 auto; max-width: 800px; }
    .eyebrow { color: var(--k-coffee); letter-spacing: 0.3rem; font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 2rem; }
    .hero-content h1 { font-size: 5rem; font-weight: 900; margin-bottom: 2rem; letter-spacing: -0.02em; }
    .hero-content p { font-size: 1.5rem; opacity: 0.8; margin-bottom: 3.5rem; }
    .btn-group { display: flex; gap: 1.5rem; justify-content: center; }

    .section-title { text-align: center; margin-bottom: 5rem; font-size: 3rem; font-weight: 800; }
    .menu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem 6rem; }
    @media (max-width: 850px) { .menu-grid { grid-template-columns: 1fr; } }

    .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px dashed rgba(255,255,255,0.1);
        padding-bottom: 1.5rem;
    }
    .item-info h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--k-coffee); }
    .item-info p { font-size: 0.95rem; opacity: 0.6; }
    .item-price { font-size: 1.25rem; font-weight: 800; color: #fff; }

    .qr-integration {
        margin-top: 8rem;
        display: flex;
        justify-content: center;
    }
    .qr-card {
        background: #1a1a1a;
        padding: 2.5rem;
        border-radius: 24px;
        display: flex;
        align-items: center;
        gap: 2.5rem;
        border: 1px solid rgba(255,255,255,0.05);
        max-width: 600px;
    }
    .qr-code-box {
        position: relative;
        background: #fff;
        padding: 1rem;
        border-radius: 12px;
        width: 170px;
        height: 170px;
        overflow: hidden;
    }
    .qr-code-box img { width: 100%; height: 100%; }
    .qr-scanner-line {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: #d4a373;
        box-shadow: 0 0 10px #d4a373;
        animation: scan 2s infinite ease-in-out;
    }
    @keyframes scan {
        0%, 100% { top: 5%; }
        50% { top: 95%; }
    }
    .qr-text h4 { font-size: 1.5rem; margin-bottom: 0.75rem; color: #fff; }
    .qr-text p { opacity: 0.6; line-height: 1.6; }
  `]
})
export class KafeComponent implements OnInit {
  menuHighlights = [
    { name: 'Signature Flat White', desc: 'Double shot espresso ve mikro kadifemsi süt.', price: '95 TL' },
    { name: 'Truffee Burger', desc: 'Trüf mayonezli özel dana köftesi ve karamelize soğan.', price: '340 TL' },
    { name: 'Pistachio Cheesecake', desc: 'Antep fıstıklı, beyaz çikolata soslu özel tarif.', price: '180 TL' },
    { name: 'Iced Spanish Latte', desc: 'Condensed milk ile hazırlanan tatlı ve yoğun lezzet.', price: '105 TL' }
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
