import { TestBed } from '@angular/core/testing';

import { ProcessTextService } from './process-text.service';

describe('ProcessTextService', () => {
  let service: ProcessTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
