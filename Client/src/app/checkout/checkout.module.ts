import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChekoutComponent } from './chekout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { ShareModule } from '../share/share.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';



@NgModule({
  declarations: [ChekoutComponent, CheckoutAddressComponent, CheckoutDeliveryComponent, CheckoutReviewComponent, CheckoutPaymentComponent, CheckoutSuccessComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ShareModule
  ]
})
export class CheckoutModule { }
