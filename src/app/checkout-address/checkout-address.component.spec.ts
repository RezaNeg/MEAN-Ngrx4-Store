import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAddressComponent } from './checkout-address.component';

describe('CheckoutAddressComponent', () => {
  let component: CheckoutAddressComponent;
  let fixture: ComponentFixture<CheckoutAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});