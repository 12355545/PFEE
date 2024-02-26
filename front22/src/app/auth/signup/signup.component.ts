import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toast: NgToastService,
    private fb: FormBuilder
  ) {
    let formControls = {
      full_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      hashed_password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
      role:new FormControl('',[Validators.required])
    };
    this.signupForm = this.fb.group(formControls);
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    if (this.signupForm.get('confirm_password')?.value !== this.signupForm.get('hashed_password')?.value) {
      // Passwords don't match, handle the error
      this.toast.error({
        type: 'error',
        detail: 'Error Message',
        summary: 'Passwords do not match.'
      });
      return;
    }

    // Create a User object from the form values

    let data = this.signupForm.value;
    this.authService.registerRegisterPost({
      body: data // Pass the user object as the body
    }).subscribe({
      next: (res) => {
        this.toast.success({
          type: 'success',
          detail: 'Success Message',
          summary: 'Bingo! The account has been created and is awaiting validation by the admin.'
        });
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.toast.error({
          type: 'error',
          detail: 'Error Message',
          summary: 'Oops! An error occurred.'
        });
      }
    });
  }
}
