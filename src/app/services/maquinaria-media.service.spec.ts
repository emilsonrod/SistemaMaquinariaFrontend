import { TestBed, inject } from '@angular/core/testing';

import { MaquinariaMediaService } from './maquinaria-media.service';

describe('MaquinariaMediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaquinariaMediaService]
    });
  });

  it('should be created', inject([MaquinariaMediaService], (service: MaquinariaMediaService) => {
    expect(service).toBeTruthy();
  }));
});
