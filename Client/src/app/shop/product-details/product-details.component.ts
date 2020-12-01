import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { IProduct } from '../../share/models/Product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private activatedRute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basS: BasketService
  ) {
    this.bcService.set('@producBC', ' ');
  }

  ngOnInit(): void {
    this.loadProduc();
    const basket = this.basS.getCurrentBasketValue();
    // para modificar la cantidad de la bolsa
    // this.quantity = basket.items.find(x => x.id === +this.activatedRute.snapshot.paramMap.get('id')).quantity;

  }

  addItemToBasket(){
    this.basS.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity > 1) {
      this.quantity--;
     }
  }

  loadProduc() {
    this.shopService
      .getProduc(+this.activatedRute.snapshot.paramMap.get('id'))
      .subscribe(
        (res) => {
          this.product = res;
          this.bcService.set('@producBC', this.product.name);
        },
        (error) => console.log(error)
      );
  }
}
