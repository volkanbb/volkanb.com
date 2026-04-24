import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AdminOverlayComponent } from '../../shared/components/admin-overlay/admin-overlay.component';

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ButtonComponent, AdminOverlayComponent],
  template: `
    <div class="shop-theme">
      <app-navbar businessName="LUXE Boutique" [isDemo]="true">
        <a href="#koleksiyon">Koleksiyon</a>
        <a href="#yeni">Yeni Gelenler</a>
        <a href="#indirim">İndirim</a>
      </app-navbar>

      <main>
        <section class="hero-shop">
          <div class="container section-container">
            <div class="hero-content">
              <span class="eyebrow">SUMMER 2026</span>
              <h1>Zarafetin Yeni Tanımı</h1>
              <p>Özel tasarım koleksiyonlarımızla stilinizi bir üst seviyeye taşıyın. Sınırlı sayıda üretim.</p>
              <app-button variant="primary" size="lg">Şimdi Keşfet</app-button>
            </div>
          </div>
        </section>

        <section id="koleksiyon" class="products-shop section-container">
            <h2 class="section-title">Haftanın Seçimleri</h2>
            <div class="products-grid">
                <div class="product-card" *ngFor="let p of products">
                    <div class="product-img-box">
                        <img [src]="p.img" [alt]="p.name">
                        <div class="quick-add">Sepete Ekle</div>
                    </div>
                    <div class="product-info">
                        <h3>{{p.name}}</h3>
                        <p class="price">{{p.price}}</p>
                    </div>
                </div>
            </div>
        </section>

        <app-admin-overlay businessName="LUXE Boutique"></app-admin-overlay>
      </main>
    </div>
  `,
  styles: [`
    .shop-theme {
      --s-accent: #000;
      --s-bg: #fff;
      background: var(--s-bg);
      color: #000;
      min-height: 100vh;
    }
    .hero-shop {
      background: #f4f4f5 url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&auto=format&fit=crop') center/cover;
      height: 85vh;
      display: flex;
      align-items: center;
    }
    .hero-content { max-width: 600px; }
    .eyebrow { letter-spacing: 0.4rem; font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 2rem; color: #666; }
    .hero-content h1 { font-size: 5rem; font-weight: 200; margin-bottom: 2rem; letter-spacing: -0.05em; color: #000; line-height: 1; }
    .hero-content p { font-size: 1.2rem; opacity: 0.6; margin-bottom: 3.5rem; line-height: 1.8; }

    .section-title { text-align: center; margin-bottom: 5rem; font-size: 2.5rem; font-weight: 300; letter-spacing: 0.2rem; text-transform: uppercase; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; }
    
    .product-card { cursor: pointer; }
    .product-img-box {
        position: relative;
        aspect-ratio: 1/1.3;
        background: #f8f8f8;
        overflow: hidden;
        margin-bottom: 1.5rem;
    }
    .product-img-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
    .product-card:hover img { transform: scale(1.05); }
    
    .quick-add {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #000;
        color: #fff;
        padding: 1.25rem;
        text-align: center;
        font-weight: 600;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }
    .product-card:hover .quick-add { transform: translateY(0); }

    .product-info h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
    .price { font-size: 1.1rem; color: #666; }
  `]
})
export class EcommerceComponent implements OnInit {
  products = [
    { name: 'Minimalist Kol Saati', price: '2,400 TL', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800' },
    { name: 'Artisan Deri Çanta', price: '4,800 TL', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800' },
    { name: 'Premium Güneş Gözlüğü', price: '1,200 TL', img: 'https://images.unsplash.com/photo-1511499767390-945c2329bc75?q=80&w=800' },
    { name: 'Özel Seri Parfüm', price: '3,200 TL', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800' }
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
