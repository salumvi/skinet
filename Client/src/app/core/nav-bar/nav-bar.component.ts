import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../share/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
 
  basket$: Observable<IBasket>;
  constructor(private basS: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basS.basket$;
  }
}
