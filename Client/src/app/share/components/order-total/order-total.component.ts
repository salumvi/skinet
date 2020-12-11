import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from '../../models/basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {

 
  basketTotal$: Observable<IBasketTotals>;
  constructor(private basS: BasketService) {

   }

  ngOnInit(): void {
    this.basketTotal$ = this.basS.basketTotal$;
    
  }

}
