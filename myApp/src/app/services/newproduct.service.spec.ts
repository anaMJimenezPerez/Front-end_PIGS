import { TestBed } from '@angular/core/testing';

import { NewproductService } from './newproduct.service';

describe('NewproductService', () => {
  let service: NewproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
