import { Component, Input, OnInit} from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  @Input() isBasket= true;
  @Input() isOrder= false;
  @Input() items: IBasketItem[] | IOrderItem[] =[];

  constructor(private basS: BasketService) { }

  ngOnInit(): void {
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
