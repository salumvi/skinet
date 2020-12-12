import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasketService } from '../../basket/basket.service';
import { IBasket, IBasketItem } from '../../share/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit, OnDestroy {

  items: IBasketItem[]
  f: Subscription;
  isBasket=false;
  isOrder = false;
  constructor(private basS: BasketService) { }
  

  ngOnInit(): void {
   this.f = this.basS.basket$.subscribe(basket => {
     this.items=basket.items;
   })
  }

  ngOnDestroy(): void {
    this.f.closed;
  }

}
