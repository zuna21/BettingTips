import { CanActivateFn } from "@angular/router";
import jwt_decode from 'jwt-decode';


export function adminGuard(): CanActivateFn {
    return () => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));

        const decodedToken = jwt_decode<any>(userToken);

        if (decodedToken.isAdmin === "False") return false;
        return true;
    }
}