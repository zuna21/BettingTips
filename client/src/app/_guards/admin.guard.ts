import { CanActivateFn } from "@angular/router";
import { AccountService } from "../_services/account.service";
import { inject } from "@angular/core";

export function adminGuard(): CanActivateFn {
    return () => {
        const accountService: AccountService = inject(AccountService);
        const user = accountService.getUser();
        if (!user) return false;
        if (!user.isAdmin) return false;
        return true;
    }
}