import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IBasket, Basket, IBasketItem, IBasketTotals } from '../share/models/basket';
import { IProduct } from '../share/models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;

  // para convertilo en un observable con un valor inicial
  // esto se hace para tener la inforamción disponible en toda la app
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalsSource =new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalsSource.asObservable();


  constructor(private http: HttpClient) { }

  getBasket(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id )
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        })
      );
  }

  setBasket(basket: Basket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((res: IBasket) => {
      this.basketSource.next(res);
      this.calculateTotals();
    }, error => console.log(error));
  }
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1){
    const itemToAdd: IBasketItem = this.mapProductItemToBasket(item, quantity);
    const basket = this.getCurrentBasketValue() ??  this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }
  addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex( i => i.id === itemToAdd.id);
    if (index === -1){
        // no está
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);

    }else {
      // comprobar que no sea 0
      items[index].quantity += quantity;
    }

    return items;

  }

  incrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemBasket = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemBasket].quantity++;
    this.setBasket(basket);
  }

  
  decrementItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemBasket = basket.items.findIndex(x => x.id === item.id);
    if( basket.items[foundItemBasket].quantity > 1){
    basket.items[foundItemBasket].quantity--;
    this.setBasket(basket);
        
    } else {
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket);
  }

  removeItemFromBasket(item: IBasketItem) {
   const basket = this.getCurrentBasketValue();

   if(basket.items.some(x => x.id === item.id)){
     basket.items = basket.items.filter(i => i.id !== item.id);
     if(basket.items.length > 0){
       this.setBasket(basket);
     }else{
       this.deleteBasket(basket);
     }


    }


  }
  deleteBasket(basket: IBasket) {
    this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe( () =>{
      this.basketSource.next(null);
      this.basketTotalsSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => console.log
    )
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subTotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    const total = subTotal + shipping;
    this.basketTotalsSource.next({shipping, subTotal, total});

  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private mapProductItemToBasket(item: IProduct, quantity: number): IBasketItem {

    const basketItem: IBasketItem = {
      id : item.id,
      brand : item.producBrand,
      pictureUrl : item.pictureUrl,
      price : item.price,
      productName: item.name,
      quantity,
      type: item.productType,
    };
    return basketItem;

  }

}