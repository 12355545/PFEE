import { TokenServiceService } from 'src/app/services/token-service/token-service.service';
import { UserService } from 'src/app/services/services';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AddTodoComponent } from '../add-todo/add-todo.component';
import { TodoOut, TodoList } from 'src/app/services/models';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';

import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{

  public shared!:number;

  editing: boolean = false;
  editingTodo: TodoOut = {
    completed: false,
    id: 0,
    time: '',
    title: ''
  };
  todos: TodoList = { todos: [] };
  role_name!: string;


  constructor(private dialog: MatDialog, private UserService:UserService,private router:Router,private TokenServiceService :TokenServiceService ,private todolist:TodoListService) { }

  ngOnInit() {
    this.role_name=this.TokenServiceService.userRole;


    this.getAllTodos();
    if(this.TokenServiceService.userRole == 'SUPER_ADMIN') {
      this.todolist.ResetTest();
    }

  }

  onAddTodo() {
    this.openTodoDialog(null);
  }

  openTodoDialog(data?:any){

    const dialogRef = this.dialog.open(AddTodoComponent,{
      disableClose : true,
      autoFocus : true ,
      width : "50%",
      data: {
        id: this.shared
      }
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result && data == null){
        this.todos.todos.push(result);
      }}
    );

  }


  openTodoDialog1(data?:any){

    const dialogRef = this.dialog.open(UpdateTodoComponent,{
      disableClose : true,
      autoFocus : true ,
      width : "50%",
      data: {
        id: this.shared
      }
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result && data == null){
        this.todos.todos.push(result);
      }}
    );

  }

  openTodo(data?:any){

    const dialogRef = this.dialog.open(UpdateTodoComponent,{
      disableClose : true,
      autoFocus : true ,
      width : "50%",
      data: {
        id: this.shared
      }
    });



  }

  getAllTodos(){
    this.UserService.readTodosTodoGet()
    .subscribe(
      response => {
        this.todos = response;
      }
    );
  }

deleteTodo(todo: TodoOut): void {
  if(this.TokenServiceService.userRole == 'SUPER_ADMIN') {
    localStorage.setItem('test', JSON.stringify(false));
  }else{
    localStorage.setItem('test', JSON.stringify(false));
  }
  this.UserService.deleteTodoTodoIdDelete({id: todo.id})
    .subscribe(
      data => {
        this.todos.todos = this.todos.todos.filter(u => u !== todo);
      },
      err => {
        console.error('There was an error in deleteTodo:', err);
      }
    )

}

  updateTodo(todo: TodoOut) {
   this.shared=todo.id;
    this.openTodoDialog1(todo);
  }
  getTodo(todo: TodoOut){
    this.shared=todo.id;
    this.openTodo(todo);
  }
  toggleCompleted(todoData: TodoOut): void {

    todoData.completed = !todoData.completed;

    this.UserService.completeTodoCompleteIdPut({id:todoData.id}).subscribe(response => {
      console.log('Response: ', response);
  }, error => {
      console.log('Error: ', error);
  });

  if(JSON.parse(localStorage.getItem('test') as string)==true){

    localStorage.setItem('test', JSON.stringify(false));
    localStorage.setItem('test1', JSON.stringify(true));
   }else
   {

    localStorage.setItem('test1', JSON.stringify(false));
   }




  }

  completedTodo (id:number){
    this.UserService.completeTodoCompleteIdPut({id:id});
  }

  clearEditing() {
  }
}

