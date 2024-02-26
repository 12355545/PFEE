import { TodoList } from './../../services/models/todo-list';
import { AddTodoService } from './../../shared/todos/add-todo/add-todo.service';
import { Router } from '@angular/router';
import { TokenServiceService } from './../../services/token-service/token-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { TodoListService } from 'src/app/shared/todos/todo-list/todo-list.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  private subscription!: Subscription;
  private subscription1!: Subscription;
  role_name!:string;
  bool1!:boolean
  bool!:boolean
  private timerSubscription: Subscription | undefined;
constructor(private TokenServiceService:TokenServiceService,private Router:Router,private AddTodoService:AddTodoService ,private TodoList:TodoListService)
{

}

ngOnInit(): void {
  this.role_name = this.TokenServiceService.userRole;

  this.bool = JSON.parse(localStorage.getItem('test') as string);



/*
  this.AddTodoService.test$.subscribe(value => {
    console.log("le valeur est "+value)
      this.bool = value;

  });*/

/*
  this.subscription = this.AddTodoService.test$.subscribe(value => {
    this.bool = value;

});*/

this.bool1 = JSON.parse(localStorage.getItem('test1') as string);
if (this.role_name === 'Decision maker') {
  this.timerSubscription = interval(3000).subscribe(() => {
    this.bool1 = false;
    localStorage.setItem('test1', JSON.stringify(this.bool1));
    this.timerSubscription?.unsubscribe();
  });
}
}
/*
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
*/
  get userName(): string {
    return this.TokenServiceService.getUsername;
  }

  get role() {
    return this.TokenServiceService.userRole;
  }

  getImageUrl(): string {
    const id=this.TokenServiceService.getUserId
    return `http://localhost:8000/getImage/${id}`;
  }
}
