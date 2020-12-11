import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { ChekoutService } from '../chekout.service';
import { ToastrService } from 'ngx-toastr';
import { IBasket } from 'src/app/share/models/basket';
import { IOrder, IOrderToCreate } from '../../share/models/order';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  @Input() checkOutForm: FormGroup;
  constructor(private basS: BasketService, private cheS: ChekoutService, private toast: ToastrService, private ruta: Router) { }

  ngOnInit(): void {
  }

  submitOrder(){
    const basket = this.basS.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.cheS.createOrder(orderToCreate).subscribe((order: IOrder)=>{
      this.toast.success('Orden crada correctamente');
      this.basS.deleteLocalBasket(basket.id);
      const navigationExtras: NavigationExtras={state: order}
this.ruta.navigate(['checkout/success'], navigationExtras);
    },error => {
      this.toast.error(error.menssage);
      console.log(error);
    })
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    console.log(this.checkOutForm.controls.deliveryForm.value.delivery);
    return {
      basketId: basket.id,
      deliveryMethodId: + this.checkOutForm.controls.deliveryForm.value.delivery,
      shipToAddress: this.checkOutForm.controls.addressForm.value
    }
  }

}
