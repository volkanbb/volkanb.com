import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private activeDemoSubject = new BehaviorSubject<string | null>(null);
  activeDemo$ = this.activeDemoSubject.asObservable();

  constructor() {
    this.detectSubdomain();
  }

  private detectSubdomain() {
    const hostname = window.location.hostname; // e.g., kuafor.localhost or volkanb.com
    const parts = hostname.split('.');

    // Logic: If there are more than 2 parts (e.g., sub.domain.com), part[0] is the subdomain
    // For localhost (localhost or kuafor.localhost), we check if parts.length > 1
    if (parts.length > 1 && parts[parts.length - 1].toLowerCase() === 'localhost') {
      const sub = parts[0].toLowerCase();
      if (['kuafor', 'kafe', 'ecommerce', 'crm'].includes(sub)) {
        this.activeDemoSubject.next(sub);
        return;
      }
    }

    // Production logic (e.g., kuafor.volkanb.com)
    if (parts.length > 2) {
      const sub = parts[0].toLowerCase();
      if (['kuafor', 'kafe', 'ecommerce', 'crm'].includes(sub)) {
        this.activeDemoSubject.next(sub);
        return;
      }
    }

    this.activeDemoSubject.next(null);
  }

  isDemoMode(): boolean {
    return this.activeDemoSubject.value !== null;
  }

  getActiveDemo(): string | null {
    return this.activeDemoSubject.value;
  }
}
