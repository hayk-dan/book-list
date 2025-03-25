import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookCreateComponent } from './components/book-create/book-create.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

export const routes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'book/:id', component: BookDetailComponent},
  {path: 'create-book', component: BookCreateComponent},
  {path: 'authors', component: AuthorListComponent},
];
