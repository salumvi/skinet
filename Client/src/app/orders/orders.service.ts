import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IOrder } from '../share/models/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getOrders(){
    return this.http.get<IOrder[]>(this.baseUrl + 'orders')
        .pipe(
          map(orders => orders.sort((a,b)=>a.id-b.id))
        );
  }

  getOrder(id: number){
    return this.http.get<IOrder>(this.baseUrl + 'orders/' + id)
  }

}
