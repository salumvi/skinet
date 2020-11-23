import { Component, OnInit } from '@angular/core';
import { IProduct } from './share/models/Product';
import { IPagination } from './share/models/Pagination';
import { ShopService } from './shop/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Skinet';

  constructor(){}

  ngOnInit(): void {

  }
}
