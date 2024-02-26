import { TokenServiceService } from 'src/app/services/token-service/token-service.service';
import { AdminService } from './../../services/services/admin.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserOut, UserResponse } from "src/app/services/models";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent  implements OnInit{

  customers: Array<UserOut> = [];
  showInactiveUserOnly = false;
  userIdToUpdate = -1;
  updateState: boolean | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  searchTerm: string = '';
  role?:string ;
  constructor(
    private AdminService: AdminService,private tokenService :TokenServiceService
  ) { }

  ngOnInit(): void {

    this.findAllCustomers();
    this.role=this.tokenService.userRole;
    console.log(this.role)

  }

  private findAllCustomers() {
    this.AdminService.getUsersUsersGet()
      .subscribe((value: UserOut[]) => {
        this.customers=value // Use UserOut[] directly
        this.customers = value.filter(c => c.full_name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      });
  }


  filterCustomers() {
    if (this.showInactiveUserOnly) {
      this.customers = this.customers.filter((c) => !c.is_active);
    } else {
      this.findAllCustomers();
    }
  }

  changeUserState(active: boolean | undefined, id: number | undefined) {
    this.userIdToUpdate = id as number;
    this.updateState = active;
  }

  updateUserState() {

    if (this.updateState) {

      this.AdminService.updateValidateaccountUserIdPut({
        'user_id': this.userIdToUpdate as number
      }).subscribe({
        next: () =>{
          this.findAllCustomers();
        }
      });
    } else {
      this.AdminService.updateInvalidateaccountUserIdPut({
        'user_id': this.userIdToUpdate as number
      }).subscribe({
        next: () =>{}
      });
    }

  }

  cancelUpdate() {
    const user = this.customers.find((c) =>c.id === this.userIdToUpdate);
    if (user) {
      user.is_active = !user.is_active
    }
    this.userIdToUpdate = -1;
    this.updateState = undefined
  }

  pageChanged(newPage: number) {
    this.currentPage = newPage;
  }

  updateItemsPerPage(value: string): void {
    this.itemsPerPage = parseInt(value, 10);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.findAllCustomers();
  }



  getImageUrl(id:number): string {
    return `http://localhost:8000/getImage/${id}`;
  }


}


