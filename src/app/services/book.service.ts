import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.model';
import { API_URL } from '../app.config';
import { Filter } from '../shared/filter/filter.component';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http = inject(HttpClient);

  constructor() {}

  public getBooks(filters: Filter): Observable<Book[]> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            params = params.append(key, val);
          });
        } else {
          params = params.append(key, value);
        }
      }
    });

    return this.http.get<Book[]>(`${API_URL}/books`, { params });
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
    return this.http.put<Book>(`${API_URL}/books/${id}`, book);
  }
}
