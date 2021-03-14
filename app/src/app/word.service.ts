import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Word} from "./word";
import {WORDS} from "./mock-words";
import {StorageService} from "./storage.service";
import {defaults} from "./defaults";

@Injectable({
  providedIn: 'root'
})
export class WordService {
  userLanguage?: string;
  language?: string;
  dictionary: Word[] = [];

  /**
   * Constructor / Set dictionary
   */
  constructor(private storage: StorageService) {
    this.userLanguage = (this.storage.get(`userLanguage`)) ? this.storage.get(`userLanguage`) : defaults[`userLanguage`];
    this.language = (this.storage.get(`language`)) ? this.storage.get(`language`) : defaults[`language`];
    this.dictionary = this.storageGetDictionary();
    if (!this.dictionary.length) {
      console.log('set dictionary from MOCK');
      this.setWordsFromMock().subscribe(words => this.dictionary = words);
      this.storageSaveDictionary();
      this.dictionary = this.storageGetDictionary();
    }
  }

  /**
   * Get dictionary
   */
  getWords(): Word[] {
    return this.dictionary;
  }

  /**
   * Get max ID from dictionary
   */
  getMaxId(): number {
    let maxId = this.dictionary.reduce(
      (max, word) => (word.id > max ? word.id : max),
      (this.dictionary.length) ? this.dictionary[0].id : 0
    );
    return ++maxId;
  }

  /**
   * Check if dictionary had the word
   * @param newWord
   */
  has(newWord: string): number {
    return this.dictionary.filter((word) => word[this.language] === newWord).length;
  }

  /**
   * Add word to dictionary
   * @param newWord
   * @param newTranslate
   */
  add(newWord: string, newTranslate: string) {
    const id = this.getMaxId();
    this.storageSave(id, newWord, newTranslate);
    let word: Word = {id: id};
    word[this.userLanguage] = newWord;
    word[this.language] = newTranslate;
    this.dictionary.push(word);
  }

  /**
   * Get dictionary from mock
   */
  setWordsFromMock(): Observable<Word[]> {
    return of(WORDS);
  }

  /**
   * Save all dictionary to LocalStorage
   */
  storageSaveDictionary(): void {
    this.dictionary.map((word) => {
      this.storageSave(word.id, word[this.userLanguage], word[this.language])
    });
  }

  /**
   * Save word to LocalStorage
   * @param id
   * @param word
   * @param translate
   */
  storageSave(id, word, translate): void {
    this.storage.set(`word-${id}`, word);
    this.storage.set(`translate-${id}`, translate);
  }

  /**
   * Get all dictionary from LocalStorage
   */
  storageGetDictionary(): Word[] {
    let dictionary: Word[] = [],
      keys = Object.keys(this.storage.source),
      i: number = keys.length,
      key: string,
      id: number;
    while (i--) {
      key = keys[i];
      if (key.indexOf(`word-`) > -1) {
        id = parseInt(key.replace(`word-`, ``));
        let translate = localStorage.getItem(`translate-${id}`);
        if (!translate) {
          let wordObj = this.getWordByID(id);
          if (wordObj) {
            translate = wordObj[this.userLanguage];
          }
        }

        let word: Word = {id: id};
        word[this.language] = translate;
        word[this.userLanguage] = localStorage.getItem(key);
        dictionary.push(word);
      }
    }
    return dictionary;
  }

  /**
   * Clear dictionary
   */
  clear(): void {
    this.storage.clear();
    this.dictionary = [];
  }

  /**
   * Get WORD by id
   * @param id
   */
  getWordByID(id): Word {
    return WORDS.filter((word) => word.id === id)[0];
  }
}
