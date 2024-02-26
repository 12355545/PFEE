import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calender3Component } from './calender3.component';

describe('Calender3Component', () => {
  let component: Calender3Component;
  let fixture: ComponentFixture<Calender3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Calender3Component]
    });
    fixture = TestBed.createComponent(Calender3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
