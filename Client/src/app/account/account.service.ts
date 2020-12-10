import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { of, ReplaySubject } from 'rxjs';
import { IUser, IUserRegister } from '../share/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private ruta: Router) {}

  // getCurrenUserValue(){
  //   return this.currentUserSource. value;
  // }

  loadCurrentUser(token: string) {
    if (!token) {
      this.currentUserSource.next(null);
      return of(null);
   
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('AppToken', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('AppToken', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(userRegister: IUserRegister) {
    return this.http.post(this.baseUrl + 'account/register', userRegister).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('AppToken', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('AppToken');
    this.currentUserSource.next(null);
    this.ruta.navigateByUrl('/');
  }

  chekEmailExist(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
}
