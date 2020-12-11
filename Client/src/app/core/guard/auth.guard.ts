import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private accS: AccountService, private ruta: Router){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accS.currentUser$.pipe(
      map(auth => {
        if(auth){
          return true;
        }
        this.ruta.navigate(['account/login'], {queryParams:{url: state.url}});
      })
    );
  }

}
