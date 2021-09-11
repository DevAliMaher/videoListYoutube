import { List } from 'immutable';

export interface VideoListModel {
  nextPageToken?: string;
  prevPageToken?: string;
  items: List<VideoItemModel>;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VideoItemModel {
  id: string;
  videoTitle: string;
  videoDate: string;
  defaultImageUrl: string;
  standardImageUrl: string;
  mediumImageUrl?: string;
  highImageUrl?: string;
  maxresImageUrl?: string;
  videoDescription?: string;
  videoLikes?: number;
  videoViews?: number;
  videoRating?: number;
  videoFavouring?: boolean;
  videoDuration?: string;
}
