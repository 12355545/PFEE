import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Calender1Service } from '../calender1/calender1.service';

@Injectable({
  providedIn: 'root'
})
export class DateSelectionService {
  private selectedDatesSubject = new BehaviorSubject<Date[]>([]);

  selectedDates$ = this.selectedDatesSubject.asObservable();

  constructor(private calender1Service: Calender1Service) {
    // Subscribe to the observable and update the behavior subject when new values arrive
    this.calender1Service.getSelectedDates().subscribe(dates => {
      this.selectedDatesSubject.next(dates);
    });
  }

  setSelectedDates(dates: Date[]) {
    console.log("the selected date est " + dates)
    this.selectedDatesSubject.next(dates);
  }
}
