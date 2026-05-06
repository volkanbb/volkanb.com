import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AdminService } from '../../core/services/admin.service';
import { DomSanitizer, SafeHtml, Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <div class="lucid-theme">
      <app-navbar 
        businessName="VOLKANB" 
        [isDemo]="false" 
        [email]="contactInfo?.title" 
        [phone]="contactInfo?.content"
        [navLinks]="siteLinks">
      </app-navbar>

      <main class="main-wrapper">
        <!-- Hero Section -->
        <section id="home" class="hero-section">
          <div class="bg-blur blur-primary top-left"></div>
          <div class="bg-blur blur-secondary bottom-right"></div>
          <div class="hero-container">
            <div class="hero-text-block">
              <span class="eyebrow">Dijital Mimar & Geliştirici</span>
              <h1 class="hero-title">
                İşletmeniz İçin Ultra Hızlı <br/>
                <span class="text-gradient">Dijital Çözümler.</span>
              </h1>
              <p class="hero-subtitle">
                Kuaförler, kafeler ve e-ticaret markaları için estetik dokunuşlar sunarken; işletmenize özel web yazılımları ve yüksek performanslı dijital sistemler inşa ediyorum. Modern tasarım vizyonumla markanızı dijital dünyada ayrıcalıklı bir konuma taşıyalım.
              </p>
              <div class="hero-actions" style="display: flex; gap: 1rem; align-items: center;">
                <a href="#projects" class="btn-primary flex-center shadow-glow">Tasarımları İncele</a>
                <a routerLink="/seo-analiz" class="btn-seo flex-center shadow-glow">Ücretsiz SEO Analizi</a>
              </div>
            </div>
            <div class="hero-image-block" [style.--scroll-p]="scrollProgress">
              <img src="hero_mockup.png" class="hero-img" alt="VolkanB Dijital Çözümler Mockup - Web Tasarım ve Full Stack Yazılım Geliştirme" loading="eager" />
            </div>
          </div>
        </section>

        <!-- Projects (Demos) Section -->
        <section id="projects" class="projects-section">
          <div class="section-container">
            <div class="projects-header">
              <div class="header-titles">
                <span class="eyebrow">Seçkin Portfolyo</span>
                <h2 class="section-title">İşinizi Dijitale Taşıyın.</h2>
              </div>
              <div class="header-desc">
                <p>Müşterilerinizin ilgisini çeken lüks tasarımlar ve hızlı dönüşüm sağlayan amaca özel web çözümleri.</p>
              </div>
            </div>
            <div class="slider-wrapper-projects relative" [hidden]="demoProjects.length === 0">
              <div class="slider-controls absolute-controls" *ngIf="projectGroups.length > 1">
                <button (click)="scroll(projectSlider, -1)" class="btn-scroll btn-prev" aria-label="Önceki Projeler"><span class="material-symbols-outlined">west</span></button>
                <button (click)="scroll(projectSlider, 1)" class="btn-scroll btn-next" aria-label="Sonraki Projeler"><span class="material-symbols-outlined">east</span></button>
              </div>
              <div class="projects-slider-container" #projectSlider>
                <!-- Group Slide (4 Items) -->
                <div *ngFor="let group of projectGroups" class="bento-slide">
                  <div *ngFor="let proj of group; let j = index" 
                       class="project-card bg-surface" 
                       [ngClass]="{
                         'bento-wide': j === 0,
                         'bento-tall': j === 1,
                         'bento-small-1': j === 2,
                         'bento-small-2': j === 3
                       }">
                    <div class="card-img-wrapper">
                      <img [src]="getImageUrl(proj.imageUrl)" [alt]="proj.title + ' - VolkanB Proje Detayı'" class="project-img" loading="lazy"/>
                    </div>
                    <div class="card-content flex-grow">
                      <div class="card-header-flex">
                        <h3 class="card-title">{{proj.title}}</h3>
                        <span class="badge-tag">MODÜL v1.0</span>
                      </div>
                      <p class="card-desc">{{proj.description}}</p>
                      <a [href]="proj.link" target="_blank" rel="noopener" class="card-link mt-auto">Görüntüle <span class="material-symbols-outlined link-icon">arrow_outward</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Services Section (Compact Belt Layout) -->
        <section id="services" class="services-section relative overflow-hidden" style="padding: 5rem 0; background: var(--bg-color);">
          <div class="bg-blur blur-primary" style="top: 50%; left: 50%; transform: translate(-50%, -50%); width: 800px; height: 300px; opacity: 0.15; filter: blur(150px);"></div>
          <div class="section-container relative z-10">
            <div class="services-grid" 
                 #servicesGrid 
                 (mouseenter)="stopAutoScroll()" 
                 (mouseleave)="startAutoScroll()"
                 (touchstart)="stopAutoScroll()"
                 (touchend)="startAutoScroll()">
              <div *ngFor="let service of portfolioServices" class="service-card service-belt-card bg-surface transition-all hover:shadow-glow">
                <div class="service-content-flex">
                  <div class="service-icon-box small-icon">
                    <span class="material-symbols-outlined">{{service.icon}}</span>
                  </div>
                  <div class="service-text">
                    <h3 class="service-card-title small-title">{{service.title}}</h3>
                    <p class="service-card-desc tiny-desc">{{service.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- About Section -->
        <section id="about" class="about-section">
          <div class="section-container">
            <div class="about-dashboard-grid">
              <div class="profile-identity-card outline-border shadow-glow relative overflow-hidden">
                <div class="bg-blur blur-primary identity-blur absolute"></div>
                <div class="identity-header flex-col">
                   <div *ngIf="aboutContent?.imageUrl" class="uploaded-profile-wrapper relative mb-8">
                      <div class="profile-glow"></div>
                      <img [src]="getImageUrl(aboutContent.imageUrl)" class="profile-thumb relative z-10 shadow-glow" alt="VolkanB - Dijital Mimar ve Full Stack Geliştirici" />
                   </div>
                  <div class="identity-info">
                    <span class="eyebrow">Portfolyo Sahibi</span>
                    <h2 class="identity-title mb-4">{{ aboutContent?.title || 'Estetik ve performans, ayrıntılarda gizlidir.' }}</h2>
                    <div class="identity-bio">
                      <p *ngIf="aboutContent?.content">{{ aboutContent.content }}</p>
                    </div>
                  </div>
                </div>
                <div class="identity-actions mt-10" *ngIf="cvUrl">
                  <a [href]="getImageUrl(cvUrl)" target="_blank" rel="noopener" class="btn-outline w-full flex-center gap-2" style="padding: 1.25rem; border-radius: 16px; font-size: 0.9rem; width: 100%;" title="VolkanB Özgeçmiş İndir - PDF">
                    <span class="material-symbols-outlined">description</span>
                    Özgeçmişimi İndir (.PDF)
                  </a>
                </div>
              </div>
              <div class="skills-dashboard-col">
                <div class="skills-grid h-full">
                  <div class="skill-card outline-border h-full">
                    <div class="skill-icon-wrapper"><span class="material-symbols-outlined icon-primary">design_services</span></div>
                    <h4 class="skill-title">Görsel Tasarım</h4>
                    <p class="skill-desc">Tipografi, Premium Arayüzler, UX/UI Optimizasyonu.</p>
                  </div>
                  <div class="skill-card outline-border h-full">
                    <div class="skill-icon-wrapper"><span class="material-symbols-outlined icon-primary">code_blocks</span></div>
                    <h4 class="skill-title">Modern Kodlama</h4>
                    <p class="skill-desc">C#, Python ve Node.js dillerinde ASP.NET Core, Angular ve Flutter ile modern web ve mobil çözümler üretiyor; PostgreSQL, Docker, DevOps ve API entegrasyonlarıyla ölçeklenebilir sistemler inşa ediyorum.</p>
                  </div>
                  <div class="skill-card outline-border h-full">
                    <div class="skill-icon-wrapper"><span class="material-symbols-outlined icon-primary">search_insights</span></div>
                    <h4 class="skill-title">SEO & Performans</h4>
                    <p class="skill-desc">Arama motoru görünürlüğü ve ultra hızlı yükleme süreleri.</p>
                  </div>
                  <div class="skill-card outline-border h-full">
                    <div class="skill-icon-wrapper"><span class="material-symbols-outlined icon-primary">precision_manufacturing</span></div>
                    <h4 class="skill-title">Otomasyon & Veri</h4>
                    <p class="skill-desc">İş akışlarınızı dijitalleştiren akıllı sistemler ve entegrasyonlar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Videos Section -->
        <section id="videos" class="videos-section relative overflow-hidden" [hidden]="portfolioVideos.length === 0" style="padding: 5rem 0;">
          <div class="bg-blur blur-secondary slider-blur" style="top: 20%; left: 10%;"></div>
          <div class="section-container relative z-10">
            <div class="text-center mb-12">
              <span class="eyebrow mx-auto">Video İçerikler</span>
              <h2 class="section-title text-center">İzlemeye Değer.</h2>
            </div>
            <div class="slider-container-wrapper relative">
              <div class="slider-controls absolute-controls" [hidden]="portfolioVideos.length <= 1">
                  <button (click)="scroll(videoSlider, -1)" class="btn-scroll btn-prev"><span class="material-symbols-outlined">west</span></button>
                  <button (click)="scroll(videoSlider, 1)" class="btn-scroll btn-next"><span class="material-symbols-outlined">east</span></button>
              </div>
              <div class="slider-container videos-slider" #videoSlider>
                <div *ngFor="let video of portfolioVideos" 
                     class="video-card outline-border" 
                     [ngClass]="{'vertical-video': video.isVertical, 'horizontal-video': !video.isVertical}">
                  <div class="iframe-container">
                    <!-- Thumbnail Cover with Link -->
                    <a [href]="video.youtubeUrl" target="_blank" rel="noopener" class="video-cover">
                      <img [src]="getYouTubeThumbnail(video.youtubeUrl)" alt="Video Cover" class="video-thumbnail" />
                      <div class="play-overlay">
                        <div class="play-button shadow-glow">
                          <span class="material-symbols-outlined">play_arrow</span>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="video-info">
                    <h3 class="video-title">{{video.title}}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog Section -->
        <section id="blog" class="blog-section relative overflow-hidden">
          <div class="bg-blur blur-primary slider-blur"></div>
          <div class="section-container relative z-10">
            <div class="text-center mb-12">
              <span class="eyebrow mx-auto">Son Gelişmeler</span>
              <h2 class="section-title text-center">Geliştirici Günlüğü.</h2>
            </div>
            <div class="slider-container-wrapper relative" [hidden]="blogPosts.length === 0">
              <div class="slider-controls absolute-controls">
                  <button (click)="scroll(blogSlider, -1)" class="btn-scroll btn-prev"><span class="material-symbols-outlined">west</span></button>
                  <button (click)="scroll(blogSlider, 1)" class="btn-scroll btn-next"><span class="material-symbols-outlined">east</span></button>
              </div>
              <div class="slider-container" #blogSlider>
                <div class="slider-card outline-border" *ngFor="let post of blogPosts">
                  <div class="card-img-wrapper" style="height:200px;">
                    <img class="project-img" [src]="post.imageUrl ? getImageUrl(post.imageUrl) : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600'" [alt]="post.title + ' - VolkanB Geliştirici Günlüğü'" loading="lazy" />
                  </div>
                  <div class="card-content flex-grow flex-col">
                    <span class="date-tag">{{post.createdAt | date}}</span>
                    <h3 class="card-title">{{post.title}}</h3>
                    <p class="card-desc flex-grow mb-6">{{post.summary}}</p>
                    <a [routerLink]="['/blog', post.id]" class="card-link" [title]="post.title + ' yazısını oku'">Devamını Oku <span class="material-symbols-outlined link-icon">arrow_outward</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="contact-section relative overflow-hidden" style="padding: 8rem 0;">
          <div class="bg-blur blur-primary contact-blur absolute"></div>
          <div class="section-container relative z-10">
            <div class="contact-grid">
              <div class="contact-left">
                <span class="eyebrow">Başlamaya Hazır Mısınız?</span>
                <h2 class="section-title mb-10 leading-tight" style="font-size:3.5rem;">Projelerinizi Hayata Geçirelim.</h2>
                <div class="contact-methods">
                  <div class="method-item" *ngIf="contactInfo?.title">
                    <a [href]="'mailto:' + contactInfo.title" class="flex items-center gap-6 group no-underline">
                      <div class="icon-circle bg-surface outline-border group-hover:border-primary transition-all duration-300">
                        <span class="material-symbols-outlined">alternate_email</span>
                      </div>
                      <div>
                        <p class="method-eyebrow">E-Posta</p>
                        <span class="method-val group-hover:text-primary transition-colors">{{contactInfo.title}}</span>
                      </div>
                    </a>
                  </div>
                  <div class="method-item" *ngIf="contactInfo?.content">
                    <a [href]="'https://wa.me/' + contactInfo.content" target="_blank" rel="noopener" class="flex items-center gap-6 group no-underline" title="VolkanB ile WhatsApp üzerinden iletişime geç">
                      <div class="icon-circle bg-surface outline-border group-hover:border-primary transition-all duration-300">
                        <span class="material-symbols-outlined">chat_bubble</span>
                      </div>
                      <div>
                        <p class="method-eyebrow">WhatsApp</p>
                        <span class="method-val group-hover:text-primary transition-colors">Hemen Mesaj Gönder</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="contact-form-container shadow-2xl outline-border">
                <form class="lucid-form" (ngSubmit)="submitContact()" #contactForm="ngForm">
                  <div class="form-group">
                    <label>Adınız</label>
                    <input type="text" name="name" [(ngModel)]="contactData.name" required placeholder="İsminiz nedir?" />
                  </div>
                  <div class="form-group">
                    <label>E-Posta Adresi</label>
                    <input type="email" name="email" [(ngModel)]="contactData.email" required placeholder="ornek@mail.com" />
                  </div>
                  <div class="form-group">
                    <label>Proje Detayları</label>
                    <textarea name="message" [(ngModel)]="contactData.message" required rows="4" placeholder="İhtiyaçlarınızdan kısaca bahsedin..."></textarea>
                  </div>
                  <div *ngIf="formMessage" [ngStyle]="{'color': isError ? '#ef4444' : '#10b981'}" style="margin-bottom: 1.5rem; font-weight: 600;">{{formMessage}}</div>
                  <button type="submit" class="btn-primary form-submit" [disabled]="contactForm.invalid || isSubmitting">{{ isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder' }}</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <!-- Floating Action Stack -->
        <div class="floating-stack">
          <button (click)="scrollToTop()" class="stack-btn scroll-top-btn shadow-glow">
            <span class="material-symbols-outlined">north</span>
            <span class="btn-tooltip">Yukarı Çık</span>
          </button>
          <a *ngFor="let m of socialMedias" 
             [href]="m.url" 
             target="_blank" 
             rel="noopener"
             class="stack-btn dynamic-social-btn" 
             [style.--brand-color]="m.brandColor"
             [title]="m.platformName + ' üzerinden bağlan'">
            <div class="svg-icon" [innerHTML]="m.safeIcon"></div>
            <span class="btn-tooltip">{{m.platformName}}</span>
          </a>
        </div>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('servicesGrid') servicesGrid!: ElementRef<HTMLElement>;

  aboutContent: any = null;
  cvUrl: string | null = null;
  contactInfo: any = null;
  socialLinks: any = null;
  socialMedias: any[] = [];
  blogPosts: any[] = [];
  demoProjects: any[] = [];
  portfolioServices: any[] = [];
  portfolioVideos: any[] = [];
  apiBaseUrl = environment.apiUrl;

  contactData = { name: '', email: '', message: '' };
  isSubmitting = false;
  formMessage = '';
  isError = false;

  siteLinks = [
    { label: 'Ana Sayfa', url: '#home' },
    { label: 'Hizmetler', url: '#services' },
    { label: 'Örnek Projeler', url: '#projects' },
    { label: 'Hakkımda', url: '#about' },
    { label: 'Videolar', url: '#videos' },
    { label: 'Blog', url: '#blog' },
    { label: 'SEO Analizi', url: '/seo-analiz' }
  ];

  private autoScrollInterval: any;

  get projectGroups() {
    const groups = [];
    for (let i = 0; i < this.demoProjects.length; i += 4) {
      groups.push(this.demoProjects.slice(i, i + 4));
    }
    return groups;
  }

  scrollProgress = 0;
  private revealObserver: IntersectionObserver | null = null;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollProgress = Math.min(window.pageYOffset / 1000, 1);
  }

  constructor(
    private adminService: AdminService, 
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle('VOLKANB | Dijital Mimar & Geliştirici - Premium SaaS Çözümleri');
    this.metaService.updateTag({ name: 'description', content: 'İşletmeniz için ultra hızlı dijital çözümler. Web yazılımları, modern tasarım ve yüksek performanslı sistemler.' });

    this.adminService.getSiteContent('AboutMe').subscribe(res => this.aboutContent = res);
    this.adminService.getSiteContent('CVFile').subscribe(res => this.cvUrl = res?.content);
    this.adminService.getSiteContent('ContactInfo').subscribe(res => this.contactInfo = res);
    
    this.adminService.getSocialMedias().subscribe(res => {
      this.socialMedias = res.map(m => ({
        ...m,
        safeIcon: this.sanitizer.bypassSecurityTrustHtml(m.iconSvg)
      }));
    });

    this.adminService.getBlogPosts().subscribe(res => {
        this.blogPosts = res;
    });
    this.adminService.getDemoProjects().subscribe(res => {
      this.demoProjects = res;
    });
    this.adminService.getPortfolioServices().subscribe(res => this.portfolioServices = res);
    this.adminService.getPortfolioVideos().subscribe(res => this.portfolioVideos = res);
    this.addStructuredData();
  }

  addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "VolkanB - Dijital Mimar & Geliştirici",
      "image": "https://volkanb.com/hero_mockup.png",
      "@id": "https://volkanb.com",
      "url": "https://volkanb.com",
      "telephone": "+905000000000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Antalya",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.8841,
        "longitude": 30.7056
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "22:00"
      },
      "sameAs": [
        "https://www.linkedin.com/in/volkanb",
        "https://github.com/volkanbb"
      ]
    });
    document.head.appendChild(script);
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startAutoScroll() {
    if (this.autoScrollInterval) return;
    this.autoScrollInterval = setInterval(() => {
      this.scrollServices();
    }, 3000);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  private scrollServices() {
    if (!this.servicesGrid) return;
    const el = this.servicesGrid.nativeElement;
    
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    
    if (isAtEnd) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: 260, behavior: 'smooth' });
    }
  }

  submitContact() {
    this.isSubmitting = true;
    this.formMessage = '';
    this.adminService.sendContactMessage(this.contactData).subscribe({
      next: (res) => {
        this.formMessage = res.message;
        this.isError = false;
        this.isSubmitting = false;
        this.contactData = { name: '', email: '', message: '' };
      },
      error: (err) => {
        this.formMessage = err.error?.message || 'Mesaj gönderilirken bir hata oluştu.';
        this.isError = true;
        this.isSubmitting = false;
      }
    });
  }

  getImageUrl(url: string | null): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${this.apiBaseUrl}${url}`;
  }

  scroll(el: HTMLElement, direction: number) {
    const scrollAmount = el.clientWidth * 0.8 * direction;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  getYouTubeVideoId(url: string): string {
    if (!url) return '';
    let videoId = '';
    
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) videoId = videoId.substring(0, ampersandPosition);
    } else if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('shorts/')[1];
      const queryParamPosition = videoId.indexOf('?');
      if (queryParamPosition !== -1) videoId = videoId.substring(0, queryParamPosition);
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
      const queryParamPosition = videoId.indexOf('?');
      if (queryParamPosition !== -1) videoId = videoId.substring(0, queryParamPosition);
    }
    
    return videoId;
  }

  getYouTubeThumbnail(url: string): string {
    const videoId = this.getYouTubeVideoId(url);
    if (!videoId) return '';
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
}
