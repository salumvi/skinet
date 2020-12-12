import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../share/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: IOrder[];
  constructor(private ordS: OrdersService, private ruta: Router) { }


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.ordS.getOrders().subscribe(orders => {
      this.orders = orders
    },error=> console.log(error));
  }

  verDetalleOrder(id: number){
    this.ruta.navigateByUrl('orders/' + id)

  }

}
