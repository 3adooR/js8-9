import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Observable, timer} from "rxjs";
import {map, take} from "rxjs/operators";
import {defaults} from "../defaults";
import {StorageService} from "../storage.service";
import {WordService} from "../word.service";
import {TranslateService} from "../translate.service";
import {Word} from "../word";

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit, AfterViewInit {
  @ViewChild("translate") translateInput: ElementRef;
  userLanguage?: string;
  language?: string;
  timer$: Observable<number>;
  time: number;
  timeOut: boolean = false;
  words: Word[] = [];
  curNumber: number = 0;
  maxNumber: number = 10;
  currentWord: Word;
  errorMessage?: string = '';
  successMessage?: string = '';
  result: number = 0;

  constructor(
    private storage: StorageService,
    private dictionary: WordService,
    private translate: TranslateService
  ) {
    this.userLanguage = (this.storage.get(`userLanguage`)) ? this.storage.get(`userLanguage`) : defaults[`userLanguage`];
    this.language = (this.storage.get(`language`)) ? this.storage.get(`language`) : defaults[`language`];
    this.time = parseInt(this.get('time'));
    this.timer$ = timer(0, 1000).pipe(
      take(this.time),
      map(() => {
        --this.time;
        if (this.time == 0) {
          this.timeOut = true;
        }
        return this.time
      }),
    );
  }

  ngOnInit(): void {
    this.setWords(
      this.get('language'),
      this.dictionary.getWords(),
      parseInt(this.get('numberOfWords'))
    );
    this.maxNumber = this.words.length;
  }

  ngAfterViewInit() {
    this.focusOnInput();
  }

  /**
   * Focus on translate input
   */
  focusOnInput() {
    this.translateInput.nativeElement.focus();
    this.translateInput.nativeElement.value = '';
  }

  /**
   * Get parameter by key from LocalStorage
   * @param key
   */
  get(key: string): string {
    const val = this.storage.get(key);
    return (val) ? val : defaults[key];
  }

  /**
   * Set list of words
   * @param language
   * @param words
   * @param numberOfWords
   */
  setWords(language: string, words: Word[], numberOfWords: number): void {
    for (let i = 0; i < numberOfWords; i++) {
      if (words[i]) {
        this.words.push(words[i]);
      }
    }
  }

  /**
   * Check the translation of the word
   * @param wordID
   * @param translate
   */
  checkWord(wordID: number, translate: string) {
    translate = translate.trim().toLowerCase();
    if (!translate) {
      this.errorMessage = `Please type the translation of the word`;

    } else {
      this.errorMessage = ``;
      this.successMessage = ``;
      this.currentWord = this.words.filter((word) => word.id == wordID)[0];
      this.translate
        .translate(
          this.currentWord[this.language],
          this.language
        )
        .subscribe((res) => {
          this.curNumber++;
          if (res.success == true && res.translate.length && res.translate == translate) {
            this.result++;
            this.successMessage = `Correct!`;
          } else {
            this.errorMessage = `Incorrect! The right answer was "${res.translate}"`;
          }
        });
    }
  }
}
