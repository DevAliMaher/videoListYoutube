import { LoadingService } from 'projects/youtube-list/src/app/core/services/loading.service';
import { Observable } from 'rxjs';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-loading-bar *ngIf="loading$ | async"></app-loading-bar>
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        @apply relative block w-full pb-4;
      }
    `,
  ],
})
export class AppComponent {
  loading$: Observable<boolean> = this.loadingService.loadingObservable$;
  constructor(private loadingService: LoadingService) {}
}
