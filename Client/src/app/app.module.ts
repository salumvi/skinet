import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { ErrorsInterceptorService } from './core/interceptors/errors-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptorService } from './core/interceptors/loading-interceptor.service';
import { JwtInterceptor } from './core/interceptors/jwt-interceptor';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    NgxSpinnerModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
