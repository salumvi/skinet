import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { SearchHederComponent } from './components/search-heder/search-heder.component';



@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, SearchHederComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [
    PaginationModule,
    AlertModule,
    PagingHeaderComponent,
    PagerComponent,
    SearchHederComponent
  ]
})
export class ShareModule { }
