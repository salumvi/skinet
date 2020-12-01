import { Component, OnInit } from '@angular/core';
import { IProduct } from './share/models/Product';
import { IPagination } from './share/models/Pagination';
import { ShopService } from './shop/shop.service';
import { SettingsService } from './core/services/settings.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Skinet';

  constructor(private setS: SettingsService,
              private basS: BasketService){
    setS.cargarAjustes();
  }

  ngOnInit(): void {

    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basS.getBasket(basketId).subscribe((basket) =>{
        console.log('Bolsa inizialeçizada');
      },error => console.log)
    }

  }
}
