import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import { first, of } from 'rxjs';
import { Book } from '../../models/book.model';
import { FilterComponent } from '../../shared/filter/filter.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookServiceMock: jasmine.SpyObj<BookService>;

  const mockBooks: Book[] = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      language: 'English',
      pages: 100,
      genre: 'Fiction',
      description: 'Description 1',
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      language: 'English',
      pages: 150,
      genre: 'Non-Fiction',
      description: 'Description 2',
    },
  ];

  beforeEach(async () => {
    bookServiceMock = jasmine.createSpyObj('BookService', ['getBooks']);
    bookServiceMock.getBooks.and.returnValue(of(mockBooks));

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        TableModule,
        FilterComponent,
        BookListComponent,
        HttpClientModule,
      ],
      providers: [
        { provide: BookService, useValue: bookServiceMock },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on init', () => {
    expect(bookServiceMock.getBooks).toHaveBeenCalledWith({});

    component.books$?.pipe(first()).subscribe((books) => {
      expect(books.length).toBe(2);
      expect(books[0].title).toBe('Book 1');
      expect(books[1].title).toBe('Book 2');
    });
  });

  it('should track by book id', () => {
    const book = mockBooks[0];
    expect(component.trackByBookId(0, book)).toBe(book.id);
  });
});
