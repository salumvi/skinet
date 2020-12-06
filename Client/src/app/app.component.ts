import { Component, OnInit } from '@angular/core';
import { IProduct } from './share/models/Product';
import { IPagination } from './share/models/Pagination';
import { ShopService } from './shop/shop.service';
import { SettingsService } from './core/services/settings.service';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(
    private setS: SettingsService,
    private basS: BasketService,
    private accS: AccountService
  ) {
    setS.cargarAjustes();
  }

  ngOnInit(): void {
    this.loadBaket();
    this.loadCurrentuser();
  }

  loadCurrentuser() {
    const token = localStorage.getItem('AppToken');
    this.accS.loadCurrentUser(token).subscribe(
      () => console.log('usuario inicializaco'),
      (error) => console.log(error)
    );
  }

  loadBaket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basS.getBasket(basketId).subscribe(
        () => {
          console.log('Bolsa inizializada');
        },
        (error) => console.log
      );
    }
  }
}
