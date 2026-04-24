import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style="background-color: #f9fafb; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div class="max-w-md w-full space-y-8" style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900" style="text-align: center; font-size: 1.5rem; margin-bottom: 2rem;">Admin Girişi</h2>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only" style="display: block; margin-bottom: 0.5rem;">Kullanıcı Adı</label>
              <input id="username" name="username" type="text" required [(ngModel)]="credentials.username"
                     class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"
                     placeholder="Kullanıcı Adı">
            </div>
            <div style="margin-top: 1rem;">
              <label for="password" class="sr-only" style="display: block; margin-bottom: 0.5rem;">Şifre</label>
              <input id="password" name="password" type="password" required [(ngModel)]="credentials.password"
                     class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"
                     placeholder="Şifre">
            </div>
          </div>

          <div *ngIf="errorMessage" style="color: red; text-align: center; font-size: 0.875rem;">
            {{ errorMessage }}
          </div>

          <div>
            <button type="submit"
                    style="width: 100%; padding: 0.75rem; background-color: #4f46e5; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: background-color 0.3s;"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.errorMessage = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
      }
    });
  }
}
