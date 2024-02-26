import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Calender4Service {
  private selectedYear = new BehaviorSubject<string>(''); // Initialize with the default year

  setYear(year: string) {
    this.selectedYear.next(year);
  }

  getYear() {
    return this.selectedYear.asObservable();
  }
}
