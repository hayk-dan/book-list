import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../models/languages';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly http = inject(HttpClient);

  constructor() { }

  public getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${API_URL}/languages`)
  }
}
