import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AdminService } from '../../core/services/admin.service';
import { environment } from '../../../environments/environment';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  post: any = null;
  contactInfo: any = null;
  readingTime: number = 0;
  scrollProgress: number = 0;
  apiBaseUrl = environment.apiUrl;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (window.pageYOffset / totalHeight) * 100;
  }

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchPost(+id);
      }
    });

    this.adminService.getSiteContent('ContactInfo').subscribe(data => {
      this.contactInfo = data;
    });
  }

  fetchPost(id: number) {
    this.adminService.getBlogPost(id).subscribe(data => {
      this.post = data;
      this.calculateReadingTime();
      
      // Update SEO Meta
      if (this.post) {
        this.titleService.setTitle(`${this.post.title} | VolkanB Blog`);
        this.metaService.updateTag({ name: 'description', content: this.post.summary || 'VolkanB Geliştirici Günlüğü - Teknoloji ve Tasarım yazıları.' });
      }

      // Scroll to top on load
      window.scrollTo(0, 0);
    });
  }

  calculateReadingTime() {
    if (!this.post?.content) return;
    const words = this.post.content.trim().split(/\s+/).length;
    this.readingTime = Math.ceil(words / 225); // Medium uses approx 225 wpm
  }

  getImageUrl(path: string): string {
    if (!path) return '';
    return path.startsWith('http') ? path : `${this.apiBaseUrl}${path}`;
  }

  get waLink(): string {
    if (!this.contactInfo?.content) return '#';
    const phone = this.contactInfo.content.replace(/\D/g, '');
    const message = encodeURIComponent(`Merhaba, "${this.post?.title}" yazınız/hizmetiniz hakkında teklif almak istiyorum.`);
    return `https://wa.me/${phone}?text=${message}`;
  }
}
