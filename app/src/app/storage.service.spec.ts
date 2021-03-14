import {TestBed} from '@angular/core/testing';

import {StorageService} from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get', () => {
    service.set('test-key', 'test-value');
    let res = service.get('test-key');
    expect(res).toBe('test-value');
  });

  it('should clear', () => {
    service.set('test-key', 'test-value');
    service.clear();
    let res = service.get('test-key');
    expect(res).toBe(null);
  });
});
