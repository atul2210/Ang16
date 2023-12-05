import { Component, OnInit,Input, Inject,EventEmitter, Output } from '@angular/core';
import {tokenParams} from './token'
import {ShoppingApiService} from '../../service/shopping-api.service'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {authguard} from '../../service/auth-guard'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingIndicatorServiceService } from '../../service/loading-indicator-service.service';
import { itemService } from '../itemdetails/itemdetails.service';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  
  token:tokenParams=new tokenParams();
  details:any[];
  public redirectUrl: string;
  returnUrl:string;

  display='none'; //default Variable
  err:string;
  isOk=false;
  mobile:string="";
  loading:boolean=false;
  private accessToken = '';
  user: SocialUser;
  loggedIn: boolean;
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  type:string="password";
  
  constructor(  private route: ActivatedRoute,private loadingIndicatorService: LoadingIndicatorServiceService,
            private router: Router,private authguard:authguard,  private http:ShoppingApiService, private fb:FormBuilder,private location:Location,private itemService:itemService,
    private googleauthService: SocialAuthService, private httpClient: HttpClient) 
    
   {
    loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);
    
   


   }
   
  ngOnInit():void {
  this.loginForm=this.fb.group({

       // username:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
       username:['',[Validators.required]],
        password:['',[Validators.required]],
        rememberme:{value:true,disabled:false}, //default value
        mobileNumber:['na',[Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   
   /* Google id authentication temporarily disable
   
    this.googleauthService.authState.subscribe((user) => {
     this.user = user;
     this.loggedIn = (user != null);
     console.log("user", user);
     localStorage.setItem('id_token',user.idToken);
     this.http.userFullName(user.firstName);
     
   });
*/

 }

 
 GoogleLogin(): void {
// this.googleauthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID)
//     .then(accessToken => 
//       {
//         this.accessToken = accessToken
//         console.log("googleaccesstoken",this.accessToken)
//       }
      
//       );
  
    //this.googleauthService.signIn(GoogleLoginProvider.PROVIDER_ID)
   alert(11)

  
}

  onSubmit() 
  {
    let userid = this.loginForm.controls["username"].value;
    let password =  this.loginForm.controls["password"].value;
    this.http.Login(userid,password)

    .subscribe(data=>
          { 
          this.isOk=false;
          this.http.userFullName(data.fullname)
          this.err="";
        ////  this.location.back();
        let itemid:number= this.itemService.itemIdLogin;
          
        if(itemid!==0)
        {
          if(itemid===undefined)
          this.router.navigateByUrl(`HomeComponent`);
          else
         // this.router.navigateByUrl(`/itemDetail/${itemid}`);
         this.router.navigateByUrl('PlaceOrder/');
          this.http.dispSignInYes(true);
        }
        else
        {
         // this.router.navigateByUrl('')
         this.router.navigateByUrl("/PlaceOrder/");
         this.http.dispSignInYes(true);
        }
        this.http.dispSignInYes(true);
       // this.router.navigateByUrl("checkin")
  })
    err => 
    {
     
      this.isOk=true;
        localStorage.setItem("id_token",'');
      
        this.err=err.statusText; 
     

    }
   
    this.isOk=true;
    this.err="Invalid User Id or Password";
    // <-- go back to previous location
  
}

openModalDialog()
{
  this.display='block'; //Set block css
  this.loginForm.controls["mobileNumber"].patchValue('');
  this.isOk=false;
  return false;
}

closeModel()
{
  this.display='none';
  //this.mobile="";
  this.loginForm.controls["mobileNumber"].patchValue('na');

}
public forgetpassword()
{
 
  this.router.navigateByUrl('forgetpassword');
}
public changepassword()
{
 
  this.router.navigateByUrl('changepassword');
}
async closeModalDialog()
{
    let resp;
    this.loginForm.controls["username"].setValue('na@na.com');
    this.loginForm.controls["password"].setValue('nana');
    this.mobile= this.loginForm.controls["mobileNumber"].value;
    if(this.mobile.trim()!="")
    {
      let res = await this.http.getOTP(this.mobile)
          .then((res:Response)=>{                 
            resp = res;
           
              this.isOk=false;
              this.display='none'; //set none css after close dialog
              this.router.navigateByUrl("/registration/"+this.mobile);
           
          })
          .catch(err=>
          {
            
            this.isOk =true;
            this.err=err;
            //this.router.navigateByUrl("/Error/"+"err" +"/logi/"+this.mobile);
          
          });
    }
    
      return false;
    }

GoogleCalendarData(): void {
  if (!this.accessToken) return;

  this.httpClient
    .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    })
    .subscribe((events) => {
      alert('Look at your console');
      console.log('events', events);
    });
}

GooglerefreshToken(): void {
  this.googleauthService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
}

hideShowPress(){
  
  this.isText=!this.isText;
  this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
  this.isText?this.type="text" :this.type="password";
}


}

