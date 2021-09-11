import { LoadingService } from 'projects/youtube-list/src/app/core/services/loading.service';
import { finalize, Observable, tap } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}
  // intercept any http request to show loader
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(() => this.loadingService.showLoader()),
      finalize(() => this.loadingService.hideLoader())
    );
  }
}
