import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function authGuard(): CanActivateFn {
  return () => {
    /* if (!localStorage.getItem('userToken')) return false;
        return true; */
    const router: Router = inject(Router);
    const token = localStorage.getItem('userToken');

    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  };
}
