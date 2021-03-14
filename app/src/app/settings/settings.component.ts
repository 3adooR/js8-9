import {Component, OnInit} from '@angular/core';
import {Language} from "../languages";
import {LanguageService} from "../language.service";
import {StorageService} from "../storage.service";
import {defaults} from "../defaults";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userLanguage: Language;                                 // user language
  language: Language;                                     // learning language
  languagesList: Language[];                              // languages list
  numberOfWords: number;                                  // current number of words
  time: number;                                           // current time

  constructor(private languageService: LanguageService, private storage: StorageService) {
  }

  /**
   * Set all
   */
  ngOnInit(): void {
    this.userLanguage = this.languageService.getUserLanguage();
    this.language = this.languageService.getLanguage();
    this.languagesList = this.languageService.getLanguagesList();
    this.numberOfWords = this.getNumberOfWords();
    this.time = this.getTime();
  }

  /**
   * Change Language
   * @param type
   * @param lang
   */
  changeLanguage(type: string, lang: string): void {
    if (type == 'userLanguage') this.languageService.setUserLanguage(lang);
    else this.languageService.setLanguage(lang);
  }

  /**
   * Get number of words
   */
  getNumberOfWords(): number {
    const numberOfWords = this.storage.get('numberOfWords');
    return (numberOfWords) ? parseInt(numberOfWords) : defaults.numberOfWords;
  }

  /**
   * Change number of words
   * @param numberOfWords
   */
  changeNumberOfWords(numberOfWords): void {
    if (parseInt(numberOfWords) > 0) {
      this.numberOfWords = numberOfWords;
      this.storage.set('numberOfWords', numberOfWords);
    } else {
      console.error('invalid number of words');
    }
  }

  /**
   * Get TIME
   */
  getTime(): number {
    const time = this.storage.get('time');
    return (time) ? parseInt(time) : defaults.time;
  }

  /**
   * Change TIME
   * @param time
   */
  changeTime(time): void {
    if (parseInt(time) > 0) {
      this.time = time;
      this.storage.set('time', time);
    } else {
      console.error('invalid time to test');
    }
  }
}
