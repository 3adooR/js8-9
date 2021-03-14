import {Component, OnInit} from '@angular/core';
import {Word} from "../word";
import {WordService} from "../word.service";
import {LanguageService} from "../language.service";
import {Language} from "../languages";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  words: Word[];
  selectedWord?: Word;
  newWordMinLength: number = 3;
  errorMessage?: string;
  languagesList?: Language[];
  userLanguage?: Language;
  language?: Language;

  constructor(private dictionary: WordService, private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.getWords();
    this.languagesList = this.languageService.getLanguagesList();
    this.userLanguage = this.languageService.getUserLanguage();
    this.language = this.languageService.getLanguage();
  }

  /**
   * Select word
   * @param word
   */
  onSelect(word: Word): void {
    this.selectedWord = word;
  }

  /**
   * Get words from dictionary
   */
  getWords(): void {
    this.errorMessage = ``;
    this.words = this.dictionary.getWords();
  }

  /**
   * Add new word to dictionary
   * @param newWord
   * @param newTranslate
   */
  addWord(newWord: string, newTranslate: string): void {
    newWord = newWord.trim();
    newTranslate = newTranslate.trim();
    if (newWord.length < this.newWordMinLength || newTranslate.length < this.newWordMinLength) {
      this.errorMessage = `The word is to small`;
    } else {
      if (this.dictionary.has(newWord)) {
        this.errorMessage = `The word is already in dictionary`;
      } else {
        this.errorMessage = ``;
        this.dictionary.add(newWord, newTranslate);
      }
    }
  }

  /**
   * Clear dictionary
   */
  clearDictionary(): void {
    this.selectedWord = null;
    this.dictionary.clear();
    this.getWords();
  }
}
