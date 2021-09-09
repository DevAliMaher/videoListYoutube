import { VideoDetailsComponent } from 'projects/youtube-list/src/app/video-details/video-details.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: VideoDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoDetailsRoutingModule {
  static components = [VideoDetailsComponent];
}
