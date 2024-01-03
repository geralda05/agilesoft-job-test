import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMoviesCarouselComponent } from './new-movies-carousel.component';

describe('NewMoviesCarouselComponent', () => {
  let component: NewMoviesCarouselComponent;
  let fixture: ComponentFixture<NewMoviesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMoviesCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMoviesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
