import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!localStorage.getItem('token');
  const router = inject(Router);
  return isLoggedIn ? true : router.createUrlTree(['/login']);
};
