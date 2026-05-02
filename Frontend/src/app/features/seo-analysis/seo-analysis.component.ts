import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SeoAnalysisService, SeoAnalysisResult, SeoAnalysisError } from '../../core/services/seo-analysis.service';
import { AdminService } from '../../core/services/admin.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-seo-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './seo-analysis.component.html',
  styleUrls: ['./seo-analysis.component.scss']
})
export class SeoAnalysisComponent implements OnInit, OnDestroy {
  urlToAnalyze: string = '';
  isAnalyzing: boolean = false;
  result: SeoAnalysisResult | null = null;
  error: string | null = null;
  history: SeoAnalysisResult[] = [];
  contactInfo: any = null;

  // Countdown timer
  countdownSeconds: number = 0;
  countdownDisplay: string = '';
  private timerInterval: any;

  siteLinks = [
    { label: 'Ana Sayfa', url: '/#home' },
    { label: 'Hizmetler', url: '/#services' },
    { label: 'Örnek Projeler', url: '/#projects' },
    { label: 'Hakkımda', url: '/#about' },
    { label: 'Blog', url: '/#blog' }
  ];

  constructor(
    private seoService: SeoAnalysisService,
    private titleService: Title,
    private metaService: Meta,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Ücretsiz SEO Analizi | VOLKANB');
    this.metaService.updateTag({ name: 'description', content: 'Web sitenizin SEO performansını ücretsiz analiz edin. Teknik SEO, İçerik ve Performans hatalarını anında görün.' });
    this.loadHistory();
    
    this.adminService.getSiteContent('ContactInfo').subscribe(data => {
      this.contactInfo = data;
    });
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  loadHistory() {
    this.history = this.seoService.getHistory();
  }

  startAnalysis() {
    if (!this.urlToAnalyze) return;
    
    // basic format check
    if (!this.urlToAnalyze.startsWith('http')) {
       this.urlToAnalyze = 'https://' + this.urlToAnalyze;
    }

    this.isAnalyzing = true;
    this.error = null;
    this.result = null;
    this.clearTimer();

    this.seoService.analyzeUrl(this.urlToAnalyze).subscribe({
      next: (res) => {
        this.result = res;
        this.isAnalyzing = false;
        this.seoService.saveToHistory(res);
        this.loadHistory();
      },
      error: (err: SeoAnalysisError) => {
        this.error = err.message;
        this.isAnalyzing = false;
        if (err.remainingSeconds && err.remainingSeconds > 0) {
           this.startCountdown(err.remainingSeconds);
        }
      }
    });
  }

  loadFromHistory(item: SeoAnalysisResult) {
    this.result = item;
    this.urlToAnalyze = item.url;
    this.error = null;
    this.clearTimer();
  }

  private startCountdown(seconds: number) {
    this.countdownSeconds = Math.floor(seconds);
    this.updateCountdownDisplay();
    
    this.timerInterval = setInterval(() => {
       this.countdownSeconds--;
       this.updateCountdownDisplay();
       if (this.countdownSeconds <= 0) {
          this.clearTimer();
          this.error = null; // Re-enable form
       }
    }, 1000);
  }

  private updateCountdownDisplay() {
     const h = Math.floor(this.countdownSeconds / 3600);
     const m = Math.floor((this.countdownSeconds % 3600) / 60);
     const s = this.countdownSeconds % 60;
     this.countdownDisplay = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.countdownSeconds = 0;
    this.countdownDisplay = '';
  }

  getScoreColor(score: number): string {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 50) return '#f59e0b'; // Yellow/Orange
    return '#ef4444'; // Red
  }

  getIssueIcon(type: string): string {
    switch (type) {
      case 'Critical': return 'error';
      case 'Warning': return 'warning';
      default: return 'info';
    }
  }

  getIssueColor(type: string): string {
    switch (type) {
      case 'Critical': return '#ef4444';
      case 'Warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  }

  get waLink(): string {
    if (!this.contactInfo?.content) return '#';
    const phone = this.contactInfo.content.replace(/\D/g, '');
    const message = encodeURIComponent(`SEO analiz raporumu inceledim, web sitemi düzeltmek/optimize etmek için teklif almak istiyorum.`);
    return `https://wa.me/${phone}?text=${message}`;
  }
}
