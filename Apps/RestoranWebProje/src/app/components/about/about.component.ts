import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="max-w-7xl mx-auto px-8 py-xl grid md:grid-cols-2 gap-xl items-center">
      <div class="space-y-md">
        <h2 class="font-display-md text-primary">{{ ls.t().about.title }}</h2>
        <p class="font-body-lg text-on-surface-variant leading-relaxed">
          {{ ls.t().about.p1 }}
        </p>
        <p class="font-body-lg text-on-surface-variant leading-relaxed">
          {{ ls.t().about.p2 }}
        </p>
        <div class="pt-base">
          <button routerLink="/restoranlarimiz" class="border border-primary text-primary px-md py-sm rounded-lg font-label-lg hover:bg-primary-fixed transition-colors">
            {{ ls.t().about.cta }}
          </button>
        </div>
      </div>
      <div class="relative grid grid-cols-2 gap-sm">
        <img
          alt=""
          class="rounded-xl w-full h-[400px] object-cover mt-xl"
          src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&q=80&w=1000"
        />
        <img
          alt=""
          class="rounded-xl w-full h-[400px] object-cover"
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1000"
        />
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent {
  ls = inject(LanguageService);
}
