import { TestBed } from '@angular/core/testing';

import { VideoDetailsResolver } from './video-details.resolver';

describe('VideoDetailsResolver', () => {
  let resolver: VideoDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VideoDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
