import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', 
    loadComponent: () => import('./features/landing/landing.component').then(c => c.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component').then(c => c.AdminComponent),
    canActivate: [authGuard]
  },
  {
    path: 'kuafor',
    loadComponent: () => import('./features/kuafor/kuafor.component').then(c => c.KuaforComponent)
  },
  {
    path: 'ecommerce',
    loadComponent: () => import('./features/ecommerce/ecommerce.component').then(c => c.EcommerceComponent)
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./features/blog-detail/blog-detail.component').then(c => c.BlogDetailComponent)
  }
];
