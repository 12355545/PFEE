import { TestBed } from '@angular/core/testing';

import { DatabaseSelectionServiceService } from './database-selection-service.service';

describe('DatabaseSelectionServiceService', () => {
  let service: DatabaseSelectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseSelectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
