import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorsInterceptorService implements HttpInterceptor {
  constructor(private ruta: Router, private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error) {
          switch (error.status) {
            case 400:
              if(error.error.errors){
                throw error.error;
              }
              else{
                this.toastr.error(error.error.menssage, error.error.statusCode);
              }
              break;
            case 401:
              this.toastr.error(error.error.menssage, error.error.statusCode);
              break;
            case 404:
              this.ruta.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};

              this.ruta.navigateByUrl('server-error' , navigationExtras);
              break;

            default:
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
