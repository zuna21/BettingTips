import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private accountService: AccountService = inject(AccountService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.accountService.getUser();
    if (!user) return next.handle(request);

    const token = user.token;
    const authentication = `Bearer ${token}`;
    const authReq = request.clone({
      headers: request.headers.set('Authorization', authentication)
    });

    return next.handle(authReq);
  }
}
