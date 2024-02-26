 import { AfterViewInit, Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { NamepasswordChangeRequest, Profil } from 'src/app/services/models';
import { AuthenticationService, UserService } from 'src/app/services/services';
import { TokenServiceService } from 'src/app/services/token-service/token-service.service';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component implements OnInit{
  user: Profil = {
    email: '',
    full_name: '',
    role_name: ''
  }; // Property to hold user's details
  id!:number;
  email!: string;
  ngOnInit(): void {
this.getAll()
  }

constructor(private tokenService:TokenServiceService,private  authService: AuthenticationService,private userService:UserService,private toast:NgToastService)
{

}


upload(): void {
  this.id = this.tokenService.getUserId;
  const originalFullName = this.tokenService.getUsername;
  console.log(originalFullName)
  const originalEmail = this.email;

  if (this.id) {

    // Check if either full name or email has changed

    const changeprofile: NamepasswordChangeRequest = {
      Fullname: this.user.full_name,
      Email: this.user.email
    };

    this.authService.changePasswordChangeNameEmailIdPost({ 'id': this.id, body: changeprofile })
  .subscribe(
    response => {
      this.toast.success({
        type: 'success', // Add the type property
        detail: 'Success Message',
        summary: 'Successful change!',
      });
    },
    error => {

      this.toast.error({
        type: 'error', // Add the type property
        detail: 'Error Message',
        summary: 'Oops! Failed to update profile'
      });

    }
  );


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
      this.email=this.user.email
  }



  getImageUrl(): string {
    const id=this.tokenService.getUserId
    return `http://localhost:8000/getImage/${id}`;
  }
}
