import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Author } from '../models/author.model';
import { API_URL } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private readonly http = inject(HttpClient);

  constructor() { }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${API_URL}/authors`)
  }
}
