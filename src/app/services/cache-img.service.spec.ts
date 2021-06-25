import { TestBed } from '@angular/core/testing';

import { CacheImgService } from './cache-img.service';

describe('CacheImgService', () => {
  let service: CacheImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
