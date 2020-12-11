import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorsComponent } from './test-errors/test-errors.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorsComponent,
    ServerErrorComponent,
    NotFoundComponent,
    SectionHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BreadcrumbModule,
    ShareModule
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent
  ],
})
export class CoreModule {}
