import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const rutas: Routes = [
  {path: 'login', component: LoginComponent, data: {breadcrumb: {alias: 'login'}}},
  {path: 'register', component: RegisterComponent, data: {breadcrumb: {alias: 'register'}}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
