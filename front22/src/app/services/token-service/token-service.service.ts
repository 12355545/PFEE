import { Injectable } from '@angular/core';

import {JwtHelperService} from "@auth0/angular-jwt";
import { LoginResponse } from '../models';
@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {


  saveResponse(response: LoginResponse): void {

    localStorage.setItem('token', response.access_token as string);
    localStorage.setItem('id', response.id as any as string);
    localStorage.setItem('nom', response.full_name as any as string);


  }


  get getToken(): string {
    return localStorage.getItem('token') as string;
  }

  get getUserId(): number {
    return localStorage.getItem('id') as any as number;
  }

  get getUsername(): string {
    return localStorage.getItem('nom') as any as string;
  }

  get userRole(): string {
    const token = this.getToken;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);

   // console.log("le role est "+decodedToken.role[0].name)

      return decodedToken.sub ;
    }
    return '--';
  }

  cleanup(): void {
     // Get the selected discount value
    const selectedDiscount = localStorage.getItem('selectedDiscount');
    const bool = JSON.parse(localStorage.getItem('test') as string);
    const bool1=JSON.parse(localStorage.getItem('test1') as string);
    localStorage.clear(); // Clear the entire localStorage
    if (selectedDiscount !== null) {
      localStorage.setItem('selectedDiscount', selectedDiscount as any as string);
     // Set the selected discount back in localStorage
    }
    if (bool ==true) {
      localStorage.setItem('test', JSON.stringify(true));
     // Set the selected discount back in localStorage
    }else
    {
      localStorage.setItem('test', JSON.stringify(false));
    }

    if (bool1 == true) {
      localStorage.setItem('test1', JSON.stringify(true));
     // Set the selected discount back in localStorage
    }else
    {
      localStorage.setItem('test1', JSON.stringify(false));
    }
  }


  get isTokenValid(): boolean {
    const token = this.getToken;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const isTokenExpired = jwtHelper.isTokenExpired(token);
      if (isTokenExpired) {
        localStorage.clear();
        return false;
      }
      return true;
    }
    return false;
  }

}
