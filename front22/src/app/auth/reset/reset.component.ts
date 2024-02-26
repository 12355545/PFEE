import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router ,Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { PasswordReset } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  password: string;
  confirmPassword: string;
  token: string; // Add the token property to store the token value



  private subscription!: Subscription;

  constructor(private router: Router,private authService: AuthenticationService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          console.log('NavigationStart:', event);
      }
      if (event instanceof NavigationEnd) {
          console.log('NavigationEnd:', event);
      }
      if (event instanceof NavigationError) {
          console.log('NavigationError:', event);
      }
  });
  this.password = '';
  this.confirmPassword = '';
  this.token = '';

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);

    });
  }

  ngOnInit(): void {

  }


  resetNewPassword(): void {
    if (this.token) {
        const resetData: PasswordReset = { password: this.password };

        this.subscription = this.authService.resetResetPut({
            token: this.token,
            body: resetData
        }).subscribe(
            response => {
                alert(response.message);  // Using the returned message from the backend
            },
            error => {
                alert('Failed to change password: ' + JSON.stringify(error));
            }
        );
    } else {
        alert('Please provide a valid token and password.');
    }
}


  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
