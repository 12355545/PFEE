import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private selectedDiscount: number | undefined;
  
  private _codeClient!: number ;
  private _Date!: Date [] ;
   GetcodeClient(): number  {
    return this._codeClient;
  }

   SetcodeClient(value: number ) {
    this._codeClient = value;
  }
  Getselectdates() :Date []{
    return this._Date;
  }
  Setselectdates(date:Date[]) {
    this._Date= date ;
  }

  setDiscount(discount: number) {
    this.selectedDiscount = discount;
  }

  getDiscount() {
    return this.selectedDiscount;
  }




}
