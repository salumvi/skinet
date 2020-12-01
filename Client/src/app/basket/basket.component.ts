import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../share/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$: Observable<IBasket>;
  constructor(private basS: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basS.basket$;
  }

  incrementItemQuantity(item: IBasketItem){
    this.basS.incrementItemQuantity(item);
  }
  decrementItemBasket(item: IBasketItem){
    this.basS.decrementItemQuantity(item);
  }
  removeBasketItem(item: IBasketItem){
    this.basS.removeItemFromBasket(item);
  }


}
