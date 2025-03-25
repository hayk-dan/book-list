import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { DropdownModule } from 'primeng/dropdown';
import { AuthorService } from '../../services/author.service';
import { GenreService } from '../../services/genre.service';
import { LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs';
import { Author } from '../../models/author.model';
import { Language } from '../../models/languages';
import { Genre } from '../../models/genres';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DropdownModule,
    InputTextareaModule,
    RouterModule
  ],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss',
})
export class BookCreateComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly fb = inject(FormBuilder);
  private readonly authorService = inject(AuthorService);
  private readonly genreService = inject(GenreService);
  private readonly languageService = inject(LanguageService);

  public bookForm: FormGroup;
  public title: string = '';
  public isBookCreated: boolean = false;

  public authors$?: Observable<Author[]>;
  public languages$?: Observable<Language[]>;
  public genres$?: Observable<Genre[]>;

  constructor() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      language: ['', Validators.required],
      genre: ['', Validators.required],
      pages: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authors$ = this.authorService.getAuthors();
    this.genres$ = this.genreService.getGenres();
    this.languages$ = this.languageService.getLanguages();
  }

  public onSubmit():void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;
      this.bookService.createBook(newBook).subscribe((data) => {
        this.title = data.title;
        this.isBookCreated = true;
      });
    }
  }
}
