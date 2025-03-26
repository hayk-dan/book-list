import { Component, signal, inject, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Author } from '../../models/author.model';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { Language } from '../../models/languages';
import { Genre } from '../../models/genres';
import { GenreService } from '../../services/genre.service';
import { LanguageService } from '../../services/language.service';
import { InputNumberModule } from 'primeng/inputnumber';

export interface Filter {
  title?: string,
  author?: string[],
  language?: string[],
  genre?: string,
  minPages?: number | null,
  maxPages?: number | null
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<Filter>();
  
  public searchSignal = signal('');
  public authorsSignal = signal<Author[] | null>(null);
  public languagesSignal = signal<Language[] | null>(null);
  public genreSignal = signal<Genre | null>(null);
  public minPagesSignal = signal<number | null>(null);
  public maxPagesSignal = signal<number | null>(null);

  public authors$?: Observable<Author[]>;
  public languages$?: Observable<Language[]>;
  public genres$?: Observable<Genre[]>;
  public displayModal = false;

  private authorService = inject(AuthorService);
  private genreService = inject(GenreService);
  private languageService = inject(LanguageService);

  constructor() {}

  ngOnInit() {
    this.authors$ = this.authorService.getAuthors();
    this.genres$ = this.genreService.getGenres();
    this.languages$ = this.languageService.getLanguages();
  }

  openFilterDialog() {
    this.displayModal = true;
  }

  closeFilterDialog() {
    this.displayModal = false;
  }

  applyFilters() {
    this.filtersChanged.emit({
      title: this.searchSignal(),
      author: this.authorsSignal()?.map(data => data.name),
      language: this.languagesSignal()?.map(data => data.name),
      genre: this.genreSignal()?.name,
      minPages: this.minPagesSignal(),
      maxPages: this.maxPagesSignal(),
    });

    this.closeFilterDialog();
  }

  resetFilters() {
    this.searchSignal.set('');
    this.authorsSignal.set(null);
    this.languagesSignal.set(null);
    this.genreSignal.set(null);
    this.minPagesSignal.set(null);
    this.maxPagesSignal.set(null);
    this.applyFilters();
  }

  onSearchChange(value: string) {
    this.searchSignal.set(value);
  }

  onAuthorsChange(value: Author[]) {
    this.authorsSignal.set(value);
  }

  onLanguagesChange(value: Language[]) {
    this.languagesSignal.set(value);
  }

  onGenreChange(value: Genre) {
    this.genreSignal.set(value);
  }

  onMinPagesChange(value: number) {
    this.minPagesSignal.set(value);
  }

  onMaxPagesChange(value: number) {
    this.maxPagesSignal.set(value);
  }
}
