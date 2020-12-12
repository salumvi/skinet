import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from '../share/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;

  isBasket=false;
  isOrder = false;


  constructor(private basS: BasketService) { }


  ngOnInit(): void {
     this.basket$ = this.basS.basket$;
     this.basketTotal$ = this.basS.basketTotal$;
  }

 
}
