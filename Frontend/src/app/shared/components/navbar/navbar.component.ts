import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed-nav" [class.nav-open]="isMenuOpen">
      <div class="nav-content">
        <span class="logo-text">{{ businessName || 'Portfolio Pro' }}</span>
        
        <div class="nav-links desktop-only">
          <a *ngFor="let link of navLinks" [href]="link.url">{{ link.label }}</a>
        </div>

        <div class="nav-actions">
          <div class="contact-dropdown desktop-only">
            <a href="#contact" class="hire-btn flex-center gap-2">
              İletişim
              <span class="material-symbols-outlined nav-arrow">keyboard_arrow_up</span>
            </a>
            <div class="dropdown-menu shadow-glow">
              <a [href]="'mailto:' + email" class="dropdown-item">
                <span class="material-symbols-outlined">mail</span>
                <span>Mail Gönder</span>
              </a>
              <a [href]="'https://wa.me/' + phone" target="_blank" class="dropdown-item">
                <span class="material-symbols-outlined">chat</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <button class="hamburger-btn mobile-only" (click)="toggleMenu()" [class.active]="isMenuOpen">
            <span class="bar top"></span>
            <span class="bar mid"></span>
            <span class="bar bot"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" [class.active]="isMenuOpen">
        <div class="mobile-menu-content">
          <div class="mobile-links" (click)="closeMenu()">
            <a *ngFor="let link of navLinks" [href]="link.url">{{ link.label }}</a>
          </div>
          <div class="mobile-contact">
             <button (click)="toggleMobileContact($event)" class="hire-btn w-full justify-center gap-2">
               İletişim
               <span class="material-symbols-outlined nav-arrow" [style.transform]="isMobileContactOpen ? 'rotate(180deg)' : 'rotate(0)'">keyboard_arrow_down</span>
             </button>
             
             <!-- Mobile Dropdown Items (Accordion) -->
             <div class="mobile-sub-menu" [class.active]="isMobileContactOpen">
                <a [href]="'mailto:' + email" class="sub-item" (click)="closeMenu()">
                  <span class="material-symbols-outlined">mail</span>
                  <span>Mail Gönder</span>
                </a>
                <a [href]="'https://wa.me/' + phone" target="_blank" class="sub-item" (click)="closeMenu()">
                  <span class="material-symbols-outlined">chat</span>
                  <span>WhatsApp</span>
                </a>
             </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .flex-center { display: flex; align-items: center; justify-content: center; }
    .gap-2 { gap: 0.5rem; }
    .w-full { width: 100%; }
    .justify-center { justify-content: center; }

    .fixed-nav {
      position: fixed;
      top: 0;
      width: 100%;
      background-color: rgba(14, 14, 14, 0.85);
      backdrop-filter: blur(24px);
      z-index: 1000;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 2rem;
      width: 100%;
      max-width: 85rem;
      margin: 0 auto;
      position: relative;
      z-index: 1001;
    }

    .logo-text {
      font-family: 'Inter', sans-serif;
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: -0.05em;
      color: #ffffff;
    }

    .nav-actions { display: flex; align-items: center; gap: 1.5rem; }

    /* Desktop/Mobile Visibility Threshold: Fluid transition */
    .desktop-only { display: none !important; }
    .mobile-only { display: flex !important; }
    
    @media (min-width: 850px) { 
      .desktop-only { display: flex !important; } 
      .mobile-only { display: none !important; } 
    }

    .nav-links { gap: 1rem; }
    @media (min-width: 1024px) { .nav-links { gap: 1.5rem; } }
    @media (min-width: 1280px) { .nav-links { gap: 2.5rem; } }

    @media (max-width: 1024px) {
      .nav-content { padding: 1rem 1.5rem; }
      .logo-text { font-size: 1.25rem; }
      ::ng-deep .nav-links a { font-size: 0.7rem; letter-spacing: 0.05em; }
      .hire-btn { padding: 0.65rem 1.25rem; font-size: 0.8rem; }
    }
    ::ng-deep .nav-links a {
      font-family: 'Manrope', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 700;
      text-decoration: none;
      transition: color 0.3s;
    }
    ::ng-deep .nav-links a:hover, ::ng-deep .nav-links a.active { color: #b0a2ff; }

    .hire-btn {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(to bottom right, #7556ff, #b0a2ff);
      color: #000000;
      font-weight: 800;
      padding: 0.75rem 1.75rem;
      border-radius: 0px; 
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      cursor: pointer;
      border: none;
    }

    .hamburger-btn {
      background: none; border: none; padding: 10px; cursor: pointer;
      flex-direction: column; gap: 6px; z-index: 2000;
    }
    .bar { width: 28px; height: 2px; background: #fff; transition: 0.4s; }
    .hamburger-btn.active .top { transform: translateY(8px) rotate(45deg); }
    .hamburger-btn.active .mid { opacity: 0; }
    .hamburger-btn.active .bot { transform: translateY(-8px) rotate(-45deg); }

    .mobile-menu-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
      background: #0a0a0a; padding-top: 100px;
      transform: translateX(100%); transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
      z-index: 999;
    }
    .mobile-menu-overlay.active { transform: translateX(0); }

    .mobile-menu-content { padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }
    .mobile-links { display: flex; flex-direction: column; gap: 1.5rem; }
    ::ng-deep .mobile-links a {
      font-size: 1.75rem; font-weight: 800; color: #fff; text-transform: uppercase;
      font-family: var(--font-display);
    }
    
    .mobile-sub-menu {
      max-height: 0; overflow: hidden; transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      background: rgba(255,255,255,0.03); margin-top: 0.5rem;
    }
    .mobile-sub-menu.active { max-height: 200px; padding: 1rem 0; }
    .sub-item {
      display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem;
      color: rgba(255,255,255,0.8); text-decoration: none; font-weight: 600;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .sub-item:last-child { border-bottom: none; }
    .sub-item .material-symbols-outlined { color: #b0a2ff; }
    
    .dropdown-menu {
      position: absolute; top: 100%; right: 0; margin-top: 1rem;
      background: #1a1919; border: 1px solid rgba(176, 162, 255, 0.2);
      border-radius: 0px; padding: 0.75rem; min-width: 200px;
      opacity: 0; visibility: hidden; transform: translateY(10px);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .contact-dropdown:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }
    .dropdown-item {
      display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem;
      color: rgba(255, 255, 255, 0.8); font-size: 0.875rem; font-weight: 600;
      border-radius: 0px; transition: all 0.2s;
    }
    .dropdown-item:hover { background: rgba(176, 162, 255, 0.1); color: #b0a2ff; transform: translateX(5px); }
    .nav-arrow { transition: 0.3s; }
    .contact-dropdown:hover .nav-arrow { transform: rotate(180deg); }
  `]
})
export class NavbarComponent {
  @Input() businessName = '';
  @Input() isDemo = true;
  @Input() email = '';
  @Input() phone = '';
  @Input() navLinks: { label: string, url: string }[] = [];

  isMenuOpen = false;
  isMobileContactOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMobileContactOpen = false; // Reset sub-menu
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  toggleMobileContact(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isMobileContactOpen = !this.isMobileContactOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isMobileContactOpen = false;
    document.body.style.overflow = '';
  }
}
