import { SortTypeModel } from 'projects/youtube-list/src/app/core/models/sort-data.model';
import { VideoItemModel } from 'projects/youtube-list/src/app/core/models/video-item.model';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortData',
})
export class SortDataPipe implements PipeTransform {
  transform(
    value: VideoItemModel[],
    args: SortTypeModel | null,
    sortDir: boolean
  ): any {
    if (!value || !args) {
      return value;
    }
    // init new list
    let sortedArray: VideoItemModel[] = [];
    // reverse sort
    sortDir
      ? (sortedArray = value.sort((a, b) =>
          a[args!] < b[args!] ? 1 : b[args!] < a[args!] ? -1 : 0
        ))
      : (sortedArray = value.sort((a, b) =>
          a[args!] > b[args!] ? 1 : b[args!] > a[args!] ? -1 : 0
        ));
    return sortedArray;
  }
}
