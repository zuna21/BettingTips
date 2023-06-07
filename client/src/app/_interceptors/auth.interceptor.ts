import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = JSON.parse(localStorage.getItem('userToken'));
    const authentication = `Bearer ${token}`;
    const authReq = request.clone({
      headers: request.headers.set('Authorization', authentication)
    });

    return next.handle(authReq);
  }
}
