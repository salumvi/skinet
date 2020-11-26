import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Setting } from 'src/app/share/models/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Setting = {
    temaUrl: 'assets/themes/dist/united/bootstrap.min.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private doc) { 
    this.cargarAjustes();
  }



  cargarAjustes(){

    if(localStorage.getItem('ajustesApp')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustesApp'));
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string){
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = `assets/themes/dist/${tema}/bootstrap.min.css`;
    this.doc.getElementById('tema').setAttribute('href', this.ajustes.temaUrl);
    this.guardarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('ajustesApp', JSON.stringify(this.ajustes));
  }
}
