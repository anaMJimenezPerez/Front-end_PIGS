import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersProfileComponent } from './orders-profile.component';

describe('OrdersProfileComponent', () => {
  let component: OrdersProfileComponent;
  let fixture: ComponentFixture<OrdersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
