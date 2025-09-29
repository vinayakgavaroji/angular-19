import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ✅ Signals instead of BehaviorSubject
  private _isLoggedIn = signal<boolean>(this.hasToken());

  // Expose as read-only computed signal
  isLoggedIn$ = computed(() => this._isLoggedIn());

  private _backendUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Login method
  login(user: { email: string; password: string }) {
    return this.http.get<any[]>(`${this._backendUrl}users?email=${user.email}&password=${user.password}`)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            localStorage.setItem('token', users[0].email);
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
            // Store email as token (or use user.id if you prefer)
            localStorage.setItem('token', user.email);
            this._isLoggedIn.set(true); // ✅ Update signal
          } else {
            throw new Error('Signup failed');
          }
        })
      );
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.set(false); // ✅ Update signal
    this.router.navigate(['/login']);
  }

}
