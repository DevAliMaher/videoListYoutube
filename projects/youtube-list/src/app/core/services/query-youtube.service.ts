import { VideoListModel } from 'projects/youtube-list/src/app/core/models/video-item.model';
import { YoutubeResponseModel } from 'projects/youtube-list/src/app/core/models/youtube-response.model';
import { environment } from 'projects/youtube-list/src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QueryYoutubeService {
  constructor(private http: HttpClient) {}

  getYoutubeResponse(
    pageToken?: string,
    id?: string
  ): Observable<VideoListModel> {
    let url = `${environment.baseUrl}playlistItems?part=snippet%2CcontentDetails&maxResults=5&playlistId=${environment.channelId}&key=${environment.apiKey}`;

    if (pageToken) {
      url = `${url}&pageToken=${pageToken}`;
    }

    if (id) {
      url = `${environment.baseUrl}videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${environment.apiKey}`;
    }

    return this.http.get<YoutubeResponseModel>(url).pipe(
      catchError((error) => throwError(() => error)),
      map((response) => {
        return this.modifyData(response);
      })
    );
  }

  private modifyData(response: YoutubeResponseModel): VideoListModel {
    const modifiedResponse: VideoListModel = {
      pageInfo: response.pageInfo,
      nextPageToken: response.nextPageToken,
      prevPageToken: response.prevPageToken,
      items: response.items.map((item) => {
        return {
          id: item.id,
          imageUrl: item.snippet.thumbnails.default?.url,
          imageUrlLarge: item.snippet.thumbnails.high?.url,
          videoTitle: item.snippet.title,
          videoDate: item.snippet.publishedAt,
          videoDescription: item.snippet.description,
        };
      }),
    };

    return modifiedResponse;
  }
}
