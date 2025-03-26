import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../models/genres';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private readonly http = inject(HttpClient);

  constructor() {}

  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${API_URL}/genres`);
  }
}
