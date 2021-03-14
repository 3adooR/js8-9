import {Injectable} from '@angular/core';
import {Language} from "./languages";
import {LANGUAGES} from "./mock-languages";
import {Observable, of} from 'rxjs';
import {StorageService} from "./storage.service";
import {defaults} from "./defaults";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  userLanguageDefault: Language;
  languageDefault: Language;
  userLanguage: Language;
  language: Language;
  languagesList: Language[] = [];

  constructor(private storage: StorageService) {
    if (!this.languagesList.length) {
      this.getLanguagesList();
    }
    this.userLanguageDefault = this.getLanguageByName(defaults.userLanguage);
    this.languageDefault = this.getLanguageByName(defaults.language);
    this.userLanguage = this.getUserLanguage();
    this.language = this.getLanguage();
  }

  /**
   * Get user language from storage
   */
  getUserLanguage() {
    const lang = this.storageGetUserLanguage();
    return this.getLanguageByName(lang, this.userLanguageDefault);
  }

  /**
   * Get learning language from storage
   */
  getLanguage() {
    const lang = this.storageGetLanguage();
    return this.getLanguageByName(lang, this.languageDefault);
  }

  /**
   * Get language object by name
   * @param lang
   * @param langDefault
   */
  getLanguageByName(lang: string, langDefault?: Language): Language {
    const list = this.languagesList.filter((language) => language.name === lang);
    return (list.length) ? list[0] : langDefault;
  }

  /**
   * Get list of languages
   */
  getLanguagesList(): Language[] {
    if (!this.languagesList.length) {
      this.getLanguagesFromMock().subscribe(language => this.languagesList = language);
    }
    return this.languagesList;
  }

  /**
   * Get list of languages from MOCK
   */
  getLanguagesFromMock(): Observable<Language[]> {
    return of(LANGUAGES);
  }

  /**
   * Set learning language name to storage
   * @param lang
   */
  setUserLanguage(lang: string) {
    this.storageSaveLanguage(`userLanguage`, lang);
  }

  /**
   * Set learning language name to storage
   * @param lang
   */
  setLanguage(lang: string) {
    this.storageSaveLanguage(`language`, lang);
  }

  /**
   * Get user language name from storage
   */
  storageGetUserLanguage(): string {
    return this.storage.get(`userLanguage`);
  }

  /**
   * Get learning language name from storage
   */
  storageGetLanguage(): string {
    return this.storage.get(`language`);
  }

  /**
   * Save language to storage
   * @param key
   * @param lang
   */
  storageSaveLanguage(key: string, lang: string): void {
    this.storage.set(key, lang);
  }
}
