import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/share/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {

  order: IOrder;
  constructor(private ruta: Router) { 
    const navigation = this.ruta.getCurrentNavigation();
    const state = navigation && navigation.extras.state;
    if(state){
      this.order = state as IOrder;
      console.log(this.order);

    }
  }

  ngOnInit(): void {
  }

}
