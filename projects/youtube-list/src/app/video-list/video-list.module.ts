import { LoadingBarModule } from './../loading-bar/loading-bar.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VideoItemComponent } from './video-item/video-item.component';
import { VideoListRoutingModule } from './video-list-routing.module';
import { FilterPipe } from './pipes/filter.pipe';
import { SortDataPipe } from 'projects/youtube-list/src/app/video-list/pipes/sort-data.pipe';
import { SearchInputModule } from 'projects/youtube-list/src/app/search-input/search-input.module';

@NgModule({
  declarations: [
    VideoListRoutingModule.components,
    VideoItemComponent,
    SortDataPipe,
    FilterPipe,
  ],
  imports: [
    SharedModule,
    VideoListRoutingModule,
    LoadingBarModule,
    SearchInputModule,
  ],
})
export class VideoListModule {}
