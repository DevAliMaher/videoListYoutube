import { merge, Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';

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
export class AppComponent implements OnInit {
  loading$!: Observable<boolean>;
  private loadingStart$!: Observable<boolean>;
  private loadingEnd$!: Observable<boolean>;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadingStart$ = this.router.events.pipe(
      filter((event) => event instanceof ResolveStart),
      mapTo(true)
    );

    this.loadingEnd$ = this.router.events.pipe(
      filter((event) => event instanceof ResolveEnd),
      mapTo(false)
    );

    this.loading$ = merge(this.loadingStart$, this.loadingEnd$);
  }
}
