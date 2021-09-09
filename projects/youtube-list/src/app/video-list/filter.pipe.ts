import { Pipe, PipeTransform } from '@angular/core';
import { VideoItemModel } from 'projects/youtube-list/src/app/core/models/video-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: VideoItemModel[], title: string | null): any {
    if (!value || !title) {
      return value;
    }
    console.log(value);
    console.log(value.filter((video) => video.videoTitle.includes(title)));

    return value.filter((video) => video.videoTitle.includes(title));
  }
}
