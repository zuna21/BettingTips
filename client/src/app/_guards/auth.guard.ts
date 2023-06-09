import { CanActivateFn } from "@angular/router";
import jwt_decode from 'jwt-decode'

export function authGuard() : CanActivateFn {
  return () => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));

    if (!userToken) return false;

    const tokenDecoded = jwt_decode<any>(userToken);
    if (tokenDecoded.hasSubscription === "False") return false;

    return true;
  }
}