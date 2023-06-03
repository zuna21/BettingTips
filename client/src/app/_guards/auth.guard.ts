import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { AccountService } from "../_services/account.service";

export function authGuard() : CanActivateFn {
  return () => {
    const accountService: AccountService = inject(AccountService);

    if (!accountService.getUser()) return false;
    return true;
  }
}