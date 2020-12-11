import { Component, Input, OnInit} from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  basket$: Observable<IBasket>;
  @Input() isBasket= true;
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
