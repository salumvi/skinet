import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { IOrderItem } from '../../share/models/order';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss']
})
export class OrdersItemComponent implements OnInit {

  items: IOrderItem[]
  isBasket=false;
  isOrder = false;

  subtotal: number;
  shipping: number;
  total:number;

  
  constructor(
    private ordS: OrdersService,
    private rutaActiva: ActivatedRoute, 
    private bcS: BreadcrumbService) 
    {
    this.bcS.set('@orderId',' ')

   }


  ngOnInit(): void {
    this.getOrder();
  }

 private getOrder(){
    const id = this.rutaActiva.snapshot.params['id']
    this.ordS.getOrder(id).subscribe(
      order => {
        this.items = order.orderItems;
        this.subtotal = order.subtotal;
        this.shipping = order.shippingPrice;
        this.total = order.total;
        this.bcS.set('@orderId',`Order# ${order.id} - ${order.status}`)
      },
      error => {
        console.log(error);
      }
    );
  }

  

}
