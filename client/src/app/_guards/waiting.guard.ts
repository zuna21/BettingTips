import { CanDeactivateFn } from "@angular/router";
import { WaitingComponent } from "../waiting/waiting.component";
import jwt_decode from 'jwt-decode';

export function waitingGuard(): CanDeactivateFn<WaitingComponent> {
    return () => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        if (!userToken) return true;
        const tokenDecode = jwt_decode<any>(userToken);
        if (tokenDecode.hasSubscription === "True") return true;
        if (tokenDecode.isAdmin === "True") return true; 

        return false;
    }
}