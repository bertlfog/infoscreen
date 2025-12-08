import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

/**
 * Auth Guard to protect routes that require authentication.
 * Redirects to login page if the user is not authenticated.
 */
export const authGuard: CanActivateFn = (route, state) => {
  console.log("authGuard called");
  console.log(route);
  console.log(state);
  const as = inject(AuthService);
  const router = inject(Router);
  console.log("authGuard Authenticated: " + as.IsAuthenticated());
  if (!as.IsAuthenticated()) {
    // Redirect to login page if not authenticated
    
    router.navigate(['/login']);
    return false;
  }
  console.log('User is authenticated');
  return true;
 
};
