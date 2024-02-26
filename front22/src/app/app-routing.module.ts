import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { HomeComponent } from './shared/home/home.component';
import { UserManageComponent } from './admin/user-manage/user-manage.component';
import { Dashborad2Component } from './shared/dashborad2/dashborad2.component';

import { AuthGuard } from './services/guard/auth.guard';
import { Dashboard1Component } from './shared/dashboard1/dashboard1.component';
import { Dashboard3Component } from './shared/dashboard3/dashboard3.component';

import { TransactionsComponent } from './shared/transactions/transactions.component';
import { ReportComponent } from './shared/report/report.component';

import { TodoListComponent } from './shared/todos/todo-list/todo-list.component';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';
import { ResetComponent } from './auth/reset/reset.component';
import { Profile2Component } from './shared/profile2/profile2.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'sales-dashboard', component: Dashborad2Component,canActivate: [ AuthGuard ] },
  { path: 'customers-dashboard',component:Dashboard1Component,canActivate:[AuthGuard]},
  { path:  'products-dashboard',component:Dashboard3Component,canActivate:[AuthGuard]},
  {path:'report' ,component:ReportComponent,canActivate:[AuthGuard]},
  {path:'todo-list' ,component:TodoListComponent,canActivate:[AuthGuard]},
  { path: 'signup', component: SignupComponent },
  { path: 'setting', component: ProfileComponent,canActivate: [ AuthGuard ]  },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'home', component: HomeComponent,canActivate: [ AuthGuard ]  },
  { path: 'transactions', component: TransactionsComponent,canActivate: [ AuthGuard ]  },
  { path: 'forbidden', component: ForbiddenComponent,canActivate: [ AuthGuard ]  },
  { path: 'user-manage', component: UserManageComponent,canActivate: [ AuthGuard ]  },
  { path: 'profile2', component: Profile2Component,canActivate: [ AuthGuard ]  },
   {path:'spinner',component:SpinnerComponent},

  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
