import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'immutable';
import { VideoItemModel } from 'projects/youtube-list/src/app/core/models/video-item.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: List<VideoItemModel>, title: string | null): any {
    if (!value || !title) {
      return value;
    }
    return value.filter((video) => video.videoTitle.includes(title));
  }
}
