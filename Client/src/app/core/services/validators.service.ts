import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { scheduled, timer, Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/operators';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor(private accS: AccountService) {}

  patternPass(formControl: FormControl) {
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
    if (!regExp.test(formControl.value)) {
      return {
        patternEmail: { message: 'no válido' },
      };
    }
    return null;
  }

  patternEmail(formControl: FormControl) {
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regExp.test(formControl.value)) {
      return {
        patternEmail: { message: 'no válido' },
      };
    }
    return null;
  }

  requiredPersonal(formControl: FormControl) {
    if (!formControl.value) {
      return {
        requiredPersonal: { message: 'es un campo obligatorio' },
      };
    }
    return null;
  }

  exitsEmail() {

    // const promesa = new Promise((resolve, rejets) => {
    //   setTimeout(() => {
    //     if (formControl.value === 'juan@email.com'){
    //       console.log('object');
    //       resolve({exitsEmail: {message: 'el email está en uso'}});
    //     }else{
    //       resolve(null);
    //     }
    //   }, 3000);
    // });
    // return promesa;

   
      return (formControl: FormControl) => {
        return timer(500).pipe(
          switchMap(() => {
            if(!formControl.value){
              return of(null);
            }
            return this.accS.chekEmailExist(formControl.value).pipe(
              map(res => {
                return res ? {emailExist: {message: 'El email ya exite'}} : null;
              })
            );
          })
        );
      }

  }

 // retorna una funcion que valida que los password son iguales
 passWordIguales(pass1: string, pass2: string) {
  return (formGroup: FormGroup) => {

    const pass1Control = formGroup.controls[pass1];
    const pass2Control = formGroup.controls[pass2];

    if (pass1Control.value === pass2Control.value) {
      // pass2Control.setErrors(null);
    } else {
      // esto se cepilla los errores que hay y pone solo ese
       pass2Control.setErrors({ password2: { message: 'Las contraseñas deben ser iguales' } });
    }

  }





}
}
