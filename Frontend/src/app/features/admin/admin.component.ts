import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AdminService } from '../../core/services/admin.service';
import { SeoAnalysisService } from '../../core/services/seo-analysis.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="admin-wrapper">
      <!-- Sidebar -->
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <h2>Admin Paneli</h2>
          <p>Yönetim Merkezi</p>
        </div>
        
        <ul class="sidebar-nav">
          <li>
            <a (click)="setActiveTab('about')" [class.active]="activeTab === 'about'">Hakkımda</a>
          </li>
          <li>
            <a (click)="setActiveTab('demos')" [class.active]="activeTab === 'demos'">Örnek Projeler</a>
          </li>
          <li>
            <a (click)="setActiveTab('services')" [class.active]="activeTab === 'services'">Hizmetler</a>
          </li>
          <li>
            <a (click)="setActiveTab('blog')" [class.active]="activeTab === 'blog'">Son Bloglar / Çıkarılanlar</a>
          </li>
          <li>
            <a (click)="setActiveTab('notifications')" [class.active]="activeTab === 'notifications'">
              Bildirimler 
              <span class="noti-badge" *ngIf="unreadCount > 0">{{unreadCount}}</span>
            </a>
          </li>
          <li>
            <a (click)="setActiveTab('seo')" [class.active]="activeTab === 'seo'">SEO Analizleri</a>
          </li>
          <li>
            <a (click)="setActiveTab('settings')" [class.active]="activeTab === 'settings'">İletişim & Sosyal Medya</a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <a routerLink="/" class="btn-return">
            &#8592; Ana Sayfaya Dön
          </a>
          <a (click)="logout()" class="btn-logout">
            Çıkış Yap
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="admin-main">
        <!-- Hizmetler Section -->
        <div *ngIf="activeTab === 'services'" class="fade-in">
          <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <h1>Hizmet Yönetimi</h1>
              <p>Ana sayfadaki "Hizmetlerimiz" bölümünü buradan yönetebilirsiniz.</p>
            </div>
            <button (click)="openServiceForm()" class="btn-success">+ Yeni Hizmet</button>
          </div>

          <!-- List -->
          <div *ngIf="!showServiceForm" class="blog-list">
            <div *ngFor="let s of portfolioServices" class="admin-card blog-item">
              <div class="blog-info" style="display: flex; align-items: center; gap: 1.5rem;">
                <div class="icon-preview" style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                  <span class="material-symbols-outlined" style="color: var(--admin-primary);">{{s.icon}}</span>
                </div>
                <div>
                  <h3 style="margin:0">{{s.title}}</h3>
                  <p style="margin:4px 0 0 0; color:#64748b; font-size: 0.9rem;">{{s.description | slice:0:100}}...</p>
                </div>
              </div>
              <div class="blog-actions">
                <button (click)="editService(s)" class="btn-warning">Düzenle</button>
                <button (click)="deleteService(s.id!)" class="btn-danger">Sil</button>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div *ngIf="showServiceForm" class="admin-card fade-in">
            <h2>{{ currentService.id ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle' }}</h2>
            <hr class="divider"/>
            <div class="form-group">
              <label>Hizmet Başlığı</label>
              <input type="text" [(ngModel)]="currentService.title" class="modern-input" placeholder="Örn: SEO Hizmeti" />
            </div>
            <div class="form-group">
              <label>Açıklama</label>
              <textarea [(ngModel)]="currentService.description" rows="3" class="modern-input"></textarea>
            </div>
            <div class="form-group">
              <label>İkon İsmi (Material Symbol Name)</label>
              <input type="text" [(ngModel)]="currentService.icon" class="modern-input" placeholder="Örn: search_insights, web, smartphone" />
              <p style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">Google Material Symbols kütüphanesinden bir isim girin.</p>
            </div>
            <div class="action-row">
              <button (click)="saveService()" class="btn-primary">Kaydet</button>
              <button (click)="showServiceForm = false" class="btn-secondary">İptal</button>
            </div>
          </div>
        </div>

        <!-- Bildirimler (Notifications) Section -->
        <div *ngIf="activeTab === 'notifications'" class="fade-in">
          <div class="page-header">
            <h1>Bildirimler & Mesajlar</h1>
            <p>Ana sayfadan gönderilen iletişim formlarını buradan takip edebilirsiniz.</p>
          </div>

          <div class="blog-list">
            <div *ngFor="let noti of notifications" class="admin-card noti-item" [class.is-unread]="!noti.isRead">
              <div class="noti-content">
                <div class="noti-header">
                  <span class="noti-name">{{noti.name}}</span>
                  <span class="noti-email">{{noti.email}}</span>
                  <span class="noti-date">{{noti.createdAt | date:'short'}}</span>
                </div>
                <p class="noti-message">{{noti.message}}</p>
                <div class="noti-footer">
                   <span class="noti-ip">IP: {{noti.ipAddress}}</span>
                </div>
              </div>
              <div class="blog-actions">
                <button *ngIf="!noti.isRead" (click)="markRead(noti.id)" class="btn-success">Okundu</button>
                <button (click)="deleteNoti(noti.id)" class="btn-danger">Sil</button>
              </div>
            </div>
            <div *ngIf="notifications.length === 0" class="empty-state">
              <p>Henüz bir bildirim bulunmuyor.</p>
            </div>
          </div>
        </div>

        <!-- Hakkımda Section -->
        <div *ngIf="activeTab === 'about'" class="fade-in">
          <div class="page-header">
            <h1>Hakkımda Düzenle</h1>
            <p>Ana sayfada yer alan kişisel bilgilerinizi veya şirket profilinizi güncelleyin.</p>
          </div>
          
          <div *ngIf="aboutContent" class="admin-card">
            <div class="form-group">
              <label>Başlık</label>
              <input type="text" [(ngModel)]="aboutContent.title" class="modern-input" placeholder="Sayfa başlığını girin..." />
            </div>
            
            <div class="form-group">
              <label>Kapak Görseli (.jpg, .png)</label>
              <input type="file" (change)="onAboutImageSelected($event)" accept="image/*" class="modern-input" />
              <div *ngIf="aboutContent.imageUrl" style="margin-top:0.5rem; color:#10b981;">Görsel yüklendi: {{aboutContent.imageUrl}}</div>
              <div *ngIf="isUploadingAbout" style="margin-top:0.5rem; color:#f59e0b;">WebP formatına dönüştürülüyor...</div>
            </div>

            <div class="form-group">
              <label>CV Dosyası (.pdf)</label>
              <input type="file" (change)="onCVSelected($event)" accept=".pdf" class="modern-input" />
              <div *ngIf="aboutContent.cvUrl" style="margin-top:0.5rem; color:#10b981;">CV yüklendi: {{aboutContent.cvUrl}}</div>
              <div *ngIf="isUploadingCV" style="margin-top:0.5rem; color:#f59e0b;">Yükleniyor...</div>
            </div>

            <div class="form-group">
              <label>İçerik</label>
              <textarea [(ngModel)]="aboutContent.content" rows="6" class="modern-input" placeholder="Kendinizden bahsedin..."></textarea>
            </div>
            
            <div class="action-row">
              <button (click)="saveAboutContent()" class="btn-primary" [disabled]="isUploadingAbout || isUploadingCV">Değişiklikleri Kaydet</button>
              <div *ngIf="saveMessage" class="success-message">{{saveMessage}}</div>
            </div>
          </div>
        </div>

        <!-- Demo Projects Section -->
        <div *ngIf="activeTab === 'demos'" class="fade-in">
          <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <h1>Örnek Proje Yönetimi</h1>
              <p>Asimetrik slider içerisinde görünecek çalışmalarınızı buradan yönetin.</p>
            </div>
            <button (click)="openDemoForm()" class="btn-success">+ Yeni Proje</button>
          </div>

          <!-- Demo List -->
          <div *ngIf="!showDemoForm" class="blog-list">
            <div *ngFor="let proj of demoProjects" class="admin-card blog-item">
              <div class="blog-info">
                <h3>{{proj.title}}</h3>
                <span class="blog-date">{{proj.link}}</span>
              </div>
              <div class="blog-actions">
                <button (click)="editDemo(proj)" class="btn-warning">Düzenle</button>
                <button (click)="deleteDemo(proj.id!)" class="btn-danger">Sil</button>
              </div>
            </div>
            <div *ngIf="demoProjects.length === 0" class="empty-state">
              <p>Henüz proje bulunmuyor.</p>
            </div>
          </div>

          <!-- Demo Form -->
          <div *ngIf="showDemoForm" class="admin-card fade-in">
            <h2>{{ currentDemo.id ? 'Projeyi Düzenle' : 'Yeni Proje Ekle' }}</h2>
            <hr class="divider"/>
            <div class="form-group">
              <label>Proje Adı</label>
              <input type="text" [(ngModel)]="currentDemo.title" class="modern-input" />
            </div>
            <div class="form-group">
              <label>Açıklama (Kısa)</label>
              <input type="text" [(ngModel)]="currentDemo.description" class="modern-input" />
            </div>
            <div class="form-group">
              <label>Önizleme Görseli</label>
              <input type="file" (change)="onDemoImageSelected($event)" accept="image/*" class="modern-input" />
              <div *ngIf="isUploadingDemo" style="margin-top:0.5rem; color:#f59e0b;">Yükleniyor...</div>
            </div>
            <div class="form-group">
              <label>Yönlendirme Linki (Subdomain veya URL)</label>
              <input type="text" [(ngModel)]="currentDemo.link" class="modern-input" placeholder="http://kuafor.localhost" />
            </div>
            <div class="action-row">
              <button (click)="saveDemo()" class="btn-primary" [disabled]="isUploadingDemo">Kaydet</button>
              <button (click)="showDemoForm = false" class="btn-secondary">İptal</button>
            </div>
          </div>
        </div>

        <!-- Blog Section -->
        <div *ngIf="activeTab === 'blog'" class="fade-in">
          <div class="page-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <h1>Son Çıkarılanlar & Blog Yönetimi</h1>
              <p>Yazılarınızı, yeni çalışmalarınızı buradan kolayca yönetebilirsiniz.</p>
            </div>
            <button (click)="openBlogForm()" class="btn-success">+ Yeni Ekle</button>
          </div>

          <!-- Blog List -->
          <div *ngIf="!showBlogForm" class="blog-list">
            <div *ngFor="let post of blogPosts" class="admin-card blog-item">
              <div class="blog-info">
                <h3>{{post.title}}</h3>
                <span class="blog-date">{{post.createdAt | date:'longDate'}}</span>
              </div>
              <div class="blog-actions">
                <button (click)="editPost(post)" class="btn-warning">Düzenle</button>
                <button (click)="deletePost(post.id)" class="btn-danger">Sil</button>
              </div>
            </div>
            
            <div *ngIf="blogPosts.length === 0" class="empty-state">
              <p>Henüz kayıt bulunmuyor. Eklemek için "Yeni Ekle" butonunu kullanın.</p>
            </div>
          </div>

          <!-- Blog Form -->
          <div *ngIf="showBlogForm" class="admin-card fade-in">
            <h2>{{ currentPost.id ? 'Kaydı Düzenle' : 'Yeni Kayıt Ekle' }}</h2>
            <hr class="divider"/>
            
            <div class="form-group">
              <label>Başlık</label>
              <input type="text" [(ngModel)]="currentPost.title" class="modern-input" placeholder="Başlık..." />
            </div>

            <div class="form-group">
              <label>Görsel (İsteğe bağlı, .jpg, .png)</label>
              <input type="file" (change)="onBlogImageSelected($event)" accept="image/*" class="modern-input" />
              <div *ngIf="currentPost.imageUrl" style="margin-top:0.5rem; color:#10b981;">Görsel yüklendi: {{currentPost.imageUrl}}</div>
              <div *ngIf="isUploadingBlog" style="margin-top:0.5rem; color:#f59e0b;">WebP formatına dönüştürülüyor...</div>
            </div>
            
            <div class="form-group">
              <label>Özet</label>
              <input type="text" [(ngModel)]="currentPost.summary" class="modern-input" placeholder="Karta yazılacak kısa bir özet yazın..." />
            </div>
            
            <div class="form-group">
              <label>İçerik</label>
              <textarea [(ngModel)]="currentPost.content" rows="10" class="modern-input" placeholder="Detaylar..."></textarea>
            </div>
            
            <div class="action-row" style="margin-top: 2rem;">
              <button (click)="savePost()" class="btn-primary" [disabled]="isUploadingBlog">Kaydet</button>
              <button (click)="showBlogForm = false" class="btn-secondary">İptal Moduna Dön</button>
            </div>
          </div>
        </div>

        <!-- SEO Logs Section -->
        <div *ngIf="activeTab === 'seo'" class="fade-in">
          <div class="page-header">
            <h1>SEO Analiz Geçmişi</h1>
            <p>Sitede yapılan tüm SEO analizlerini ve sonuçlarını buradan takip edebilirsiniz.</p>
          </div>

          <div class="admin-card">
            <div class="blog-list">
              <table style="width: 100%; border-collapse: collapse; color: #fff;">
                <thead>
                  <tr style="text-align: left; border-bottom: 2px solid var(--admin-border);">
                    <th style="padding: 1rem;">Tarih</th>
                    <th style="padding: 1rem;">URL</th>
                    <th style="padding: 1rem;">Skor</th>
                    <th style="padding: 1rem;">IP Adresi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let log of seoLogs" style="border-bottom: 1px solid var(--admin-border); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
                    <td style="padding: 1rem; font-size: 0.9rem;">{{log.analyzedAt | date:'short'}}</td>
                    <td style="padding: 1rem; font-weight: 600; color: var(--admin-primary);">{{log.url}}</td>
                    <td style="padding: 1rem;">
                      <span [style.color]="getScoreColor(log.score)" style="font-weight: 800; font-size: 1.1rem;">{{log.score}}</span>
                    </td>
                    <td style="padding: 1rem; color: var(--admin-text-muted); font-size: 0.85rem;">{{log.ipAddress}}</td>
                  </tr>
                </tbody>
              </table>
              <div *ngIf="seoLogs.length === 0" class="empty-state">
                <p>Henüz analiz kaydı bulunmuyor.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Section -->
        <div *ngIf="activeTab === 'settings'" class="fade-in">
          <div class="page-header">
            <h1>İletişim & Sosyal Medya</h1>
            <p>Admin panelinden tüm erişim linklerini ve iletişim bilgilerini yönetin.</p>
          </div>

          <div class="admin-card">
            <h2>Genel İletişim Bilgileri</h2>
            <hr class="divider"/>
            <div class="form-group">
              <label>E-posta Adresi (Ekranda görünür)</label>
              <input type="text" [(ngModel)]="contactInfo.title" class="modern-input" placeholder="Örn: info@volkanb.com" />
            </div>
            <div class="form-group">
              <label>Telefon Numarası</label>
              <input type="text" [(ngModel)]="contactInfo.content" class="modern-input" placeholder="Örn: +90 555..." />
            </div>
            <button (click)="saveContactSettings()" class="btn-primary">İletişim Bilgilerini Kaydet</button>
          </div>

          <div class="admin-card" style="margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
              <h2 style="margin:0">Sosyal Medya Linkleri</h2>
              <button (click)="openSocialForm()" class="btn-success">+ Platform Ekle</button>
            </div>
            <hr class="divider"/>

            <div *ngIf="!showSocialForm" class="blog-list">
              <div *ngFor="let m of socialMedias" class="admin-card blog-item" style="padding: 1.5rem 2rem; border-color: var(--admin-border); background: rgba(255,255,255,0.02);">
                <div style="display: flex; align-items: center; gap: 1.5rem; flex: 1;">
                  <div class="social-preview" [innerHTML]="m.safeIcon" [style.color]="m.brandColor" style="width: 36px; height: 36px; display: flex; align-items: center; filter: drop-shadow(0 0 10px var(--brand-color));"></div>
                  <div>
                    <h3 style="margin:0; font-size: 1.1rem;">{{m.platformName}}</h3>
                    <p style="margin:0; color: #64748b; font-size: 0.8rem;">{{m.url}}</p>
                  </div>
                </div>
                <div class="blog-actions">
                  <button (click)="editSocial(m)" class="btn-warning" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Düzenle</button>
                  <button (click)="deleteSocial(m.id!)" class="btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Sil</button>
                </div>
              </div>
              <div *ngIf="socialMedias.length === 0" class="empty-state">
                <p>Henüz sosyal medya linki eklenmemiş.</p>
              </div>
            </div>

            <div *ngIf="showSocialForm" class="fade-in admin-card" style="box-shadow: none; border: 1px dashed var(--admin-primary); background: rgba(176,162,255,0.02);">
              <h3>{{ currentSocial.id ? 'Platformu Düzenle' : 'Yeni Platform Ekle' }}</h3>
              <hr class="divider"/>
              <div class="form-group">
                <label>Platform Adı</label>
                <input type="text" [(ngModel)]="currentSocial.platformName" class="modern-input" placeholder="YouTube, Kick, Instagram..." />
              </div>
              <div class="form-group">
                <label>Link (URL)</label>
                <input type="text" [(ngModel)]="currentSocial.url" class="modern-input" placeholder="https://..." />
              </div>
              <div class="form-group">
                <label>Marka Rengi (Hex)</label>
                <input type="color" [(ngModel)]="currentSocial.brandColor" style="height: 45px; cursor: pointer;" class="modern-input" />
              </div>
              <div class="form-group">
                <label>Logo SVG Kodu</label>
                <textarea [(ngModel)]="currentSocial.iconSvg" rows="6" class="modern-input" placeholder="<svg>...</svg>"></textarea>
                <p style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">Orijinal marka logosunun SVG kodunu buraya yapıştırın.</p>
              </div>
              <div class="action-row">
                <button (click)="saveSocial()" class="btn-primary">Kaydet</button>
                <button (click)="showSocialForm = false" class="btn-secondary">İptal</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      --admin-bg: #0a0a0a;
      --admin-surface: rgba(26, 26, 26, 0.7);
      --admin-sidebar: linear-gradient(180deg, #0f172a 0%, #020617 100%);
      --admin-primary: #b0a2ff;
      --admin-primary-dim: rgba(176, 162, 255, 0.1);
      --admin-border: rgba(255, 255, 255, 0.05);
      --admin-text: #f8fafc;
      --admin-text-muted: #94a3b8;
    }

    .admin-wrapper { 
      display: flex; 
      min-height: 100vh; 
      font-family: 'Inter', sans-serif; 
      background-color: var(--admin-bg); 
      color: var(--admin-text);
    }

    .admin-sidebar { 
      width: 280px; 
      background: var(--admin-sidebar); 
      color: #f8fafc; 
      display: flex; 
      flex-direction: column; 
      border-right: 1px solid var(--admin-border);
      z-index: 10; 
    }

    .sidebar-header { padding: 3rem 2rem 2rem; border-bottom: 1px solid var(--admin-border); }
    .sidebar-header h2 { font-size: 1.5rem; margin: 0 0 0.5rem 0; font-weight: 800; letter-spacing: -0.02em; background: linear-gradient(to right, #fff, var(--admin-primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .sidebar-header p { margin: 0; font-size: 0.85rem; color: var(--admin-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }

    .sidebar-nav { list-style: none; padding: 2rem 1rem; margin: 0; flex: 1; }
    .sidebar-nav li { margin-bottom: 0.5rem; }
    .sidebar-nav a { 
      display: block; 
      padding: 1rem 1.5rem; 
      color: var(--admin-text-muted); 
      text-decoration: none; 
      font-weight: 500; 
      border-radius: 12px; 
      cursor: pointer; 
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); 
    }
    .sidebar-nav a:hover { background-color: var(--admin-primary-dim); color: #ffffff; transform: translateX(5px); }
    .sidebar-nav a.active { background-color: var(--admin-primary); color: #000000; font-weight: 700; box-shadow: 0 0 20px rgba(176, 162, 255, 0.4); }

    .sidebar-footer { padding: 2rem; border-top: 1px solid var(--admin-border); display: flex; flex-direction: column; gap: 1rem; }
    .btn-return { background-color: var(--admin-border); color: #fff; text-align: center; padding: 0.85rem; border-radius: 10px; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; border: 1px solid transparent; }
    .btn-return:hover { background-color: rgba(255,255,255,0.1); border-color: var(--admin-primary); }
    
    .btn-logout { 
      background-color: transparent; 
      color: #ef4444; 
      text-align: center; 
      padding: 0.85rem; 
      border-radius: 10px; 
      cursor: pointer; 
      font-size: 0.9rem; 
      font-weight: 600; 
      transition: all 0.3s; 
      border: 1px solid rgba(239, 68, 68, 0.2); 
    }
    .btn-logout:hover { background-color: #ef4444; color: white; box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); }

    .admin-main { flex: 1; padding: 4rem 5rem; overflow-y: auto; background: radial-gradient(circle at top right, rgba(176,162,255,0.05), transparent 40%); }
    .page-header { margin-bottom: 3.5rem; }
    .page-header h1 { font-size: 2.5rem; color: #fff; margin: 0 0 0.75rem 0; font-weight: 800; letter-spacing: -0.03em; }
    .page-header p { color: var(--admin-text-muted); margin: 0; font-size: 1.1rem; }

    .admin-card { 
      background: var(--admin-surface); 
      backdrop-filter: blur(16px);
      border-radius: 20px; 
      padding: 3rem; 
      border: 1px solid var(--admin-border);
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .admin-card:hover { transform: translateY(-5px); box-shadow: 0 25px 50px rgba(0,0,0,0.5); }

    .form-group { margin-bottom: 2rem; }
    .form-group label { display: block; margin-bottom: 0.75rem; font-weight: 700; color: var(--admin-text); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .modern-input { 
      width: 100%; 
      padding: 1.1rem 1.25rem; 
      background: rgba(0,0,0,0.2);
      border: 1px solid var(--admin-border); 
      border-radius: 12px; 
      font-size: 1rem; 
      color: #fff; 
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
      box-sizing: border-box; 
      font-family: inherit;
    }
    .modern-input:focus { outline: none; border-color: var(--admin-primary); background: rgba(0,0,0,0.4); box-shadow: 0 0 0 4px var(--admin-primary-dim); }

    .btn-primary { 
      background-color: var(--admin-primary); 
      color: #000; 
      padding: 1rem 2.5rem; 
      border: none; 
      border-radius: 12px; 
      cursor: pointer; 
      font-weight: 800; 
      font-size: 1rem; 
      transition: all 0.3s ease; 
      box-shadow: 0 8px 20px var(--admin-primary-dim); 
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(176, 162, 255, 0.4); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-success { background-color: #10b981; color: #fff; padding: 0.85rem 1.75rem; border: none; border-radius: 12px; cursor: pointer; font-weight: 700; transition: all 0.3s; }
    .btn-success:hover { background-color: #059669; box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }

    .btn-warning { background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); padding: 0.6rem 1.25rem; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; }
    .btn-warning:hover { background-color: #f59e0b; color: #fff; }

    .btn-danger { background-color: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.6rem 1.25rem; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; }
    .btn-danger:hover { background-color: #ef4444; color: #fff; }

    .blog-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .blog-item { display: flex; justify-content: space-between; align-items: center; padding: 2rem; background: rgba(255,255,255,0.02); }
    .blog-info h3 { margin: 0 0 0.5rem 0; font-size: 1.3rem; color: #fff; font-weight: 700; }
    .blog-date { color: var(--admin-text-muted); font-size: 0.9rem; }
    
    .noti-badge { background: #ef4444; color: white; padding: 4px 10px; border-radius: 10px; font-size: 0.75rem; margin-left: 10px; font-weight: 800; box-shadow: 0 0 10px rgba(239, 68, 68, 0.4); }
    .noti-item { border-left: 4px solid var(--admin-border); transition: all 0.3s; background: rgba(255,255,255,0.01) !important; }
    .noti-item.is-unread { border-left-color: var(--admin-primary); background: rgba(176,162,255,0.05) !important; }
    .noti-name { font-weight: 800; color: #fff; font-size: 1.1rem; }
    .noti-message { color: var(--admin-text-muted); line-height: 1.8; margin-top: 1rem; }

    .divider { border: 0; height: 1px; background: var(--admin-border); margin: 2rem 0; }
    .empty-state { padding: 5rem; text-align: center; border: 1px dashed var(--admin-border); color: var(--admin-text-muted); border-radius: 20px; }
    .fade-in { animation: fadeIn 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class AdminComponent implements OnInit {
  activeTab = 'about';
  aboutContent: any = null;
  contactInfo: any = { sectionName: 'ContactInfo', title: '', content: '' };
  socialLinks: any = { sectionName: 'SocialLinks', title: '', content: '', imageUrl: '' };
  saveMessage = '';

  blogPosts: any[] = [];
  showBlogForm = false;
  currentPost: any = {};

  demoProjects: any[] = [];
  showDemoForm = false;
  currentDemo: any = {};

  portfolioServices: any[] = [];
  showServiceForm = false;
  currentService: any = {};

  socialMedias: any[] = [];
  showSocialForm = false;
  currentSocial: any = {};

  notifications: any[] = [];
  unreadCount = 0;

  seoLogs: any[] = [];

  isUploadingAbout = false;
  isUploadingBlog = false;
  isUploadingDemo = false;
  isUploadingCV = false;

  constructor(
    private adminService: AdminService,
    private seoService: SeoAnalysisService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadAbout();
    this.loadBlogs();
    this.loadDemos();
    this.loadPortfolioServices();
    this.loadSettings();
    this.loadNotifications();
    this.loadSeoLogs();
  }

  loadPortfolioServices() {
    this.adminService.getPortfolioServices().subscribe(res => this.portfolioServices = res);
  }

  openServiceForm() {
    this.currentService = { title: '', description: '', icon: 'settings' };
    this.showServiceForm = true;
  }

  editService(service: any) {
    this.currentService = { ...service };
    this.showServiceForm = true;
  }

  saveService() {
    if (this.currentService.id) {
      this.adminService.updatePortfolioService(this.currentService.id, this.currentService).subscribe(() => {
        this.loadPortfolioServices();
        this.showServiceForm = false;
      });
    } else {
      this.adminService.createPortfolioService(this.currentService).subscribe(() => {
        this.loadPortfolioServices();
        this.showServiceForm = false;
      });
    }
  }

  deleteService(id: number) {
    if(confirm('Hizmeti silmek istediğinize emin misiniz?')) {
      this.adminService.deletePortfolioService(id).subscribe(() => this.loadPortfolioServices());
    }
  }

  loadNotifications() {
    this.adminService.getNotifications().subscribe(res => {
      this.notifications = res;
      this.unreadCount = this.notifications.filter(n => !n.isRead).length;
    });
  }

  markRead(id: number) {
    this.adminService.markAsRead(id).subscribe(() => {
      this.loadNotifications();
    });
  }

  deleteNoti(id: number) {
    if(confirm('Mesajı silmek istediğinize emin misiniz?')) {
      this.adminService.deleteNotification(id).subscribe(() => {
        this.loadNotifications();
      });
    }
  }

  loadSeoLogs() {
    this.seoService.getLogs().subscribe(res => this.seoLogs = res);
  }

  getScoreColor(score: number): string {
    if (score >= 80) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.saveMessage = '';
  }

  loadAbout() {
    this.adminService.getSiteContent('AboutMe').subscribe(res => {
      this.aboutContent = res;
    });
  }

  loadSettings() {
    this.adminService.getSiteContent('ContactInfo').subscribe(res => this.contactInfo = res || this.contactInfo);
    this.adminService.getSocialMedias().subscribe(res => {
      this.socialMedias = res.map(m => ({
        ...m,
        safeIcon: this.sanitizer.bypassSecurityTrustHtml(m.iconSvg)
      }));
    });
  }

  // Social Media Crud
  openSocialForm() {
    this.currentSocial = { platformName: '', url: '', iconSvg: '', brandColor: '#ffffff', order: 0 };
    this.showSocialForm = true;
  }

  editSocial(social: any) {
    this.currentSocial = { ...social };
    this.showSocialForm = true;
  }

  saveSocial() {
    if (this.currentSocial.id) {
      this.adminService.updateSocialMedia(this.currentSocial.id, this.currentSocial).subscribe(() => {
        this.loadSettings();
        this.showSocialForm = false;
      });
    } else {
      this.adminService.createSocialMedia(this.currentSocial).subscribe(() => {
        this.loadSettings();
        this.showSocialForm = false;
      });
    }
  }

  deleteSocial(id: number) {
    if(confirm('Sosyal medya linkini silmek istediğinize emin misiniz?')) {
      this.adminService.deleteSocialMedia(id).subscribe(() => this.loadSettings());
    }
  }

  loadDemos() {
    this.adminService.getDemoProjects().subscribe(res => this.demoProjects = res);
  }

  onAboutImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isUploadingAbout = true;
      this.adminService.uploadMedia(file).subscribe({
        next: (res) => {
          this.aboutContent.imageUrl = res.url;
          this.isUploadingAbout = false;
        },
        error: () => {
          alert('Görsel yüklenemedi.');
          this.isUploadingAbout = false;
        }
      });
    }
  }

  onCVSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isUploadingCV = true;
      this.adminService.uploadMedia(file).subscribe({
        next: (res) => {
          // We'll store it in a custom field for the AboutMe section (needs imageurl or content reuse)
          // To be safe, we'll use a specific key if we added one, but let's assume we use ImageUrl for profile 
          // and maybe we need another SiteContent for CV. 
          // Actually, let's just add it to aboutContent object if we handle it in backend.
          // Since SiteContent doesn't have CV field, let's store CV in a separate SiteContent key 'CVFile'
          this.adminService.upsertSiteContent('CVFile', { title: 'CV', content: res.url }).subscribe(() => {
            this.aboutContent.cvUrl = res.url; // local update
            this.isUploadingCV = false;
          });
        }
      });
    }
  }

  saveAboutContent() {
    if (this.aboutContent) {
      this.adminService.updateSiteContent(this.aboutContent.id, this.aboutContent).subscribe(() => {
        this.saveMessage = 'Başarıyla kaydedildi!';
        setTimeout(() => this.saveMessage = '', 3000);
      });
    }
  }

  saveContactSettings() {
    this.adminService.upsertSiteContent('ContactInfo', this.contactInfo).subscribe(() => {
      this.saveMessage = 'İletişim ayarları kaydedildi!';
      setTimeout(() => this.saveMessage = '', 3000);
    });
  }

  saveSocialSettings() {
    this.adminService.upsertSiteContent('SocialLinks', this.socialLinks).subscribe(() => {
      this.saveMessage = 'Sosyal medya ayarları kaydedildi!';
      setTimeout(() => this.saveMessage = '', 3000);
    });
  }

  openDemoForm() {
    this.currentDemo = { title: '', description: '', link: '', imageUrl: '' };
    this.showDemoForm = true;
  }

  editDemo(proj: any) {
    this.currentDemo = { ...proj };
    this.showDemoForm = true;
  }

  onDemoImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isUploadingDemo = true;
      this.adminService.uploadMedia(file).subscribe({
        next: (res) => {
          this.currentDemo.imageUrl = res.url;
          this.isUploadingDemo = false;
        }
      });
    }
  }

  saveDemo() {
    if (this.currentDemo.id) {
      this.adminService.updateDemoProject(this.currentDemo.id, this.currentDemo).subscribe(() => {
        this.loadDemos();
        this.showDemoForm = false;
      });
    } else {
      this.adminService.createDemoProject(this.currentDemo).subscribe(() => {
        this.loadDemos();
        this.showDemoForm = false;
      });
    }
  }

  deleteDemo(id: number) {
    if(confirm('Projeyi silmek istediğinize emin misiniz?')) {
      this.adminService.deleteDemoProject(id).subscribe(() => this.loadDemos());
    }
  }

  loadBlogs() {
    this.adminService.getBlogPosts().subscribe(res => {
      this.blogPosts = res;
    });
  }

  openBlogForm() {
    this.currentPost = { title: '', summary: '', content: '', imageUrl: null };
    this.showBlogForm = true;
  }

  editPost(post: any) {
    this.currentPost = { ...post };
    this.showBlogForm = true;
  }

  onBlogImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isUploadingBlog = true;
      this.adminService.uploadMedia(file).subscribe({
        next: (res) => {
          this.currentPost.imageUrl = res.url;
          this.isUploadingBlog = false;
        },
        error: () => {
          alert('Görsel yüklenemedi.');
          this.isUploadingBlog = false;
        }
      });
    }
  }

  savePost() {
    if (this.currentPost.id) {
      this.adminService.updateBlogPost(this.currentPost.id, this.currentPost).subscribe(() => {
        this.loadBlogs();
        this.showBlogForm = false;
      });
    } else {
      this.adminService.createBlogPost(this.currentPost).subscribe(() => {
        this.loadBlogs();
        this.showBlogForm = false;
      });
    }
  }

  deletePost(id: number) {
    if(confirm('Silmek istediğinize emin misiniz?')) {
      this.adminService.deleteBlogPost(id).subscribe(() => {
        this.loadBlogs();
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
