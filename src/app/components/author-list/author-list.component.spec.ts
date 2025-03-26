import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListComponent } from './author-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorListComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
