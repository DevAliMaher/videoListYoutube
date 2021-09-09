import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingEmitter$ = new Subject<boolean>();
  loadingObservable$ = this.loadingEmitter$.asObservable();
  constructor() {}

  showLoader() {
    this.loadingEmitter$.next(true);
  }

  hideLoader() {
    this.loadingEmitter$.next(false);
  }
}
