import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChekoutService } from '../chekout.service';
import { IDeliveryMethod } from '../../share/models/deliveryMethod';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  
  @Input() checkOutForm: FormGroup;
  deliveryMethodos: IDeliveryMethod[]= [];
  constructor(private cheS: ChekoutService,
    private basS: BasketService) { }

  ngOnInit(): void {
    this.getDeliveryMethods();

  }

  private getDeliveryMethods(){
    this.cheS.getDeliveryMethods().subscribe(
      del => {
        this.deliveryMethodos=del;
      },error => console.log(error)
    )
  }
  setDeliveryPrice(deliveryMethod: IDeliveryMethod){
    this.basS.setDeliveriPrice(deliveryMethod);
  }

}
