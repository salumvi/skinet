import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { IProduct } from '../../share/models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(private shopService: ShopService, private activatedRute: ActivatedRoute) { 

  }

  ngOnInit(): void {
   this.loadProduc();
  }

  loadProduc()
  {
    this.shopService.getProduc(+ this.activatedRute.snapshot.paramMap.get('id')).subscribe(res => {

      this.product = res;
    },
    error => console.log(error)
    );

  }

}
