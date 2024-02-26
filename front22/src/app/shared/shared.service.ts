
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

       

  public setDiscount(discount: number): void {
     console.log("je suis dans le methode setDiscount dans le sharedService"+discount)
    localStorage.setItem('selectedDiscount', discount as any as string);
  }


  public getDiscount():number{
   return  localStorage.getItem('selectedDiscount') as any as number;

  }




  cleanup(): void {
    localStorage.clear();
  }


}
