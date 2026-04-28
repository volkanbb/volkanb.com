import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-container py-xl overflow-hidden relative">
      <div class="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-xl items-center relative z-10">
        <div>
          <h2 class="font-display-md text-primary mb-md">{{ ls.t().contact.title }}</h2>
          <p class="font-body-lg text-on-surface-variant mb-lg">{{ ls.t().contact.desc }}</p>
          
          <div class="space-y-8">
            <div class="flex items-start gap-md">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary">location_on</span>
              </div>
              <div>
                <h4 class="font-headline-md text-on-surface">{{ ls.t().contact.addressTitle }}</h4>
                <p class="text-on-surface-variant mt-1">{{ ls.t().contact.address }}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-md">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary">call</span>
              </div>
              <div>
                <h4 class="font-headline-md text-on-surface">{{ ls.t().contact.phoneTitle }}</h4>
                <p class="text-on-surface-variant mt-1">{{ ls.t().contact.phone }}</p>
              </div>
            </div>
            
            <div class="flex items-start gap-md">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary">mail</span>
              </div>
              <div>
                <h4 class="font-headline-md text-on-surface">{{ ls.t().contact.emailTitle }}</h4>
                <p class="text-on-surface-variant mt-1">{{ ls.t().contact.email }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="rounded-2xl overflow-hidden h-[450px] shadow-2xl border-4 border-white">
          <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            style="border:0" 
            [src]="mapUrl" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class ContactComponent {
  ls = inject(LanguageService);
  private sanitizer = inject(DomSanitizer);

  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.232338274431!2d-73.99849202417436!3d40.718228371392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25988203f51c1%3A0x673993d03a113d0!2sLittle%20Italy%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1714040000000!5m2!1sen!2sus'
  );
}
