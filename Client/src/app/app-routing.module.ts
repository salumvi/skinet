import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { TestErrorsComponent } from './core/test-errors/test-errors.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';


const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'test-errors', component: TestErrorsComponent },
   { path: 'server-error', component: ServerErrorComponent },
   { path: 'not-found', component: NotFoundComponent },
   {path:  'shop', loadChildren: () => import('./shop/shop.module').then(modulo => modulo.ShopModule)},
   {path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
