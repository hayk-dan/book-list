import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    RouterModule,
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
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public bookForm: FormGroup;
  public title: string = '';
  public isBookCreated: boolean = false;
  public isEditMode: boolean = false;

  private bookId?: number;

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
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authors$ = this.authorService.getAuthors();
    this.genres$ = this.genreService.getGenres();
    this.languages$ = this.languageService.getLanguages();

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.isEditMode = params['edit'] === 'true';
        this.bookId = params['id'] ? +params['id'] : undefined;

        if (this.isEditMode && this.bookId) {
          this.bookService
            .getBook(this.bookId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((book) => {
              this.bookForm.patchValue(book as Book);
            });
        }
      });
  }

  public onSubmit(): void {
    if (this.isEditMode && this.bookId) {
      this.bookService
        .updateBook(this.bookId, this.bookForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          this.title = data.title;
          this.isBookCreated = true;
        });
    } else {
      this.bookService
        .createBook(this.bookForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          this.title = data.title;
          this.isBookCreated = true;
        });
    }
  }
}
