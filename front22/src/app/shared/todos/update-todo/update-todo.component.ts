import { TokenServiceService } from 'src/app/services/token-service/token-service.service';
import { User } from './../../../services/models/user';
import { UserService } from 'src/app/services/services';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoUpdate } from 'src/app/services/models/todo-update';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TodoList } from 'src/app/services/models';


@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit{
  todos: TodoList = { todos: [] };
   todo: TodoUpdate = {
    id:-1,
    description: '',
    time: '',
    title: ''
  };
  role_name!: string;

  constructor(private UserService:UserService,private router:Router,@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,private TokenServiceService:TokenServiceService) { }

  ngOnInit() {
    this.role_name=this.TokenServiceService.userRole;

    console.log("l'id nouveau est"+this.data.id)
  this.UserService.readTodoByIdTodoIdGet({id:this.data.id}).subscribe((data)=>{
    this.todo=data;
  })
  }
  closeDialog() {
    this.dialog.closeAll(); // this closes all open dialogs
  }
  processForm(){

    this.UserService.updateTodoUpdateIdPut({id: this.todo.id, body: this.todo}).subscribe((todo)=> {


    this.closeDialog()

    this.router.navigate(['/todo-list']);
    window.location.reload();

    },(error)=>{
      console.log(error);
    });
 }

}
