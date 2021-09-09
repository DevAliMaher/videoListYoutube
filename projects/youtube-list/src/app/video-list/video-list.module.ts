import { LoadingBarModule } from './../loading-bar/loading-bar.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VideoItemComponent } from './video-item/video-item.component';
import { VideoListRoutingModule } from './video-list-routing.module';
import { SortDataPipe } from './sort-data.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    VideoListRoutingModule.components,
    VideoItemComponent,
    SortDataPipe,
    FilterPipe,
  ],
  imports: [SharedModule, VideoListRoutingModule, LoadingBarModule],
})
export class VideoListModule {}
