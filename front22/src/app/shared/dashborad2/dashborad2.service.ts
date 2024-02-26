
import { Injectable } from '@angular/core';
import { BehaviorSubject ,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dashborad2Service {
  private _selectedyears: string[] = [];
  private _selectedchoix: string[] = [];

  // Create an Observable subject for selected choices
  private selectedChoixSubject = new BehaviorSubject<string[]>([]);
  private selctedyearsSubject =new BehaviorSubject<string[]>([]);
  constructor() { }

  Setselectedyears(value: string[] = []): void {
    this._selectedyears = value;
    this.selctedyearsSubject.next(value); 
  }

  Getselectedyears(): string[] {
    return this._selectedyears;
  }

  Setselectedchoix(value: string[] = []): void {
    this._selectedchoix = value;

    // Emit the updated choices using the subject
    this.selectedChoixSubject.next(value);
  }
  Getselectedchoix(): string[] {
    return this._selectedchoix;
  }

  // Expose an Observable to subscribe to selected choices changes
  GetSelectedChoixObservable(): Observable<string[]> {
    return this.selectedChoixSubject.asObservable();
  }

  GetSelectedyearsObservable() :Observable <string[]>{
    return this.selctedyearsSubject.asObservable();
  }
}
