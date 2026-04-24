import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth/login`;
  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('admin_token');
  }

  login(credentials: any) {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('admin_token', res.token);
          this._isAuthenticated.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('admin_token');
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('admin_token');
  }
}
