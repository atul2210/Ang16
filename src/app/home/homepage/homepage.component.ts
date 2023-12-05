import { Component, OnInit,EventEmitter,OnDestroy, Inject, Input, Output } from '@angular/core';
import {Globals} from '../../model/global';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { CartItemServiceService } from '../../service/cart-item-service.service';
import { Inotify,itemNotify } from '../../pages/itemdetails/item-notify';
//import { SubscriptionLike as ISubscription } from "rxjs";
import { Subscription } from "rxjs";

import {SearchResultComponent} from '../../../app/pages/search-result/search-result.component'
import {LoadingIndicatorServiceService} from '../../service/loading-indicator-service.service';
import {MenuServiceService} from '../../service/menu/menu-service.service';
import { Router } from '@angular/router';
import { checkedInItemsArray } from '../../model/checkedInItems';
import { NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';


@Component({
  selector: 'app-root',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  host: {ngSkipHydration: 'true'}
})
export class HomepageComponent implements OnInit,OnDestroy {
  itemname:string;
  menuitems:string[];
  loading:boolean=false;
 
 //keep refs to subscriptions to be able to unsubscribe later
 private popupOpenSubscription!: Subscription;
 private popupCloseSubscription!: Subscription;
 private initializingSubscription!: Subscription;
 private initializedSubscription!: Subscription;
 private initializationErrorSubscription!: Subscription;
 private statusChangeSubscription!: Subscription;
 private revokeChoiceSubscription!: Subscription;
 private noCookieLawSubscription!: Subscription;



  constructor( private ccService: NgcCookieConsentService,private router:Router, private search : SearchResultComponent,private globals: Globals,private ShoppingApiService:ShoppingApiService,
  private CartItemServiceService:CartItemServiceService,public totalItem:itemNotify,private loadingIndicatorService: LoadingIndicatorServiceService,private service:MenuServiceService ) 
  
  { 
    this.getcheck();
   
  }
  private subscription: Subscription;
  private fullNameSubcription: Subscription;
  private subs: Subscription;
  disp: boolean=false;;
  itemReceivedAddToCard :any[];
  count:number;
  fullName:string;
  cartItems:any;
  cookieMessage:string ="We use Cookies. ";
  cookieDismiss:any="Please accept cookies"
  cookieLinkText:string ="Cookies Link Text";
 // @Input() menuItemid:number;
 menuItemid:number;
  ngOnInit(): void 
  {
    this.loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);

    this.ShoppingApiService.dispSignInNo()
    .subscribe(data=>{
      this.disp=data;
    }); 
   this.subscription= this.ShoppingApiService.getItem()
    .subscribe( 
        ttlItems=>
        {
         this.totalItem = ttlItems; 
        
        });

        if(localStorage.getItem("fullName")===null)
        {

        this.fullNameSubcription = this.ShoppingApiService.getUserFullName()
          .subscribe(fullname=>
          {
            this.fullName =fullname;
            localStorage.setItem("fullName",this.fullName)
          }
        )
        }
        else {
          this.fullName= localStorage.getItem("fullName");
        }

    //  //Accept cookies

    //  let cc = window as any;
    //    cc.cookieconsent.initialise({
    //      palette: {
    //        popup: {
    //          background: "#164969"
    //        },
    //        button: {
    //          background: "#ffe000",
    //          text: "#164969"
    //        }
    //      },
    //      theme: "classic",
    //      content: {
    //        message: this.cookieMessage,
    //        dismiss: this.cookieDismiss,
    //        link: this.cookieLinkText,
    //       // href: environment.Frontend + "/dataprivacy" 
    //      }
    //    });

 // subscribe to cookieconsent observables to react to main events
 this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
  () => {
    // you can use this.ccService.getConfig() to do stuff...
  });

this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
  () => {
    // you can use this.ccService.getConfig() to do stuff...
  });

this.initializingSubscription = this.ccService.initializing$.subscribe(
  (event: NgcInitializingEvent) => {
    // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
    console.log(`initializing: ${JSON.stringify(event)}`);
  });

this.initializedSubscription = this.ccService.initialized$.subscribe(
  () => {
    // the cookieconsent has been successfully initialized.
    // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
    console.log(`initialized: ${JSON.stringify(event)}`);
  });

this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
  (event: NgcInitializationErrorEvent) => {
    // the cookieconsent has failed to initialize... 
    console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
  });

this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
  (event: NgcStatusChangeEvent) => {
    // you can use this.ccService.getConfig() to do stuff...
  });

this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
  () => {
    // you can use this.ccService.getConfig() to do stuff...
  });

  this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
  (event: NgcNoCookieLawEvent) => {
    // you can use this.ccService.getConfig() to do stuff...
  });




  }
ngOnDestroy()
{
  this.subscription.unsubscribe();
  this.subs.unsubscribe();

  // unsubscribe to cookieconsent observables to prevent memory leaks
  this.popupOpenSubscription.unsubscribe();
  this.popupCloseSubscription.unsubscribe();
  this.initializingSubscription.unsubscribe();
  this.initializedSubscription.unsubscribe();
  this.initializationErrorSubscription.unsubscribe();
  this.statusChangeSubscription.unsubscribe();
  this.revokeChoiceSubscription.unsubscribe();
  this.noCookieLawSubscription.unsubscribe();

}




  public getCheckedInItems():any
  {
    
    this.router.navigateByUrl('/checkin');
  this.getcheck();

  }

  public getcheck()
  {
      
    let userSessionid:string;  
    userSessionid = localStorage.getItem("userSession");
    if(userSessionid!==null){
    this.ShoppingApiService.getCheckedInItem(userSessionid)
    .subscribe(
  
        (data:checkedInItemsArray) => { 
       this.cartItems= data.body;
       this.totalItem.totalCartItem = data.body.length;
        return this.cartItems;
      });
    }

  }

  searchResult()
  {
  
    this.router.navigateByUrl('/TempRouteSearch/'+this.itemname+'/search');
  }
  RedirectToLogin()
  {
    this.router.navigateByUrl('/login')

  }
 
}
