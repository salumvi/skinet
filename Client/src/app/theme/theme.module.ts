import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { ThemeRoutingModule } from './theme-routing.module';



@NgModule({
  declarations: [ThemeComponent],
  imports: [
    ThemeRoutingModule
  ]
})
export class ThemeModule { }
