import { TestBed } from '@angular/core/testing';
import { AuthorService } from './author.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Author } from '../models/author.model';
import { API_URL } from '../app.config';
import { first } from 'rxjs';

describe('AuthorService', () => {
  let service: AuthorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService],
    });
    service = TestBed.inject(AuthorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get authors', () => {
    const mockAuthors: Author[] = [
      { id: 1, name: 'Author 1' },
      { id: 2, name: 'Author 2' },
    ];

    service
      .getAuthors()
      .pipe(first())
      .subscribe((authors) => {
        expect(authors.length).toBe(2);
        expect(authors).toEqual(mockAuthors);
      });

    const req = httpMock.expectOne(`${API_URL}/authors`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthors);
  });

  it('should create a new author', () => {
    const newAuthor: Omit<Author, 'id'> = { name: 'New Author' };
    const createdAuthor: Author = { id: 3, name: 'New Author' };

    service
      .createAuthor(newAuthor)
      .pipe(first())
      .subscribe((author) => {
        expect(author).toEqual(createdAuthor);
      });

    const req = httpMock.expectOne(`${API_URL}/authors`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAuthor);
    req.flush(createdAuthor);
  });

  it('should update an author', () => {
    const updatedAuthor: Author = { id: 1, name: 'Updated Author' };

    service
      .updateAuthor(1, updatedAuthor)
      .pipe(first())
      .subscribe((author) => {
        expect(author).toEqual(updatedAuthor);
      });

    const req = httpMock.expectOne(`${API_URL}/authors/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedAuthor);
    req.flush(updatedAuthor);
  });

  it('should delete an author', () => {
    const authorId = 1;

    service
      .deleteAuthor(authorId)
      .pipe(first())
      .subscribe((response) => {
        expect(response).toBeUndefined();
      });

    const req = httpMock.expectOne(`${API_URL}/authors/1`);
    expect(req.request.method).toBe('DELETE');
  });
});
