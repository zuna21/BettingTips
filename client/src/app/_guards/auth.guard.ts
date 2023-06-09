import { CanActivateFn } from "@angular/router";

export function authGuard() : CanActivateFn {
    return () => {
        if (!localStorage.getItem('userToken')) return false;
        return true;
    }
}