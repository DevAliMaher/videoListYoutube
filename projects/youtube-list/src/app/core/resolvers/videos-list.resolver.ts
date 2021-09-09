import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { VideoListModel } from 'projects/youtube-list/src/app/core/models/video-item.model';
import { QueryYoutubeService } from 'projects/youtube-list/src/app/core/services/query-youtube.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideosListResolver implements Resolve<VideoListModel> {
  constructor(private queryYoutubeService: QueryYoutubeService) {}
  resolve(): Observable<VideoListModel> {
    return this.queryYoutubeService.getYoutubeResponse().pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
}
