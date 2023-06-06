import { CanDeactivateFn } from "@angular/router";
import { AccountService } from "../_services/account.service";
import { inject } from "@angular/core";
import { WaitingComponent } from "../waiting/waiting.component";

export function waitingGuard(): CanDeactivateFn<WaitingComponent> {
    return () => {
        const accountService: AccountService = inject(AccountService);
        const user = accountService.getUser();
        if (!user) return true;
        if (user.isAdmin) return true;
        if (user.hasSubscription) return true;
        return false;
    }
}