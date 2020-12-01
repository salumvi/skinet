import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../share/models/Pagination';
import { IBrand } from '../share/models/brand';
import { IProductType } from '../share/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../share/models/shopParams';
import { IProduct } from '../share/models/Product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;


  getProducts(shopParams: ShopParams){

    let params = new HttpParams();

    params = params.append('Sort', shopParams.sort); // ya está inicealizado: name
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());


    if (shopParams.search){
      params = params.append('search', shopParams.search);
    }

    if (shopParams.typeId !== 0 ){
     params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.brandId !== 0){
      params = params.append('brandId', shopParams.brandId.toString());
     }


    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
        .pipe(
          map(res => res.body)
        );
  }

  /**
   * Devuelve un observable<Product> por id
   * @param id identificador del producto
   */
  getProduc(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }




  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getProductTypes(){
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
