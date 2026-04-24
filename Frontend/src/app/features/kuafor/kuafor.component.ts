import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { WhatsappButtonComponent } from '../../shared/components/whatsapp-button/whatsapp-button.component';
import { AdminOverlayComponent } from '../../shared/components/admin-overlay/admin-overlay.component';

@Component({
  selector: 'app-kuafor',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ButtonComponent, WhatsappButtonComponent, AdminOverlayComponent],
  template: `
    <div class="kuafor-theme">
      <app-navbar businessName="Vogue Kuaför" [isDemo]="true">
        <a href="#hizmetler">Hizmetlerimiz</a>
        <a href="#uzmanlar">Uzmanlarımız</a>
        <a href="#iletisim">İletişim</a>
      </app-navbar>

      <main>
        <section class="hero-kuafor">
          <div class="container section-container">
            <div class="hero-content">
              <span class="eyebrow">PROFESYONEL SAÇ TASARIMI</span>
              <h1>Tarzınızı Bizimle Keşfedin</h1>
              <p>Modern kesimler, özel renklendirme teknikleri ve uzman kadromuzla saçlarınıza hak ettiği değeri veriyoruz.</p>
              <div class="btn-group">
                <app-button variant="primary" size="lg">Hemen Randevu Al</app-button>
                <app-button variant="outline" size="lg">Hizmetlerimizi Gör</app-button>
              </div>
            </div>
          </div>
        </section>

        <section id="hizmetler" class="services-kuafor section-container">
            <h2 class="section-title">Popüler Hizmetler</h2>
            <div class="services-grid">
                <div class="service-card" *ngFor="let s of services">
                    <span class="material-symbols-outlined">{{s.icon}}</span>
                    <h3>{{s.name}}</h3>
                    <p>{{s.price}}</p>
                </div>
            </div>
        </section>

        <app-whatsapp-button></app-whatsapp-button>
        <app-admin-overlay businessName="Vogue Kuaför"></app-admin-overlay>
      </main>
    </div>
  `,
  styles: [`
    .kuafor-theme {
      --k-gold: #c5a059;
      --k-dark: #121212;
      background: var(--k-dark);
      color: #fff;
      min-height: 100vh;
    }
    .hero-kuafor {
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop') center/cover;
      height: 90vh;
      display: flex;
      align-items: center;
    }
    .eyebrow { color: var(--k-gold); letter-spacing: 0.2rem; font-weight: 700; font-size: 0.75rem; display: block; margin-bottom: 1.5rem; }
    .hero-content h1 { font-size: 4.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.04em; }
    .hero-content p { font-size: 1.25rem; opacity: 0.8; margin-bottom: 3rem; max-width: 500px; }
    .btn-group { display: flex; gap: 1rem; }

    .section-title { text-align: center; margin-bottom: 4rem; font-size: 2.5rem; font-weight: 800; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .service-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.05);
        padding: 3rem 2rem;
        border-radius: 20px;
        text-align: center;
        transition: all 0.3s ease;
    }
    .service-card:hover { border-color: var(--k-gold); transform: translateY(-10px); }
    .service-card .material-symbols-outlined { font-size: 3rem; color: var(--k-gold); margin-bottom: 1.5rem; }
    .service-card h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    .service-card p { color: var(--k-gold); font-weight: 700; }
  `]
})
export class KuaforComponent implements OnInit {
  services = [
    { name: 'Modern Kesim', icon: 'content_cut', price: '450 TL' },
    { name: 'Özel Boyama', icon: 'palette', price: '1200 TL+' },
    { name: 'Saç Bakımı', icon: 'spa', price: '600 TL' },
    { name: 'Gelin Tasarımı', icon: 'celebration', price: '3500 TL+' }
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
