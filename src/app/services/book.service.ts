import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.model';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http = inject(HttpClient);

  constructor() {}

  public getBooks(filters: { [key: string]: any }): Observable<any[]> {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === 'authors') {
          filters[key].forEach((author: string) => {
            params = params.append('author', author);
          });
        } else if (key === 'languages') {
          filters[key].forEach((language: string) => {
            params = params.append('language', language);
          });
        } else {
          params = params.append(key, filters[key]);
        }
      }
    });

    return this.http.get<any[]>(`${API_URL}/books`, { params });
  }

  public getBook(id: number): Observable<Book | null> {
    if (!id) {
      return of(null);
    }

    return this.http.get<Book>(`${API_URL}/books/${id}`);
  }

  public createBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(`${API_URL}/books`, newBook);
  }

  public deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/books/${id}`);
  }

  public updateBook(id: number, book: Book): Observable<Book> {
    console.log(book);

    return this.http.put<Book>(`${API_URL}/books/${id}`, book);
  }
}
