import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { computed, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isBrowser: boolean;
  private _isLoggedIn = signal<boolean>(false);
  isLoggedIn$ = computed(() => this._isLoggedIn());

  private _backendUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this._isLoggedIn.set(!!localStorage.getItem('token'));
    }
  }

  // Login method
  login(user: { email: string; password: string }) {
    return this.http.get<any[]>(`${this._backendUrl}users?email=${user.email}&password=${user.password}`)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            if (this.isBrowser) {
              localStorage.setItem('token', users[0].email);
            }
            this._isLoggedIn.set(true);
          } else {
            throw new Error('User does not exist');
          }
        })
      );
  }

  // Signup method
  signup(body: { name: string; email: string; password: string }) {
    return this.http.post<any>(`${this._backendUrl}users`, body)
      .pipe(
        tap(user => {
          if (user && user.email) {
            if (this.isBrowser) {
              localStorage.setItem('token', user.email);
            }
            this._isLoggedIn.set(true);
          } else {
            throw new Error('Signup failed');
          }
        })
      );
  }

  // Logout method
  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this._isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

}
