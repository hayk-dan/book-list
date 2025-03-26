import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateComponent } from './book-create.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { of } from 'rxjs';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  let mockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = {
      queryParams: of({ edit: 'true', id: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [BookCreateComponent, HttpClientModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
