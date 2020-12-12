import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { BasketService } from '../../basket/basket.service';
import { IBasket, IBasketItem, IBasketTotals } from '../../share/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {


  basket$: Observable<IBasket>;
  isBasket=false;
  isOrder = false;
  constructor(private basS: BasketService) { }
  

  ngOnInit(): void {
  
    this.basket$= this.basS.basket$;
  }



}
