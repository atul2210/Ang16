
import {shareReplay, tap,  catchError,retry } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpResponse,HttpParams } from '@angular/common/http';

//import 'rxjs/Rx';
import { Observable,throwError } from 'rxjs';
import {allItems} from '../model/allitems'
////import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import {tokenParams} from '../pages/login/token'
import { BehaviorSubject, Subject } from 'rxjs';
import {responseData,Ipagedata} from '../model/pagedata';
import {registration,EditAddress} from '../model/registration'
import { Inotify,itemNotify } from '../pages/itemdetails/item-notify';
import * as moment from "moment";
import {checkedInItems,checkedInItemsArray} from '../model/checkedInItems';
import { rsetpassword } from '../model/resetpassword';
import { environment } from '../../environments/environment';
import { NotifyUserfullName } from '../pages/login/Notify-UserName';

import { addToCart } from '../model/AddToCart';



@Injectable()
export class ShoppingApiService 
{
uri:string;
baseUrl = environment.baseUrl;
public addToCardResponse :any[];
private loggedIn = false;
private json: any;


private subject = new Subject<itemNotify|null>()

private userFullNamesubject = new Subject<string|null>()
private displaySignInSubject = new Subject<boolean|true>();
private PassMenuidSubject = new Subject<number>();

  constructor( private http: HttpClient,private responseData:responseData)
  { 

  }
  public redirectUrl: string;
  AllItems(category:string,index:string): Observable<any> 
  {
    
    this.uri=this.baseUrl+"/api/items/";
    const params = new HttpParams().set('categoryId', category).set("pageIndex",index);
     return this.http.get(
     this.uri+"AllItems/", { observe: 'response', params}).pipe(
     
   ///  catchError(this.handleError )
   );
 
     
  }


  itemDetails(itemId:string,sizeId): Observable<any> 
  {
    this.uri=this.baseUrl+"/api/sale/ItemsDetails";
   
    const params = new HttpParams().set('itemId', itemId)
    .set('sizeId', sizeId);
     return this.http.get(
     this.uri, { observe: 'response', params}).pipe(
    
    );
  }


addToCart(add:addToCart  ): Observable<any>
{
  this.baseUrl="";
  this.baseUrl = environment.baseUrl;
  this.uri=this.baseUrl+"/api/sale/AddToCart";
  return this.http.post(this.uri,add,{ observe: 'response'}).pipe();

}

getCheckedInItem(sessionId:string):Observable<any>
{
  let querystring:string;
   
  this.uri=this.baseUrl+"/api/sale/";
 
  const params = new HttpParams().set('userSession', sessionId);
  return this.http.get<checkedInItemsArray[]>(
  this.uri+"getcheckedinItem", { observe: 'response', params}).pipe(
 
 
  );

  

}

public RemoveItem(id:number,itemid:string,quantity:string,ColorId:string,SizeId:string,sessionId:string):Observable<checkedInItemsArray>
{
  let querystring:string; 
 alert('gggg '+SizeId)
  querystring = "?CartId="+id+"&itemId=" + itemid+ "&returnedItemQty="+quantity  +"&ColorId=" + ColorId + "&SizeId=" + SizeId +"&userId="+sessionId;
  
  this.uri=this.baseUrl+"/api/Sale/RemoveItems"+querystring;
  console.log('oops',this.uri);
  return this.http.get<checkedInItemsArray>(this.uri);

 
}




public Login(userId:string,password:string):Observable<any>
{
  localStorage.removeItem('id_token');
  localStorage.removeItem("expires_at"); 
  localStorage.removeItem("email");
  localStorage.removeItem("fullName");
  let encodedval = btoa(userId+":"+password);
  this.uri=this.baseUrl+"/api/token/";
  let headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('authorization', encodedval);
  
   return this.http.get(this.uri,{headers:headers}).pipe(
   tap((res) =>{
    localStorage.setItem("email",userId);
    this.setSession(res); 
   }), 
   shareReplay(),

   );


};


private setSession(authResult) {

 
  localStorage.setItem('id_token', authResult.authToken);

  localStorage.setItem("expires_at",authResult.expiration); 
 
}      

logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("fullName");
  localStorage.removeItem("email");
  
}

public isLoggedIn() {
  return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
  return !this.isLoggedIn();
}

getExpiration() {
  const expiration = localStorage.getItem("expires_at");
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}   



public GetHomePageItems(pagesize:string,pageindex:string):Observable<any>
{
 
     let querystring:string;
     this.uri=this.baseUrl+"/api/items/"; 
     querystring = "?pageindex="+pageindex+ "&pagesize="+ pagesize  ;

     return this.http.get<Ipagedata>(
     this.uri+"AllItemsOnPaging/"+querystring, { observe: 'response'}).pipe(
   
     );
}

     public addUser(user:registration):Observable<any>
     {
      localStorage.removeItem('id_token');
      localStorage.removeItem("expires_at"); 
      localStorage.removeItem("email");
      localStorage.removeItem("fullName");
      this.uri=this.baseUrl+"/api/user/NewUser/";
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/form-data');
      return this.http.post<registration>(this.uri,
          {
            "emailId": user.myemail,
            "password": user.password,
            "firstName": user.firstName,
            "middleName": user.middleName,
            "lastName": user.lastName,
            "mobile": user.mobile,
            "ulternateMobile": user.ulternateMobile,
            "address":user.address,
            "city":user.city,
            "state":user.mystate,
            "pin":user.pin,
            "enterOPT":user.otp
           

          },
          {
              headers:headers
          }

      ).pipe(
      catchError(this.handError),
      tap((res) =>
      {
       
        localStorage.setItem("email",user.myemail);
      }),);


     }
     

private handError(errorResponse:HttpErrorResponse)
{
  if(errorResponse.error instanceof ErrorEvent)
  {
    console.log("client side error",errorResponse.error.message);
  }
  else
  {
    console.log("server side error",errorResponse);
  }
  return throwError(errorResponse);
}

public changeSelectedItem(totalItem:itemNotify|null)
{
  this.subject.next(totalItem);
}
getItem():Observable<any>
{
  return this.subject.asObservable();

}

public userFullName(fullName:string|null)
{
 
  return this.userFullNamesubject.next(fullName);

}
getUserFullName():Observable<any>
{
  return this.userFullNamesubject.asObservable();

}


public async getOTP(mobile:string) :Promise<any>
{
  
  this.uri=this.baseUrl+"/api/sms/Otpsender?mobileNumber="+mobile;
   return await this.http.get<Promise<optResponse>>(this.uri, { observe: 'response'}).pipe(
   tap((res) =>{
   
   }), 
  // .shareReplay()
  // catchError(this.handleError )
   //,
   )
   .toPromise()
};



public async ResetPassword(email:string):Promise<any>
{
  
  this.uri=this.baseUrl+"/api/sms/ResetPassword?email="+email;
   return await this.http.get<Promise<rsetpassword>>(this.uri, { observe: 'response'}).pipe(
   tap((res) =>{
   // this.setOTP(res)
   }), 
  // .shareReplay() //test
   //catchError(this.handleError ),
   )
   .toPromise()
};

 
  
  public paymentreceive(session:string,registration:registration,paymentOption:number)
  {
    
      this.uri=this.baseUrl+"/api/items/CheckoutPaymentReceived?UserSession="+session+"&PaymentOption="+paymentOption.toString();
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/form-data');
      return this.http.post(this.uri,registration,
          {
              headers:headers
          });
        

  }


  public SaveEditedAddress(edit:EditAddress)
  {
    
      this.uri=this.baseUrl+"/api/items/EditAddress";
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/form-data');
       return this.http.put(this.uri,edit,
          {
              headers:headers
          });
        

  }


public  changepassword(email:string,password:string,confirmpassword:string,oldPassword:string):Observable<any>
{
  this.uri=this.baseUrl+"/api/sms/ChangePassword?email="+email+"&password="+password+"&confirmpassword="+confirmpassword+"&OldPassword="+oldPassword;
  return  this.http.get(this.uri, { observe: 'response'}).pipe(
 // catchError(this.handleError )
  );

}
public getimages()
{
  this.uri=this.baseUrl+"/api/File/images";
  return  this.http.get(this.uri, { observe: 'response'}).pipe(
 
 // catchError(this.handleError)
  );

}


GetAddress(sessionId:string):Observable<any>
{
  
  this.uri=this.baseUrl+"/api/User/";

  const params = new HttpParams().set('email', sessionId);
  return this.http.get<checkedInItemsArray[]>(
  this.uri+"Address", { observe: 'response', params}).pipe(
 
  );
}


GetStates():Observable<any>
{
  
  this.uri=this.baseUrl+"/api/User/";

  return this.http.get(
  this.uri+"GetStates", { observe: 'response'}).pipe(
 
  );
}

GetCities(StateId:string):Observable<any>
{
  
  this.uri=this.baseUrl+"/api/User/";

  return this.http.get(
  this.uri+"GetCities?StateId="+StateId, { observe: 'response'}).pipe(

  );
}



ActivateUserAccount(email:string,active:boolean):Observable<any>
{
 
  this.uri=this.baseUrl+"/api/User/";
  this.uri=this.baseUrl+"/api/User/ActivateUser?Activate="+active +"&email="+email;
 
  return this.http.get(
    this.uri).pipe(
  )
   
  
}

public dispSignInYes(display:boolean)
{
  return this.displaySignInSubject.next(display);
}
public dispSignInNo()
{
  return this.displaySignInSubject.asObservable();
}

public  GetPaymentOptions():Observable<any> 
{
 
  this.uri=this.baseUrl+"/api/items/PaymenOptions"
   return this.http.get(this.uri, { observe: 'response'}).pipe()
  
   
};



GetMyOrders(UsserId:string,active:boolean):Observable<any>
{
  let querystring:string;
  
  
  this.uri=this.baseUrl+"/api/item/";
 
  const params = new HttpParams().set('UserId', UsserId).set('Active',active.toString());
  return this.http.get<any>(
  this.uri+"GetAllISoldtems", { observe: 'response', params}).pipe(
  
  

  );

  

}

public MenuId(id:number)
{
 
  return this.PassMenuidSubject.next(id);

}
public getMenuId():Observable<any>
{
  return this.PassMenuidSubject.asObservable();

}
public UpdateCart(itemid,AddedReducedquantity,sizeId,colorId,isadded:boolean,isdeleted:boolean):Observable<any>{
  this.uri=this.baseUrl+"/sale/";
 
  const params = new HttpParams().set('itemid', itemid.toString()).set('quantity',AddedReducedquantity.toString())
                                .set("sizeId",sizeId.toString()).set("colorId",colorId.toString()).set("Email",localStorage.getItem("email"))
                                .set("isadded",isadded.toString()).set("isDeleated",isdeleted.toString());
  
  let httpOptions = {
    params: params
  };

  
  return this.http.post(
  this.uri+"UpdateCart",  null, httpOptions).pipe(
  
  

  );
}

}


export class optResponse
{
 constructor() {}


  status:string;
  message:string;
}




