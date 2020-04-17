import { TestBed, inject } from '@angular/core/testing';

import { NfldataServiceService } from './nfldata-service.service';

describe('NfldataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NfldataServiceService]
    });
  });

  it('should be created', inject([NfldataServiceService], (service: NfldataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
