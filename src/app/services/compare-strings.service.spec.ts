import { TestBed } from '@angular/core/testing';

import { CompareStringsService } from './compare-strings.service';

describe('CompareStringsService', () => {
  let service: CompareStringsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareStringsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
