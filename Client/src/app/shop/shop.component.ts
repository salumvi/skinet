import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPagination } from '../share/models/Pagination';
import { IProduct } from '../share/models/Product';
import { ShopService } from './shop.service';
import { IBrand } from '../share/models/brand';
import { IProductType } from '../share/models/productType';
import { ShopParams } from '../share/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];
  totalCount: number;

  shopParams: ShopParams;
  sortOptions = [
    {name: 'Alfabético', value: 'name'},
    {name: 'Precio menos a mas', value: 'priceAsc'},
    {name: 'Precio mas a menos', value: 'priceDesc'}
  ];
  constructor(public shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams(); 
    }


  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getProductsTypes();
  }

  getProducts(useCache = false){
    this.shopService.getProducts(useCache).subscribe((res: IPagination) =>
    {
      this.products = res.data;
      this.totalCount = res.count;
    }, error => console.log(error));
  }
  getBrands(){
    this.shopService.getBrands().subscribe((res: IBrand[]) =>
    {
      this.brands = [{ id: 0, name: 'Todos'}, ...res];
    }, error => console.log(error));
  }
  getProductsTypes(){
    this.shopService.getProductTypes().subscribe((res: IProductType[]) =>
    {
      this.productTypes = [{ id: 0, name: 'Todos'}, ...res];
    }, error => console.log(error));
  }

  onTypeSelected(typeId: number){
    const shopParams = this.shopService.getShopParams();

    shopParams.typeId = typeId;
    shopParams.pageNumber = 1;
    this.shopService.setShopParams(shopParams);

    this.getProducts();
  }
  onBrandSelected(brandId: number){

    const shopParams = this.shopService.getShopParams();

    shopParams.brandId = brandId;
    shopParams.pageNumber = 1;
    this.shopService.setShopParams(shopParams);
    this.getProducts(true);
  }
  onSortSelected(sort: string){
    const shopParams = this.shopService.getShopParams();
    shopParams.sort = sort;
    this.shopService.setShopParams(shopParams);
    this.getProducts();
  }

  onPageChanged(page: number){
    const shopParams = this.shopService.getShopParams();
    if (shopParams.pageNumber !== page){
      shopParams.pageNumber = page;
    this.shopService.setShopParams(shopParams);
      this.getProducts(true);
    }
  }

  onSearch(event){
    const shopParams = this.shopService.getShopParams();
    shopParams.search = event.trim();
    shopParams.pageNumber = 1;
    this.shopService.setShopParams(shopParams);
    this.getProducts();
  }
  onReset(event){
    
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

}
