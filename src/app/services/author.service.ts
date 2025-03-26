import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Author } from '../models/author.model';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private readonly http = inject(HttpClient);

  constructor() {}

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${API_URL}/authors`);
  }

  public createAuthor(newAuthor: Omit<Author, 'id'>): Observable<Author> {
    return this.http.post<Author>(`${API_URL}/authors`, newAuthor);
  }

  public updateAuthor(id: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${API_URL}/authors/${id}`, author);
  }

  public deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/authors/${id}`);
  }
}
