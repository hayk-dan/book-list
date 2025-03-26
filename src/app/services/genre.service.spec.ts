import { TestBed } from '@angular/core/testing';

import { GenreService } from './genre.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GenreService', () => {
  let service: GenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenreService],
    });
    service = TestBed.inject(GenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
