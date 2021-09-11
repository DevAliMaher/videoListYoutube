import { List } from 'immutable';
import {
  VideoItemModel,
  VideoListModel,
} from 'projects/youtube-list/src/app/core/models/video-item.model';
import {
  YoutubeItemModel,
  YoutubeResponseModel,
} from 'projects/youtube-list/src/app/core/models/youtube-response.model';
import { environment } from 'projects/youtube-list/src/environments/environment';
import {
  catchError,
  map,
  Observable,
  shareReplay,
  take,
  throwError,
} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class QueryYoutubeService {
  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  // call youtube Api with optional channelId, pageToken to get specific list or id to get specific video details
  getVideoListResponse(
    playListId?: string,
    pageToken?: string
  ): Observable<VideoListModel> {
    // base url get channel list of videos
    let url = `${
      environment.baseUrl
    }playlistItems?part=snippet%2CcontentDetails&playlistId=${
      playListId || environment.playListId
    }&maxResults=5&key=${environment.apiKey}`;
    // url if request new page of the list (next  or prev)
    if (pageToken) {
      url = `${url}&pageToken=${pageToken}`;
    }
    // return observable that modify YoutubeResponseModel to VideoListModel
    return this.http.get<YoutubeResponseModel>(url).pipe(
      catchError((error) => {
        return throwError(() => {
          return error.error.error.message;
        });
      }),
      shareReplay(),
      map((response) => {
        return this.modifyListData(response);
      })
    );
  }

  getVideoDetailsResponse(id: string): Observable<VideoItemModel> {
    // url to request video details
    const url = `${environment.baseUrl}videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${environment.apiKey}`;

    return this.http.get<YoutubeResponseModel>(url).pipe(
      catchError((error) => throwError(() => error)),
      take(1),
      map((response) => {
        const targetVideo = response.items[0];
        return this.modifyVideoData(targetVideo);
      })
    );
  }

  // separate function to make list modification on response
  private modifyListData(response: YoutubeResponseModel): VideoListModel {
    // creates new immutable map of the response and immutable List of Items
    // immutable map
    const modifiedResponse: VideoListModel = {
      pageInfo: response.pageInfo,
      nextPageToken: response.nextPageToken,
      prevPageToken: response.prevPageToken,
      // immutable List
      items: List(
        response.items.map((item) => {
          return {
            id: item.contentDetails.videoId,
            defaultImageUrl: item.snippet.thumbnails.default?.url,
            standardImageUrl: item.snippet.thumbnails.standard?.url,
            videoTitle: item.snippet.title,
            videoDate: item.snippet.publishedAt,
          };
        })
      ),
    };
    return modifiedResponse;
  }

  private modifyVideoData(targetVideo: YoutubeItemModel): VideoItemModel {
    return {
      id: targetVideo.id,
      videoTitle: targetVideo.snippet.title,
      videoDate: targetVideo.snippet.publishedAt,
      defaultImageUrl: targetVideo.snippet.thumbnails.default.url,
      standardImageUrl: targetVideo.snippet.thumbnails.standard.url,
      mediumImageUrl: targetVideo.snippet.thumbnails.medium.url,
      highImageUrl: targetVideo.snippet.thumbnails.high.url,
      maxresImageUrl: targetVideo.snippet.thumbnails.maxres.url,
      videoDescription: targetVideo.snippet.description,
      videoLikes: +(targetVideo.statistics?.likeCount as string),
      videoViews: +(targetVideo.statistics?.viewCount as string),
      videoDuration: targetVideo.contentDetails.duration,
    };
  }
}
