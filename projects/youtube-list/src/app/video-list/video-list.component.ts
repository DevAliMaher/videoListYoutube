import { InputDataModel } from 'projects/youtube-list/src/app/core/models/input-data.model';
import { SortTypeModel } from 'projects/youtube-list/src/app/core/models/sort-data.model';
import {
  VideoItemModel,
  VideoListModel,
} from 'projects/youtube-list/src/app/core/models/video-item.model';
import { QueryYoutubeService } from 'projects/youtube-list/src/app/core/services/query-youtube.service';
import { SearchService } from 'projects/youtube-list/src/app/core/services/search.service';
import { noop, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { Location } from '@angular/common';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  @HostBinding('class.full-space-list') videoListClass = true;

  videoList: VideoListModel | null = null;
  private subs = new SubSink();

  sortType: SortTypeModel | null = null;
  sortDir = false;

  userSearchInput$: Observable<string> = this.searchService.userInput$;

  channelId: string | undefined = undefined;
  errorMessage: string | null = null;

  searchData: InputDataModel = {
    placeholder: 'search by Channel List ID',
    materialIcon: 'search',
  };

  constructor(
    private route: ActivatedRoute,
    private queryYoutubeService: QueryYoutubeService,
    private searchService: SearchService,
    public location: Location
  ) {}

  ngOnInit(): void {
    // get initial response from the resolver
    this.subs.sink = this.route.data
      .pipe(
        map((data) => (this.videoList = { ...data.videoList })),
        catchError((error) => {
          return (this.errorMessage = error);
        })
      )
      .subscribe(noop);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // get next or prev page response
  queryNewPage(
    channelId: string | undefined = this.channelId,
    token?: string | undefined
  ): void {
    this.subs.sink = this.queryYoutubeService
      .getVideoListResponse(channelId, token)
      .pipe(
        map((data) => {
          this.errorMessage = null;
          return (this.videoList = { ...data });
        }),
        catchError((error) => {
          return (this.errorMessage = error);
        })
      )
      .subscribe(noop);
  }

  searchBuChannelId(channelId: string): void {
    this.channelId = channelId;
    this.queryNewPage(this.channelId);
  }

  // set sort type
  sortVideos(args: SortTypeModel): void {
    this.sortType = args;
    this.sortDir = !this.sortDir;
  }

  trackBy(index: number, videoItem: VideoItemModel) {
    return videoItem.id;
  }
}
