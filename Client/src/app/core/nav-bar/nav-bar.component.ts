import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/share/models/user';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../share/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  curretUser$: Observable<IUser>;
 
  basket$: Observable<IBasket>;
  constructor(private basS: BasketService, private accS: AccountService) {}

  ngOnInit(): void {
    this.basket$ = this.basS.basket$;
    this.curretUser$ = this.accS.currentUser$;

  }

  logout(){
    this.accS.logout();
  }
}
