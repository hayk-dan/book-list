import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public book$?: Observable<Book | null>;

  ngOnInit(): void {
    const bookId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.book$ = this.bookService.getBook(bookId);
  }

  public onDelete(bookId: number | undefined): void {
    if (bookId) {
      this.bookService.deleteBook(bookId).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
