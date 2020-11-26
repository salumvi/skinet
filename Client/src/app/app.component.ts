import { Component, OnInit } from '@angular/core';
import { IProduct } from './share/models/Product';
import { IPagination } from './share/models/Pagination';
import { ShopService } from './shop/shop.service';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Skinet';

  constructor(private setS: SettingsService){
    setS.cargarAjustes();
  }

  ngOnInit(): void {

  }
}
