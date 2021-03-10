import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CLUB_API_URL } from '../app-injection-tokens';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookclubService {

  private baseApiUrl = `${this.apiUrl}`;

  constructor(private http: HttpClient, @Inject(CLUB_API_URL) private apiUrl: string) { }

  getCatalog(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseApiUrl}`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseApiUrl}booklist`);
  }

  getAviableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseApiUrl}aviablebooks`);
  }

  addToList(book: Book) : Observable<Book> {
    return this.http.post<Book>(`${this.baseApiUrl}aviablebooks`, book);
  }

  removeFromList(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseApiUrl}booklist`, book);
  }

  bookListLimit(): Observable<number> {
    return this.http.get<number>(`${this.baseApiUrl}aviablebooks/limit`);
  }
}
