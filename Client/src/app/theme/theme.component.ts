import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../core/services/settings.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor(private setS: SettingsService) {
    this.setS.cargarAjustes();
   }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarcolor(event , tema: string, link){

    this.setS.aplicarTema(tema.toLocaleLowerCase());
    // en este caso el event.target y el link es lo mismo, da igual trabajar con uno que con otro
    // console.log(event.target);
    // console.log(link);

    const selectores: any = document.getElementsByClassName('dropdown-item');

    // eliminamos la clase
    for (const ref of selectores) {
      ref.classList.remove('active');
    }

    event.target.classList.add('active');
    // o tambien valdría esto:
    // link.classList.add('working')
  }

  colocarCheck(){
    const selectores: any = document.getElementsByClassName('dropdown-item');
    console.log(selectores);
    for (const ref of selectores) {
    
      if (ref.getAttribute('theme').toLowerCase() === this.setS.ajustes.tema ){
      ref.classList.add('active');
      break;
      }
    }
    
  }
}
