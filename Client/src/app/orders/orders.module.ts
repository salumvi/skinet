import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersItemComponent } from './orders-item/orders-item.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [OrdersComponent, OrdersItemComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ShareModule
  ]
})
export class OrdersModule { }
