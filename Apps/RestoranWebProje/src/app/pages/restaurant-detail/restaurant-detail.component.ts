import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-32 pb-24 max-w-7xl mx-auto px-8">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span class="text-primary font-label-lg uppercase tracking-widest">{{ ls.t().nav.restaurants }}</span>
          <h1 class="font-display-lg text-on-surface mt-4">{{ restaurantName() }}</h1>
          <p class="font-body-lg text-on-surface-variant mt-6 leading-relaxed">
            {{ ls.lang() === 'TR' ? restaurantName() + ' hoş geldiniz. Kalite ve geleneğe odaklanan en iyi yemek deneyimini sunuyoruz.' : 'Welcome to ' + restaurantName() + '. We offer the finest dining experience with a focus on quality and tradition.' }}
            {{ ls.lang() === 'TR' ? 'Bu, Culinary Craft grubunun bir parçası olan özel bir konsept restorandır.' : 'This is a specialized concept restaurant part of the Culinary Craft group.' }}
          </p>
          <div class="mt-10 flex gap-6">
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden h-[500px]">
          <img [src]="restaurantImage" alt="" class="w-full h-full object-cover">
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RestaurantDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  ls = inject(LanguageService);

  restaurantId = signal('');
  
  restaurantName = computed(() => {
    const id = this.restaurantId();
    switch (id) {
      case 'burger': return this.ls.t().nav.burger;
      case 'steak': return this.ls.t().nav.steak;
      case 'pizza': return this.ls.t().nav.pizza;
      default: return 'Culinary Craft';
    }
  });

  restaurantImage = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.restaurantId.set(id);
      this.setupRestaurantImage(id);
    });
  }

  setupRestaurantImage(id: string) {
    switch (id) {
      case 'burger':
        this.restaurantImage = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000';
        break;
      case 'steak':
        this.restaurantImage = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000';
        break;
      case 'pizza':
        this.restaurantImage = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000';
        break;
      default:
        this.restaurantImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000';
    }
  }
}
