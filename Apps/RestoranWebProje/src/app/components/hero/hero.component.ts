import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative h-[819px] w-full overflow-hidden">
      <div class="absolute inset-0 bg-stone-900/40 z-10"></div>
      <img
        alt="Trattoria Bella Interior"
        class="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070"
      />
      <div class="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-gutter">
        <span class="font-label-lg text-primary-fixed uppercase tracking-[0.2em] mb-4">{{ ls.t().hero.tag }}</span>
        <h1 class="font-display-lg text-white mb-6 md:text-[80px] leading-tight">{{ ls.t().hero.title }}</h1>
        <p class="font-body-lg text-white/90 max-w-2xl mx-auto mb-base italic">{{ ls.t().hero.subtitle }}</p>
        <div class="mt-lg flex gap-md">
          <div class="flex items-center gap-xs text-white border border-white/30 px-sm py-xs rounded-full backdrop-blur-sm">
            <span class="material-symbols-outlined text-sm">location_on</span>
            <span class="font-label-sm">{{ ls.t().hero.location }}</span>
          </div>
          <div class="flex items-center gap-xs text-white border border-white/30 px-sm py-xs rounded-full backdrop-blur-sm">
            <span class="material-symbols-outlined text-sm">star</span>
            <span class="font-label-sm">{{ ls.t().hero.reviews }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent {
  ls = inject(LanguageService);
}
