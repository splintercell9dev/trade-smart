import { TestBed } from '@angular/core/testing';

import { CacheApiService } from './cache-api.service';

describe('CacheApiService', () => {
  let service: CacheApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
