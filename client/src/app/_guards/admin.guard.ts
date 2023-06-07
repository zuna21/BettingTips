import { CanActivateFn } from "@angular/router";

export function adminGuard(): CanActivateFn {
    return () => {
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
        if (!isAdmin) return false;
        return true;
    }
}