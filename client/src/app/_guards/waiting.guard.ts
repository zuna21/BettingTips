import { CanDeactivateFn } from "@angular/router";
import { WaitingComponent } from "../waiting/waiting.component";
import jwt_decode from 'jwt-decode';

export function waitingGuard() : CanDeactivateFn<WaitingComponent> {
    return () => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));

        if (!userToken) return true;

        const tokenDecoded = jwt_decode<any>(userToken);

        if (tokenDecoded.hasSubscription === "True" || tokenDecoded.isAdmin == "True") return true;
        return false;
    }
}