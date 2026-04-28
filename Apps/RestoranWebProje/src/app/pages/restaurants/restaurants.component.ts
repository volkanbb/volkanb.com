import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-surface">
      <!-- Header Spacer -->
      <div class="h-32"></div>

      <!-- Restaurants Grid Section -->
      <section class="max-w-7xl mx-auto px-gutter py-xl">
        <div class="text-center mb-xl">
          <h1 class="font-display-lg text-primary text-4xl md:text-5xl mb-4">{{ ls.t().restaurants.title }}</h1>
          <p class="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {{ ls.t().restaurants.subtitle }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-lg">
          @for (res of restaurantList(); track res.id) {
            <div 
              [routerLink]="['/restaurant', res.id]"
              class="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-100"
            >
              <div class="relative h-72 overflow-hidden">
                <img 
                  [src]="res.image" 
                  [alt]="res.name" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <span class="text-white font-label-lg flex items-center gap-2">
                     {{ ls.lang() === 'TR' ? 'Detayları Gör' : 'View Details' }}
                     <span class="material-symbols-outlined">arrow_forward</span>
                   </span>
                </div>
              </div>
              <div class="p-8">
                <h3 class="font-display-md text-2xl mb-2 text-on-surface group-hover:text-primary transition-colors">{{ res.name }}</h3>
                <p class="text-on-surface-variant line-clamp-2">
                    {{ ls.lang() === 'TR' ? 'En kaliteli malzemelerle hazırlanan eşsiz lezzetler sizi bekliyor.' : 'Unique flavors prepared with the highest quality ingredients await you.' }}
                </p>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Franchise Section -->
      <section class="bg-surface-container py-xl">
        <div class="max-w-7xl mx-auto px-gutter">
          <div class="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
            <!-- Decorative circle -->
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20"></div>
            
            <div class="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div class="space-y-lg">
                <span class="text-primary-fixed font-label-lg uppercase tracking-[0.2em] block">{{ ls.lang() === 'TR' ? 'Büyümemize Katılın' : 'Join Our Growth' }}</span>
                <h2 class="font-display-lg text-4xl md:text-5xl leading-tight">{{ ls.t().franchise.title }}</h2>
                <p class="text-stone-400 text-lg leading-relaxed">
                  {{ ls.t().franchise.desc }}
                </p>
                
                <div class="flex flex-col gap-md">
                   <div class="flex items-center gap-md">
                     <span class="material-symbols-outlined text-primary-fixed">verified</span>
                     <span class="font-label-lg">{{ ls.t().franchise.benefit1 }}</span>
                   </div>
                   <div class="flex items-center gap-md">
                     <span class="material-symbols-outlined text-primary-fixed">support_agent</span>
                     <span class="font-label-lg">{{ ls.t().franchise.benefit2 }}</span>
                   </div>
                   <div class="flex items-center gap-md">
                     <span class="material-symbols-outlined text-primary-fixed">public</span>
                     <span class="font-label-lg">{{ ls.t().franchise.benefit3 }}</span>
                   </div>
                </div>

                <div class="pt-6 border-t border-white/10 mt-6 space-y-4">
                  <p class="text-primary-fixed font-bold">{{ ls.t().franchise.contact }}</p>
                  <div class="flex flex-wrap gap-x-8 gap-y-4">
                    <a [href]="'mailto:' + ls.t().contact.email" class="flex items-center gap-3 hover:text-primary-fixed transition-colors">
                      <span class="material-symbols-outlined text-primary-fixed">mail</span>
                      <span>{{ ls.t().contact.email }}</span>
                    </a>
                    <a [href]="'tel:' + ls.t().contact.phone" class="flex items-center gap-3 hover:text-primary-fixed transition-colors">
                      <span class="material-symbols-outlined text-primary-fixed">call</span>
                      <span>{{ ls.t().contact.phone }}</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-md">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600" class="rounded-2xl aspect-square object-cover" alt="Meeting">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" class="rounded-2xl aspect-square object-cover mt-12" alt="Analysis">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class RestaurantsComponent {
  ls = inject(LanguageService);

  restaurantList = computed(() => [
    {
      id: 'burger',
      name: this.ls.t().nav.burger,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'steak',
      name: this.ls.t().nav.steak,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'pizza',
      name: this.ls.t().nav.pizza,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000'
    }
  ]);
}
