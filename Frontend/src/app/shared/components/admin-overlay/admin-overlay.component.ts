import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Floating Toggle Button -->
    <button class="admin-fab" (click)="togglePanel()" [class.active]="isOpen">
      <span class="material-symbols-outlined">{{ isOpen ? 'close' : 'settings' }}</span>
      <span class="label">Yönetim Paneli</span>
    </button>

    <!-- Slide-in Panel Illusion -->
    <div class="admin-panel" [class.open]="isOpen">
      <div class="panel-header">
        <h3>İşletme Yönetimi</h3>
        <p>{{ businessName }} için kontrol merkezi</p>
      </div>

      <div class="panel-body">
        <div class="quick-stats">
          <div class="q-stat">
            <span class="q-label">Bugünkü Randevular</span>
            <span class="q-value">12</span>
          </div>
          <div class="q-stat">
            <span class="q-label">Bekleyen Mesajlar</span>
            <span class="q-value">5</span>
          </div>
        </div>

        <div class="nav-links">
            <div class="fake-link"><span class="material-symbols-outlined">analytics</span> Performans Analizi</div>
            <div class="fake-link"><span class="material-symbols-outlined">calendar_month</span> Takvim Yönetimi</div>
            <div class="fake-link"><span class="material-symbols-outlined">inventory_2</span> Ürün/Hizmet Listesi</div>
            <div class="fake-link"><span class="material-symbols-outlined">palette</span> Tema Özelleştirme</div>
        </div>

        <div class="demo-notice">
          <span class="material-symbols-outlined">info</span>
          <p>Bu bir önizleme panelidir. Tam sürümde tüm ayarlar aktiftir.</p>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div class="backdrop" *ngIf="isOpen" (click)="togglePanel()"></div>

    <!-- Toast Notification -->
    <div class="admin-toast" [class.show]="toastMessage">
        <span class="material-symbols-outlined">check_circle</span>
        {{ toastMessage }}
    </div>
  `,
  styles: [`
    /* Toast Styles */
    .admin-toast {
        position: fixed;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: #000;
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 99px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 3000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        font-weight: 600;
    }
    .admin-toast.show { transform: translateX(-50%) translateY(0); }

    .admin-fab {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 2000;
      background: #fff;
      color: #000;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 99px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      font-size: 0.875rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .admin-fab:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
    .admin-fab.active { background: #000; color: #fff; }

    .admin-panel {
      position: fixed;
      top: 0;
      right: -400px;
      width: 380px;
      height: 100vh;
      background: #fff;
      z-index: 1001;
      box-shadow: -10px 0 50px rgba(0,0,0,0.1);
      transition: right 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      color: #000;
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
    }
    .admin-panel.open { right: 0; }

    .panel-header h3 { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
    .panel-header p { color: #666; font-size: 0.875rem; margin-bottom: 2.5rem; }

    .quick-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2.5rem;
    }
    .q-stat {
      background: #f4f4f5;
      padding: 1rem;
      border-radius: 12px;
    }
    .q-label { font-size: 0.7rem; color: #666; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem; }
    .q-value { font-size: 1.25rem; font-weight: 800; }

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 2rem;
    }
    .fake-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 12px;
      font-weight: 600;
      color: #333;
      cursor: pointer;
      transition: all 0.2s;
    }
    .fake-link:hover { background: #f4f4f5; color: #000; }
    .fake-link .material-symbols-outlined { color: #888; }

    .panel-actions { margin-top: auto; margin-bottom: 1.5rem; }
    .save-btn {
        width: 100%;
        background: #000;
        color: #fff;
        border: none;
        padding: 1.25rem;
        border-radius: 14px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        cursor: pointer;
        transition: all 0.3s;
    }
    .save-btn:hover { background: #333; }
    .save-btn:disabled { opacity: 0.7; cursor: not-allowed; }

    .spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .demo-notice {
      background: #f4f4f5;
      color: #666;
      padding: 1rem;
      border-radius: 12px;
      display: flex;
      gap: 1rem;
      align-items: center;
      font-size: 0.75rem;
    }
    .demo-notice p { margin: 0; }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.2);
      backdrop-filter: blur(4px);
      z-index: 1000;
    }
  `]
})
export class AdminOverlayComponent {
  @Input() businessName: string = '';
  isOpen = false;
  isSaving = false;
  toastMessage = '';

  togglePanel() {
    this.isOpen = !this.isOpen;
  }

  showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => {
        this.toastMessage = '';
    }, 3000);
  }

  saveSimulation() {
    this.isSaving = true;
    setTimeout(() => {
        this.isSaving = false;
        this.showToast('Değişiklikler başarıyla kaydedildi.');
    }, 1500);
  }
}
