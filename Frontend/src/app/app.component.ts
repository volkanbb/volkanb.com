import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { DomainService } from './core/services/domain.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'VolkanB Portfolio';

  constructor(
    private domainService: DomainService,
    private router: Router
  ) {}

  ngOnInit() {
    const activeDemo = this.domainService.getActiveDemo();
    
    if (activeDemo) {
      console.log('Demo Mode Detected:', activeDemo);
      document.body.classList.add(`demo-mode`, `theme-${activeDemo}`);
      
      // If we are at root in a subdomain, navigate to the demo page
      if (window.location.pathname === '/' || window.location.pathname === '') {
        this.router.navigate([`/${activeDemo}`]);
      }
    }
  }
}
