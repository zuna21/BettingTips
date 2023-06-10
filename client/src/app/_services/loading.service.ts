import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  countRequest: number = 0;
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  setBusy() {
    this.countRequest++;
    this.isLoading.next(true);
  }

  setFree() {
    this.countRequest--;
    if (this.countRequest <= 0) {
      this.countRequest = 0;
      this.isLoading.next(false);
    }
  }
}
