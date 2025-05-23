import { TestBed } from '@angular/core/testing';

import { MatableService } from './matable.service';

describe('MatableService', () => {
  let service: MatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
