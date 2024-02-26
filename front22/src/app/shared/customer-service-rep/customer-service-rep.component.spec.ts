import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceRepComponent } from './customer-service-rep.component';

describe('CustomerServiceRepComponent', () => {
  let component: CustomerServiceRepComponent;
  let fixture: ComponentFixture<CustomerServiceRepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerServiceRepComponent]
    });
    fixture = TestBed.createComponent(CustomerServiceRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
