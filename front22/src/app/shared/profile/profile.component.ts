import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordChangeRequest, Profil } from 'src/app/services/models';
import { AuthenticationService, UserService } from 'src/app/services/services';
import { TokenServiceService } from 'src/app/services/token-service/token-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Profil = {
    email: '',
    full_name: '',
    role_name: ''

  }; // Property to hold user's details
  passwordForm:FormGroup;
  uploadedImage!: File;
  imagePath: any;
  apiURLImage:string ='http://localhost:8000';

  id!:number;
  password1!: string;
  password!: string;
  password2!: string;

constructor(private tokenService:TokenServiceService,private userService:UserService,private  authService: AuthenticationService,private http: HttpClient,private fb: FormBuilder,private toast:NgToastService)
{
  let formControls = {
    password1: new FormControl('',[
      Validators.required,


    ]),
    password: new FormControl('',[
      Validators.required,

    ])
    ,
    password2: new FormControl('',[
      Validators.required,

    ])

  }
this.passwordForm = this.fb.group(formControls)
}
  ngOnInit(): void {
   this.getAll();
  }




  upload(): void {
    this.id = this.tokenService.getUserId;
    let data = this.passwordForm.value;
    if (this.id) {
      // Check if new password matches repeat password
   console.log("le password2 "+data.password2)
   console.log("le password "+data.password)
      if (data.password2==data.password) {
        const changepassword: PasswordChangeRequest = { new_password: data.password, old_password: data.password1 };

        this.authService.changePasswordChangePasswordIdPost({ 'id': this.id, body: changepassword })
          .subscribe(
            response => {
              this.toast.success({
                type: 'success', // Add the type property
                detail: 'Success Message',
                summary: 'The operation was successful!',
              });
            },
            error => {
              this.toast.error({
                type: 'error', // Add the type property
                detail: 'Error Message',
                summary: 'Failed to change password'
              });
             // alert('Failed to change password: ' + JSON.stringify(error));
            }
          );
      } else {
       // alert('New password and repeat password do not match.');
        this.toast.info({
          type: 'info', // Add the type property
          detail: 'Error Message',
          summary: 'New password and repeat password do not match.',
        });
        // You can add code here to change the border color of the input fields to red
      }
    } else {
      alert('Please provide a valid token and password.');
    }
  }




  getAll(): void {
    this.id = this.tokenService.getUserId;
    this.userService.readUsersUsersIdGet({ 'id': this.id })
      .subscribe({
        next: (data: Profil) => {
          this.user = data; // Assign the data to the user property
        }
      });
  }

  uploadImageFS(file: File, filename: string, id : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('images', file, filename);
    const url = `${this.apiURLImage}/uploadFS/${id}`;
    return this.http.post(url, imageFormData);
  }


  processForm() {
    const userId = this.tokenService.getUserId;
      this.uploadImageFS(this.uploadedImage, this.uploadedImage.name, userId).subscribe(() => {
      })

  }



  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }


    getImageUrl(): string {
      const id=this.tokenService.getUserId
      return `http://localhost:8000/getImage/${id}`;
    }

}
