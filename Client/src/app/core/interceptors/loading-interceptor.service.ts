import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private busS: BusyService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(req.method === 'POST' && req.url.includes('orders')){
      return next.handle(req);
    }
    if(req.method === 'DELETE'){
      return next.handle(req);
    }
    if(req.url.includes('emailexist')){
      return next.handle(req);
    }
    this.busS.busy();
    return next.handle(req).pipe(
      delay(300),
      finalize(() => {
        this.busS.idle();
      })
    );
  }
}
