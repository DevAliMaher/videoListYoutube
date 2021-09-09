import { VideoListComponent } from 'projects/youtube-list/src/app/video-list/video-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: VideoListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoListRoutingModule {
  static components = [VideoListComponent];
}
