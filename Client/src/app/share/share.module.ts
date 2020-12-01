import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { SearchHederComponent } from './components/search-heder/search-heder.component';
import { OrderTotalComponent } from './components/order-total/order-total.component';



@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, SearchHederComponent, OrderTotalComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    PaginationModule,
    AlertModule,
    PagingHeaderComponent,
    PagerComponent,
    SearchHederComponent,
    CarouselModule,
    OrderTotalComponent
  ]
})
export class ShareModule { }
