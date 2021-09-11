import { VideoListModel } from 'projects/youtube-list/src/app/core/models/video-item.model';
import { QueryYoutubeService } from 'projects/youtube-list/src/app/core/services/query-youtube.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VideosListResolver implements Resolve<VideoListModel> {
  constructor(private queryYoutubeService: QueryYoutubeService) {}
  resolve(): Observable<VideoListModel> {
    return this.queryYoutubeService.getVideoListResponse();
  }
}
