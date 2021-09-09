export interface VideoListModel {
  nextPageToken?: string;
  prevPageToken?: string;
  items: VideoItemModel[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VideoItemModel {
  id: string;
  imageUrl: string;
  imageUrlLarge: string;
  videoTitle: string;
  videoDate: string;
  videoDescription: string;
}
