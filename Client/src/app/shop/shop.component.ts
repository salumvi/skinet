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



  constructor(public shopService: ShopService) { }

  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];
  totalCount: number;

  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alfabético', value: 'name'},
    {name: 'Precio menos a mas', value: 'priceAsc'},
    {name: 'Precio mas a menos', value: 'priceDesc'}
  ];


  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductsTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe((res: IPagination) =>
    {
      this.products = res.data;
      this.totalCount = res.count;
      this.shopParams.pageNumber = res.pageIndex;
      this.shopParams.pageSize = res.pageSize;

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

    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onBrandSelected(brandId: number){

    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort: string){

    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(page: number){

    if (this.shopParams.pageNumber !== page){
      this.shopParams.pageNumber = page;
      this.getProducts();
    }
  }

  onSearch(event){
    this.shopParams.search = event.trim();
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset(event){
    
    console.log(event);
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
