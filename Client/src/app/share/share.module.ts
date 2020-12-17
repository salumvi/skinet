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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextImputComponent } from './components/text-imput/text-imput.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, SearchHederComponent, OrderTotalComponent, TextImputComponent, StepperComponent, BasketSummaryComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    AlertModule,
    PagingHeaderComponent,
    PagerComponent,
    SearchHederComponent,
    CarouselModule,
    OrderTotalComponent,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextImputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent
  ]
})
export class ShareModule { }
