import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChekoutComponent } from './chekout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';



@NgModule({
  declarations: [ChekoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
