import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { LoadingService } from '../_services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingService: LoadingService = inject(LoadingService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.setBusy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => this.loadingService.setFree())
    );
  }
}
