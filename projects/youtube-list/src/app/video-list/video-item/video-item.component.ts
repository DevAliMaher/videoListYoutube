import { VideoItemModel } from 'projects/youtube-list/src/app/core/models/video-item.model';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-item',
  template: `
    <img [src]="videoItem?.imageUrl" class="video-img" />
    <div class="video-title">{{ videoItem?.videoTitle }}</div>
    <div class="video-publish-date">{{ videoItem?.videoDate | date }}</div>
    <button
      type="button"
      class="video-details-btn bg-dark"
      routerLink="/video-details"
      [queryParams]="{ id: videoItem?.id }"
    >
      {{ 'Details' }}
    </button>
  `,
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoItemComponent {
  @Input() videoItem!: VideoItemModel;
}
