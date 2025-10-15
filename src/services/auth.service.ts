import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private isBrowser: boolean;
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private _backendUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Login method
  login(user: { email: string; password: string }) {
    return this.http.get<any[]>(`${this._backendUrl}?email=${user.email}&password=${user.password}`)
      .pipe(
        tap(users => {
          if (users[0].email) {
            localStorage.setItem('token', users[0].email);
            this._isLoggedIn.next(true);
          } else {
            throw new Error('User does not exist');
          }
        })
      );
  }

  // Signup method
  signup(body: { name: string; email: string; password: string }) {
    return this.http.post<any>(`${this._backendUrl}`, body)
      .pipe(
        tap(user => {
          if (user && user.id) {
            localStorage.setItem('token', user.email);
            this._isLoggedIn.next(true);
          } else {
            throw new Error('Signup failed');
          }
        })
      );
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
