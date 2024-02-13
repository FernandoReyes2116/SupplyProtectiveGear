import { TestBed } from '@angular/core/testing';

import { TodeliveryserviceService } from './todeliveryservice.service';

describe('TodeliveryserviceService', () => {
  let service: TodeliveryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodeliveryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
