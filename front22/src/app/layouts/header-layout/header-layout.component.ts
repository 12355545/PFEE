import { Router } from '@angular/router';
import { TokenServiceService } from './../../services/token-service/token-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent {
  constructor(private TokenServiceService :TokenServiceService,private Router:Router)
  {

  }

  logout() {
    this.TokenServiceService.cleanup();
    this.Router.navigate(['login']);
  }
}

