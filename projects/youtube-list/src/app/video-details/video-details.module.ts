import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { VideoDetailsRoutingModule } from './video-details-routing.module';

@NgModule({
  declarations: [VideoDetailsRoutingModule.components],
  imports: [SharedModule, VideoDetailsRoutingModule],
})
export class VideoDetailsModule {}
