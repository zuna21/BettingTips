import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize, identity } from 'rxjs';
import { LoadingService } from '../_services/loading.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingService: LoadingService = inject(LoadingService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.setBusy();
    return next.handle(request).pipe(
      (environment.development ? delay(1000) : identity),
      finalize(() => this.loadingService.setFree())
    );
  }
}
