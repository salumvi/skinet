import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrdersItemComponent } from './orders-item/orders-item.component';


const ruta: Routes =[
  {path:'', component: OrdersComponent },
  {path:':id', component: OrdersItemComponent, data: {breadcrumb: {alias: 'orderId'}}}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ruta)
  ], 
  exports:[
    RouterModule
  ]
})
export class OrdersRoutingModule { }
