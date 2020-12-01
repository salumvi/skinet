import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChekoutComponent } from './chekout.component';

const rutas: Routes = [
  {path: '', component: ChekoutComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)

  ],
  exports: [
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
