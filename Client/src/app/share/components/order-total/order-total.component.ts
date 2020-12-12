import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {

 
  basketTotal$: Observable<IBasketTotals>;

  @Input() subtotal: number;
  @Input() shipping: number;
  @Input() total: number;
  constructor() {

   }

  ngOnInit(): void {
    
    
  }

}
