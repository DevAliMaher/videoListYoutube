export interface YoutubeResponseModel {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  items: YoutubeItemModel[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  channelTitle: string;
  localized: {
    title: string;
    description: string;
  };
}

export interface YoutubeItemModel {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: 120;
        height: 90;
      };
      medium: {
        url: string;
        width: 320;
        height: 180;
      };
      high: {
        url: string;
        width: 480;
        height: 360;
      };
      standard: {
        url: string;
        width: 640;
        height: 480;
      };
      maxres: {
        url: string;
        width: 1280;
        height: 720;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
    duration: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}
