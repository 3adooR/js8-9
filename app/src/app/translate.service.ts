import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TranslateService implements OnDestroy {

  constructor(private http: HttpClient) {
  }

  url = '/api/translate';
  result: Object = '';
  destroy$: Subject<boolean> = new Subject<boolean>();

  translate(word: string, lang: string) {
    return this.http.post(this.url, {word, lang})
      .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
