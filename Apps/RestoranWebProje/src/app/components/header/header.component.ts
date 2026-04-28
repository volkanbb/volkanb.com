import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="sticky top-0 w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/40 shadow-sm shadow-orange-900/5">
      <div class="flex justify-between items-center w-full px-8 py-6 max-w-7xl mx-auto">
        <div routerLink="/" class="text-2xl font-serif italic font-bold text-orange-900 cursor-pointer">Culinary Craft</div>
        
        <nav class="hidden md:flex items-center gap-8 font-serif text-base tracking-tight">
          <a routerLink="/" routerLinkActive="text-orange-900 border-b-2 border-orange-900/50 pb-1" [routerLinkActiveOptions]="{exact: true}" class="text-stone-500 hover:text-orange-800 transition-all duration-300">{{ ls.t().nav.home }}</a>
          
          <div class="relative group">
            <a routerLink="/restoranlarimiz" routerLinkActive="text-orange-900 border-b-2 border-orange-900/50 pb-1" class="text-stone-500 hover:text-orange-800 transition-all duration-300 flex items-center gap-1 cursor-pointer">
              {{ ls.t().nav.restaurants }}
              <span class="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
            </a>
            <div class="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
              <div class="p-2">
                <a routerLink="/restaurant/burger" class="block px-4 py-3 text-sm text-stone-600 hover:bg-orange-50 hover:text-orange-900 rounded-lg transition-colors">{{ ls.t().nav.burger }}</a>
                <a routerLink="/restaurant/steak" class="block px-4 py-3 text-sm text-stone-600 hover:bg-orange-50 hover:text-orange-900 rounded-lg transition-colors">{{ ls.t().nav.steak }}</a>
                <a routerLink="/restaurant/pizza" class="block px-4 py-3 text-sm text-stone-600 hover:bg-orange-50 hover:text-orange-900 rounded-lg transition-colors">{{ ls.t().nav.pizza }}</a>
              </div>
            </div>
          </div>

          <a class="text-stone-500 hover:text-orange-800 transition-all duration-300" routerLink="/hikayemiz" routerLinkActive="text-orange-900 border-b-2 border-orange-900/50 pb-1">{{ ls.t().nav.story }}</a>
        </nav>

        <div class="flex items-center gap-6">
          <!-- Language Switcher (Segmented Control) -->
          <div class="flex items-center p-1 bg-stone-100 rounded-lg border border-stone-200/50">
            <button 
              (click)="ls.setLanguage('TR')"
              [class.bg-white]="ls.lang() === 'TR'"
              [class.text-orange-900]="ls.lang() === 'TR'"
              [class.shadow-sm]="ls.lang() === 'TR'"
              class="px-3 py-1 rounded-md text-xs font-bold transition-all duration-300 hover:text-orange-800"
              [class.text-stone-400]="ls.lang() !== 'TR'">
              TR
            </button>
            <button 
              (click)="ls.setLanguage('EN')"
              [class.bg-white]="ls.lang() === 'EN'"
              [class.text-orange-900]="ls.lang() === 'EN'"
              [class.shadow-sm]="ls.lang() === 'EN'"
              class="px-3 py-1 rounded-md text-xs font-bold transition-all duration-300 hover:text-orange-800"
              [class.text-stone-400]="ls.lang() !== 'EN'">
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  ls = inject(LanguageService);
}
