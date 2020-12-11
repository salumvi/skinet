import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDeliveryMethod } from '../share/models/deliveryMethod';
import { map } from 'rxjs/operators';
import { IOrderToCreate } from "../share/models/order";

@Injectable({
  providedIn: 'root'
})
export class ChekoutService {

  baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliverymethods')
        .pipe(
          map((dm: IDeliveryMethod[]) => dm.sort((a,b) => b.price - a.price))
          )
  }

  createOrder(order: IOrderToCreate){
    return this.http.post(this.baseUrl + 'orders', order);
  }


}