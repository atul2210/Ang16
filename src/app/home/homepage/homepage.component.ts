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
 
  constructor( private router:Router, private search : SearchResultComponent,private globals: Globals,private ShoppingApiService:ShoppingApiService,
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

     
  }
ngOnDestroy()
{
  this.subscription.unsubscribe();
  this.subs.unsubscribe();
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
