import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTodoService {
    private _testSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public test$ = this._testSubject.asObservable();

    // Setter
    public SetTest(): void {

      this._testSubject.next(true);
    }
    public ResetTest(): void {
      this._testSubject.next(false);
    }

}
