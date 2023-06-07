import { CanActivateFn } from "@angular/router";

export function authGuard() : CanActivateFn {
  return () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));

    if (!userToken) return false;
    return true;
  }
}