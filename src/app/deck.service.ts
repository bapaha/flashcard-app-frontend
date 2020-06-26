import { Injectable } from '@angular/core';
import { Deck } from './deck/deck';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private httpClient: HttpClient) {}

  getDecks(): Observable<Deck[]> {
    return this.httpClient
      .get<Deck[]>('decks')
      .pipe(catchError(this.handleError));
  }

  getDeck(id: string): Observable<Deck> {
    return this.httpClient
      .get<Deck>(`decks/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('An error occured, please try again later.');
  }
}
