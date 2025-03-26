import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AuthorService } from '../../services/author.service';
import { Observable } from 'rxjs';
import { Author } from '../../models/author.model';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss',
})
export class AuthorListComponent implements OnInit {
  private readonly authorService = inject(AuthorService);
  private readonly destroyRef = inject(DestroyRef);

  public authors$?: Observable<Author[]>;
  public authorName: string = '';
  public isDialogVisible: boolean = false;
  public editingAuthor: Author | null = null;

  ngOnInit(): void {
    this.authors$ = this.authorService.getAuthors();
  }

  public openCreateDialog(): void {
    this.authorName = '';
    this.editingAuthor = null;
    this.isDialogVisible = true;
  }

  public openEditDialog(author: Author): void {
    this.authorName = author.name;
    this.editingAuthor = author;
    this.isDialogVisible = true;
  }

  public saveAuthor(): void {
    if (!this.authorName.trim()) {
      return;
    }

    if (this.editingAuthor) {
      this.editingAuthor.name = this.authorName;
      this.authorService
        .updateAuthor(this.editingAuthor.id, this.editingAuthor)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.isDialogVisible = false;
        });
    } else {
      const newAuthor = { name: this.authorName };
      this.authorService
        .createAuthor(newAuthor)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.isDialogVisible = false;
          this.authors$ = this.authorService.getAuthors();
        });
    }
    this.isDialogVisible = false;
  }

  public deleteAuthor(authorId: number): void {
    this.authorService
      .deleteAuthor(authorId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.authors$ = this.authorService.getAuthors();
      });
  }
}
