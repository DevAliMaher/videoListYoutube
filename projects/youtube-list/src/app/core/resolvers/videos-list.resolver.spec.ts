import { TestBed } from '@angular/core/testing';

import { VideosListResolver } from './videos-list.resolver';

describe('VideosListResolver', () => {
  let resolver: VideosListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VideosListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
