import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const rutas: Routes = [
  {path:  '', component: ShopComponent},
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'producBC'}} },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
