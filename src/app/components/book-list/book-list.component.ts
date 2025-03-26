import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Filter, FilterComponent } from '../../shared/filter/filter.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ButtonModule,
    TableModule,
    FilterComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrls:[ './book-list.component.scss']
})
export class BookListComponent implements OnInit {
  private readonly bookService = inject(BookService);
  
  public books$?: Observable<Book[]>;

  ngOnInit() {
    this.fetchBooks({});
  }

  fetchBooks(filters: Filter) {
    this.books$ = this.bookService.getBooks(filters);
  }
}
