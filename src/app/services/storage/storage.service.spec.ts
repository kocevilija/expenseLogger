import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('saveToLocalStorage() | getFromLocalStorage() | This function will save object to local storage', done => {
    let sample = {test: 'test'}
    service.saveToLocalStorage('test', sample);
    service.getFromLocalStorage('test').then(val =>
      {
        expect(val).toEqual(sample);
        done();
      });
  });

  it('removeFromLocalStorage() | Should remove key from local storage', finish =>
  {
    let sample = {test: 'test'}
    service.saveToLocalStorage('test', sample);
    service.removeFromLocalStorage('test').then(val => {
      expect(val).toBe(undefined);
      finish();
    });
  });

  it('clearLocalStorage() | Should clear everything from local storage', done =>
  {
    let sample = {test: 'test'}
    service.saveToLocalStorage('test', sample);
    service.getFromLocalStorage('test').then(val =>
      {
        console.log(val);
      });

      service.clearLocalStorage().then(v => 
        {
          expect(v).toBe(undefined);
          done();
        });
  });
});
