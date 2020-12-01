import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorsComponent } from './core/test-errors/test-errors.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'test-errors',
    component: TestErrorsComponent,
    data: { breadcrumb: 'Test Error' },
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data: { breadcrumb: 'Server Error' },
  },
  {
    path: 'theme',
    loadChildren: () =>
      import('./theme/theme.module').then((modulo) => modulo.ThemeModule),
    data: { breadcrumb: 'Theme' },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { breadcrumb: 'Not-found' },
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((modulo) => modulo.ShopModule),
    data: { breadcrumb: 'Shop' },
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((modulo) => modulo.BasketModule),
    data: { breadcrumb: 'Basket' },
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((modulo) => modulo.CheckoutModule),
    data: { breadcrumb: 'Checkout' },
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
