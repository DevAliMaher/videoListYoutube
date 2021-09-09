import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { QueryYoutubeService } from 'projects/youtube-list/src/app/core/services/query-youtube.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailsResolver implements Resolve<any> {
  constructor(private queryYoutubeService: QueryYoutubeService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.queryYoutubeService
      .getYoutubeResponse(undefined, route.queryParams.id)
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
}
