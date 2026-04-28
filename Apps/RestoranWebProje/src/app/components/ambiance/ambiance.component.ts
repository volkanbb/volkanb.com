import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-ambiance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-7xl mx-auto px-8 py-xl">
      <h2 class="font-display-md text-center mb-xl">{{ ls.t().ambiance.title }}</h2>
      <div class="grid grid-cols-4 grid-rows-2 gap-sm h-[600px]">
        <div class="col-span-2 row-span-2 overflow-hidden rounded-xl">
          <img
            alt="Dining Room"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000"
          />
        </div>
        <div class="col-span-2 row-span-1 overflow-hidden rounded-xl">
          <img
            alt="Wine Cellar"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000"
          />
        </div>
        <div class="col-span-1 row-span-1 overflow-hidden rounded-xl">
          <img
            alt="Table Setting"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000"
          />
        </div>
        <div class="col-span-1 row-span-1 overflow-hidden rounded-xl">
          <img
            alt="Kitchen Action"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000"
          />
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class AmbianceComponent {
  ls = inject(LanguageService);
}
