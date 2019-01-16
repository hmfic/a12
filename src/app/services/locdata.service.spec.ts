import { TestBed } from '@angular/core/testing';

import { LocdataService } from './locdata.service';

describe('LocdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocdataService = TestBed.get(LocdataService);
    expect(service).toBeTruthy();
  });
});
