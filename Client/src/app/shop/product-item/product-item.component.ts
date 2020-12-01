import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../share/models/Product';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() product: IProduct;
  quantity = 0;

  constructor(private basS: BasketService) { }

  ngOnInit(): void {
  }

  addItemToBasket(){
    this.basS.addItemToBasket(this.product)
  }

}
