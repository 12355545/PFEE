import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DateSelectionService {


  private selectedDateSubject= new BehaviorSubject<Date | undefined>(new Date('2017-01-01T00:00:00')); // Set the default date here
  selectedDate$ = this.selectedDateSubject.asObservable();

  setSelectedDate(date: Date) {
    this.selectedDateSubject.next(date);
  }
}
