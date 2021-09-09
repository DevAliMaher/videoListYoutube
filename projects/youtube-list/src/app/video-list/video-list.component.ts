import { LoadingService } from 'projects/youtube-list/src/app/core/services/loading.service';
import { SortTypeModel } from 'projects/youtube-list/src/app/core/models/sort-data.model';
import { VideoListModel } from 'projects/youtube-list/src/app/core/models/video-item.model';
import { merge, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { QueryYoutubeService } from 'projects/youtube-list/src/app/core/services/query-youtube.service';
import { SearchService } from 'projects/youtube-list/src/app/core/services/search.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent {
  @HostBinding('class.full-space-list') videoListClass = true;

  videoListResponse$: Observable<VideoListModel> = this.route.data.pipe(
    map((data) => data.videoList)
  );

  sortType: SortTypeModel | null = null;
  sortDir = false;

  loading$ = this.loadingService.loadingObservable$;

  userSearchInput$: Observable<string> = this.searchService.userInput$.pipe(
    tap((res) => console.log(res))
  );

  constructor(
    private route: ActivatedRoute,
    private queryYoutubeService: QueryYoutubeService,
    private loadingService: LoadingService,
    private searchService: SearchService
  ) {}

  queryNewPage(token: string | undefined): void {
    this.videoListResponse$ = merge(
      this.queryYoutubeService.getYoutubeResponse(token)
    );
  }

  sortVideos(args: SortTypeModel): void {
    this.sortType = args;
    this.sortDir = !this.sortDir;
  }
}
