import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistStatusComponent } from './wishlist-status.component';

describe('WishlistStatusComponent', () => {
  let component: WishlistStatusComponent;
  let fixture: ComponentFixture<WishlistStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
