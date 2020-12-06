import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { SearchHederComponent } from './components/search-heder/search-heder.component';
import { OrderTotalComponent } from './components/order-total/order-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextImputComponent } from './components/text-imput/text-imput.component';



@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, SearchHederComponent, OrderTotalComponent, TextImputComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    PaginationModule,
    AlertModule,
    PagingHeaderComponent,
    PagerComponent,
    SearchHederComponent,
    CarouselModule,
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextImputComponent
  ]
})
export class ShareModule { }
