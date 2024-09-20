import { TestBed } from '@angular/core/testing';

import { HttpTransferService } from './http-transfer.service';

describe('HttpTransferService', () => {
  let service: HttpTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
