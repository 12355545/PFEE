import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
    private _testSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public test$ = this._testSubject.asObservable();

    // Setter
    public SetTest(value: boolean): void {
      console.log("Setting _test value to:", value);
      this._testSubject.next(value);
    }
    public ResetTest(): void {
      this._testSubject.next(false);
    }

}
