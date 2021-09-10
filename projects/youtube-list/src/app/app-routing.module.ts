import { ErrorPageComponent } from 'projects/youtube-list/src/app/error-page/error-page.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosListResolver } from 'projects/youtube-list/src/app/core/resolvers/videos-list.resolver';
import { VideoDetailsResolver } from 'projects/youtube-list/src/app/core/resolvers/video-details.resolver';

const routes: Routes = [
  {
    path: 'video-details',
    loadChildren: () =>
      import('./video-details/video-details.module').then(
        (m) => m.VideoDetailsModule
      ),
    resolve: { videoDetails: VideoDetailsResolver },
  },
  {
    path: '',
    loadChildren: () =>
      import('./video-list/video-list.module').then((m) => m.VideoListModule),
    resolve: { videoList: VideosListResolver },
  },
  {
    path: '**',
    component: ErrorPageComponent,
    data: { message: 'no-page-found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {
  static components = [ErrorPageComponent];
}
