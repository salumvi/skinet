import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChekoutComponent } from './chekout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

const rutas: Routes = [
  {path: '', component: ChekoutComponent},
  {path: 'success', component: CheckoutSuccessComponent,data: { breadcrumb: 'Success' }}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)

  ],
  exports: [
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
