import { TestBed } from '@angular/core/testing';

import { Dashborad2Service } from './dashborad2.service';

describe('Dashborad2Service', () => {
  let service: Dashborad2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dashborad2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
