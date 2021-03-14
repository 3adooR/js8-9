import {TestBed} from '@angular/core/testing';

import {LanguageService} from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have userLanguageDefault "rus"', () => {
    expect(service.userLanguageDefault.name).toBe('rus');
  });

  it('should have languageDefault "eng"', () => {
    expect(service.languageDefault.name).toBe('eng');
  });

  it('should return "rus" on getUserLanguage()', () => {
    expect(service.getUserLanguage().name).toBe('rus');
  });

  it('should return "eng" on getLanguage()', () => {
    expect(service.getLanguage().name).toBe('eng');
  });

  it('should return language on getLanguageByName()', () => {
    expect(service.getLanguageByName('eng').name).toBe('eng');
  });

  it('should return 3 languages on getLanguagesList()', () => {
    expect(service.getLanguagesList().length).toBe(3);
  });

  it('should set UserLanguage to "eng" and get it', () => {
    service.setUserLanguage('eng');
    let res = service.getUserLanguage().name;
    service.setUserLanguage('rus');
    expect(res).toBe('eng');
  });

  it('should set Language to "de" and get it', () => {
    service.setLanguage('de');
    let res = service.getLanguage().name;
    service.setLanguage('eng');
    expect(res).toBe('de');
  });
});
