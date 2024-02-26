import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Calender1Service {
  private selectedYear = new BehaviorSubject<any>(null);

  setYear(year: any) {
    this.selectedYear.next(year);
  }

  getYear() {
    return this.selectedYear.asObservable();
  }



  private selectedDatesSubject = new BehaviorSubject<Date[]>([
   // You can add or remove default dates here
  ]);


  selectedDates$ = this.selectedDatesSubject.asObservable();

  setSelectedDates(dates: Date[]) {
    console.log("the selected date est"+dates)
    this.selectedDatesSubject.next(dates);
  }

  getSelectedDates(): Observable<Date[]> {
    return this.selectedDatesSubject.asObservable();
  }



}
