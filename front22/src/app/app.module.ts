
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FooterLayoutComponent } from './layouts/footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';
import { UserManageComponent } from './admin/user-manage/user-manage.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Calender1Component } from './shared/calender1/calender1.component';
import { CalenderComponent } from './shared/calender/calender.component';
import { Dashboard1Component } from './shared/dashboard1/dashboard1.component';
import { TransactionComponent } from './shared/transaction/transaction.component';
import { TransactionsComponent } from './shared/transactions/transactions.component';
import { MainAdminPageComponent } from './admin/main-admin-page/main-admin-page.component';
import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './shared/home/home.component';
import { Dashborad2Component } from './shared/dashborad2/dashborad2.component';
import { BarChartComponent } from './shared/bar-chart/bar-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { MapComponentComponent } from './shared/map-component/map-component.component';
import { WorldMapComponent } from './shared/world-map/world-map.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HttpInterceptorService } from './services/interceptor/interceptor.service';
import { ProductsComponent } from './shared/products/products.component';
import { Dashboard3Component } from './shared/dashboard3/dashboard3.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {NgxPaginationModule} from 'ngx-pagination';
import { Calender3Component } from './shared/calender3/calender3.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { Calender4Component } from './shared/calender4/calender4.component';
import { ReportComponent } from './shared/report/report.component'; // module import
import { AddTodoComponent } from './shared/todos/add-todo/add-todo.component';
import { TodoListComponent } from './shared/todos/todo-list/todo-list.component';
import { UpdateTodoComponent } from './shared/todos/update-todo/update-todo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';
import { NgToastModule } from 'ng-angular-popup';
import { ResetComponent } from './auth/reset/reset.component';
import { Profile2Component } from './shared/profile2/profile2.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { DecisionMakerComponent } from './shared/decision-maker/decision-maker.component';
import { CustomerServiceRepComponent } from './shared/customer-service-rep/customer-service-rep.component';
import { SharedService } from './shared/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FooterLayoutComponent,
    HeaderLayoutComponent,
    UserManageComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    Calender1Component,
    CalenderComponent,
    Dashboard1Component,
    TransactionComponent,
    TransactionsComponent,
    MainAdminPageComponent,
    HomeComponent,
    Dashborad2Component,
    BarChartComponent,
    MapComponentComponent,
    WorldMapComponent,
    SpinnerComponent,
    ProductsComponent,
    Dashboard3Component,
    Calender3Component,
    Calender4Component,
    ReportComponent,
    AddTodoComponent,
    TodoListComponent,
    UpdateTodoComponent,
    ForbiddenComponent,
    ResetComponent,
    RecoverPasswordComponent,
    Profile2Component,
    DecisionMakerComponent,
    CustomerServiceRepComponent,



  ],
  imports: [
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatDatepickerModule,
    DataTablesModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule ,
    MatNativeDateModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    NgxMultipleDatesModule ,
    MatNativeDateModule,
    MatDialogModule,

    NgxEchartsModule.forRoot({ echarts }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,

      multi: true
    },
    HttpClient,

    [DatePipe]
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
