import {HttpRequest,HttpHandler,HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Injectable,Inject} from '@angular/core';
import {ShoppingApiService} from './shopping-api.service';
import { Observable } from 'rxjs';

import { DOCUMENT } from '@angular/common';
@Injectable()
export class serviceintercepter implements HttpInterceptor
{
    constructor(public http:ShoppingApiService)
    {

    }
    intercept(request:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>
    {
       const idToken= localStorage.getItem("id_token");
      
       if(idToken){ 
       const clone = request.clone({
           
        headers:request.headers.set("Authorization","Bearer "+ idToken)
            });
           
            return next.handle(clone);
        }
        else {
            
            return next.handle(request);
        }
       

    }

}
