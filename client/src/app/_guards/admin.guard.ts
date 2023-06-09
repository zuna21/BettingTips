import { CanActivateFn } from "@angular/router";
import jwt_decode from 'jwt-decode';

export function adminGuard() : CanActivateFn {
    return () => {
        if (!localStorage.getItem('userToken')) return false;
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        const tokenDecoded = jwt_decode<any>(userToken);
        if (tokenDecoded.isAdmin === "True") return true;
        return false;
    }
}