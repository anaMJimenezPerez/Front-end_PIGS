import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesProfileComponent } from './favourites-profile.component';

describe('FavouritesProfileComponent', () => {
  let component: FavouritesProfileComponent;
  let fixture: ComponentFixture<FavouritesProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
