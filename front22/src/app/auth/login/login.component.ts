import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/services';
import { TokenServiceService } from 'src/app/services/token-service/token-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMsg = '';
  registreForm:FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenServiceService,
    private fb: FormBuilder,private toast:NgToastService
  ) {
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email

      ]),
      password: new FormControl('',[
        Validators.required,

      ])

    }
  this.registreForm = this.fb.group(formControls)
  }

  get email() { return this.registreForm.get('email') }

  get password() { return this.registreForm.get('password') }

  login() {
    let data = this.registreForm.value;
   


    if (!data.email || !data.password) {
      this.toast.info({
        type: 'info', // Add the type property
        detail: 'Error Message',
        summary: 'Fill in your field',
      });

       // Exit the function if fields are empty.
    }
else{


    this.errorMsg = '';
    this.authService.loginSignUpPost({ body: data })
    .subscribe({
        next: (response) => {
            this.tokenService.saveResponse(response);
            this.toast.success({
              type: 'success', // Add the type property
              detail: 'Success Message',
              summary: 'Bingo! the authentication was successful!',
            });

            this.router.navigate(['home']);
        },
        error: (err) => {
          this.toast.error({
            type: 'error', // Add the type property
            detail: 'Error Message',
            summary: 'Oops! email or password not found'
          });


        }
    });
}
}
}
