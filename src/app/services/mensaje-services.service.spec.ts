import { TestBed } from '@angular/core/testing';

import { MensajeServicesService } from './mensaje-services.service';

describe('MensajeServicesService', () => {
  let service: MensajeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
