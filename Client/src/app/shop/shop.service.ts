import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, Pagination } from '../share/models/Pagination';
import { IBrand } from '../share/models/brand';
import { IProductType } from '../share/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../share/models/shopParams';
import { IProduct } from '../share/models/Product';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = environment.apiUrl;
  products: IProduct[]=[];
  brands: IBrand[]= [];
  types: IProductType[] = [];
  pagination = new Pagination()
  shopParams = new ShopParams();

  productCache = new Map();


  constructor(private http: HttpClient) { }


  getProducts(useCache: boolean){

    if(!useCache){
      this.productCache= new Map();
    }

    if(this.productCache.size > 0 && useCache){

      if(this.productCache.has(Object.values(this.shopParams).join('-'))){
       
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    params = params.append('Sort', this.shopParams.sort); // ya está inicealizado: name
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());


    if (this.shopParams.search){
      params = params.append('search', this.shopParams.search);
    }

    if (this.shopParams.typeId !== 0 ){
     params = params.append('typeId', this.shopParams.typeId.toString());
    }
    if (this.shopParams.brandId !== 0){
      params = params.append('brandId', this.shopParams.brandId.toString());
     }


    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
        .pipe(
          map(res => {
            this.productCache.set(Object.values(this.shopParams).join('-'),res.body);
            this.pagination = res.body;
            return this.pagination;
          })
        );
  }

  setShopParams(params: ShopParams){
    this.shopParams = params;
  }
  getShopParams(){
    return this.shopParams;
  }

  /**
   * Devuelve un observable<Product> por id
   * @param id identificador del producto
   */
  getProduc(id: number){
    
    const p = this.products.find(p => p.id === id);
    if(p){
      return of(p);
    }

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }




  getBrands(){
    if(this.brands.length > 0){
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').
    pipe(
      map(res => {
        this.brands = res;
        return res;
      })
    );
  }
  getProductTypes(){
    if(this.types.length > 0){
      return of(this.types);
    }
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types').
    pipe(
      map(res =>{
        this.types = res;
        return res;
      })
    );
  }
}
