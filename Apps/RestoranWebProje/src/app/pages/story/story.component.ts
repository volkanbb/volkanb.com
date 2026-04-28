import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-surface">
      <!-- Hero Section -->
      <section class="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070" 
            alt="Heritage" 
            class="w-full h-full object-cover brightness-50"
          >
        </div>
        <div class="relative z-10 text-center px-gutter">
          <span class="text-primary-fixed uppercase tracking-[0.3em] font-label-lg mb-4 block">{{ ls.t().hero.tag }}</span>
          <h1 class="font-display-lg text-white text-5xl md:text-7xl mb-6">{{ ls.t().nav.story }}</h1>
          <div class="w-24 h-1 bg-primary mx-auto"></div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="max-w-6xl mx-auto px-gutter py-xl">
        <div class="grid md:grid-cols-2 gap-xl items-center">
          <div class="space-y-lg order-2 md:order-1">
            <h2 class="font-display-md text-primary text-4xl md:text-5xl leading-tight">{{ ls.t().about.title }}</h2>
            <div class="space-y-md">
              <p class="font-body-lg text-on-surface-variant leading-relaxed text-lg">
                {{ ls.t().about.p1 }}
              </p>
              <p class="font-body-lg text-on-surface-variant leading-relaxed text-lg">
                {{ ls.t().about.p2 }}
              </p>
            </div>
            <div class="pt-md">
                <div class="flex items-center gap-md p-md bg-surface-container rounded-2xl border border-outline-variant/30">
                    <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined text-3xl">restaurant</span>
                    </div>
                    <div>
                        <h4 class="font-bold text-on-surface">3 {{ ls.t().nav.restaurants }}</h4>
                        <p class="text-on-surface-variant text-sm">{{ ls.t().nav.burger }}, {{ ls.t().nav.steak }}, {{ ls.t().nav.pizza }}</p>
                    </div>
                </div>
            </div>
          </div>
          <div class="relative order-1 md:order-2">
            <div class="grid grid-cols-2 gap-md">
                <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000" 
                    alt="Fine Dining" 
                    class="rounded-2xl shadow-xl aspect-[3/4] object-cover mt-xl"
                >
                <img 
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" 
                    alt="Table Setting" 
                    class="rounded-2xl shadow-xl aspect-[3/4] object-cover"
                >
            </div>
            <div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-fixed rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      <!-- Values/Stats Section -->
      <section class="bg-stone-900 text-white py-xl">
        <div class="max-w-7xl mx-auto px-gutter">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-xl text-center">
                <div class="space-y-xs">
                    <span class="font-display-lg text-primary-fixed text-5xl block">10+</span>
                    <p class="font-label-sm text-stone-400 uppercase tracking-widest">{{ ls.lang() === 'TR' ? 'YILLIK DENEYİM' : 'YEARS OF EXPERIENCE' }}</p>
                </div>
                <div class="space-y-xs">
                    <span class="font-display-lg text-primary-fixed text-5xl block">3</span>
                    <p class="font-label-sm text-stone-400 uppercase tracking-widest">{{ ls.lang() === 'TR' ? 'EŞSİZ MARKA' : 'UNIQUE BRANDS' }}</p>
                </div>
                <div class="space-y-xs">
                    <span class="font-display-lg text-primary-fixed text-5xl block">50+</span>
                    <p class="font-label-sm text-stone-400 uppercase tracking-widest">{{ ls.lang() === 'TR' ? 'UZMAN ŞEF' : 'EXPERT CHEFS' }}</p>
                </div>
                <div class="space-y-xs">
                    <span class="font-display-lg text-primary-fixed text-5xl block">100k+</span>
                    <p class="font-label-sm text-stone-400 uppercase tracking-widest">{{ ls.lang() === 'TR' ? 'MUTLU MİSAFİR' : 'HAPPY GUESTS' }}</p>
                </div>
            </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-xl text-center px-gutter">
        <h3 class="font-display-md text-3xl mb-lg">{{ ls.lang() === 'TR' ? 'Lezzet Yolculuğumuza Katılın' : 'Join Our Flavor Journey' }}</h3>
        <button routerLink="/" class="inline-flex items-center gap-md bg-primary text-white px-xl py-md rounded-full font-label-lg hover:bg-primary-container transition-all hover:scale-105 active:scale-95 shadow-xl group">
          {{ ls.t().nav.home }}
          <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </section>
    </div>
  `,
  styles: []
})
export class StoryComponent {
  ls = inject(LanguageService);
}
