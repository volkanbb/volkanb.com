import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  socialMedias: any[] = [];
  recentBlogs: any[] = [];
  tagline: string = 'Dijital dünyada iz bırakan, yüksek performanslı ve modern web çözümleri tasarlıyorum.';
  
  siteLinks = [
    { label: 'Ana Sayfa', url: '/#home' },
    { label: 'Hizmetler', url: '/#services' },
    { label: 'Örnek Projeler', url: '/#projects' },
    { label: 'Hakkımda', url: '/#about' },
    { label: 'Blog', url: '/#blog' },
    { label: 'SEO Analizi', url: '/seo-analiz' }
  ];

  constructor(
    private adminService: AdminService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.adminService.getSocialMedias().subscribe(res => {
      this.socialMedias = res.map(m => ({
        ...m,
        safeIcon: this.sanitizer.bypassSecurityTrustHtml(m.iconSvg)
      }));
    });

    this.adminService.getSiteContent('AboutMe').subscribe(res => {
      if (res?.content) {
        // We could extract a tagline from about content if needed
      }
    });

    this.adminService.getBlogPosts().subscribe(res => {
      this.recentBlogs = res.slice(0, 4); // Get top 4 recent posts
    });
  }
}
