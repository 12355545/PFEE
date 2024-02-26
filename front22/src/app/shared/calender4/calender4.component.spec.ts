import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calender4Component } from './calender4.component';

describe('Calender4Component', () => {
  let component: Calender4Component;
  let fixture: ComponentFixture<Calender4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calender4Component]
    });
    fixture = TestBed.createComponent(Calender4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
