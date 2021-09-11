import { VideoItemModel } from 'projects/youtube-list/src/app/core/models/video-item.model';
import { QueryYoutubeService } from 'projects/youtube-list/src/app/core/services/query-youtube.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailsResolver implements Resolve<VideoItemModel> {
  constructor(private queryYoutubeService: QueryYoutubeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<VideoItemModel> {
    return this.queryYoutubeService.getVideoDetailsResponse(
      route.queryParams.id
    );
  }
}
