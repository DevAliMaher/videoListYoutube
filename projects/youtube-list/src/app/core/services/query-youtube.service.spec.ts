import { TestBed } from '@angular/core/testing';

import { QueryYoutubeService } from './query-youtube.service';

describe('QueryYoutubeService', () => {
  let service: QueryYoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryYoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
