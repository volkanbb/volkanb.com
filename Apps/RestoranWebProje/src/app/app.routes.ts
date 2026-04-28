import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { RestaurantDetailComponent } from './pages/restaurant-detail/restaurant-detail.component';
import { StoryComponent } from './pages/story/story.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'hikayemiz', component: StoryComponent },
  { path: 'restoranlarimiz', component: RestaurantsComponent },
  { path: '**', redirectTo: '' }
];
