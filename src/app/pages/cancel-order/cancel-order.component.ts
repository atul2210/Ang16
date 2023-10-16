import { Component, OnInit, ViewChild,Inject,Injectable } from '@angular/core';
import {ShoppingApiService} from '../../service/shopping-api.service'

import { itemNotify } from '../itemdetails/item-notify';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {LoadingIndicatorServiceService} from '../../service/loading-indicator-service.service'

import { Location } from '@angular/common';
//import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styles: [
    `
      @media screen and (max-width: 800px) {
        .desktop-hidden {
          display: initial;
        }
        .mobile-hidden {
          display: none;
        }
      }
      @media screen and (min-width: 800px) {
        .desktop-hidden {
          display: none;
        }
        .mobile-hidden {
          display: initial;
        }
      }
    `
  ]
})
export class CancelOrderComponent implements OnInit {

  cartItems:any;
  loading:boolean=false;
  @ViewChild('myTable',{static:false}) table: any;

  rows: any;
  expanded: any = {};
  timeout: any;
  OfferPriceSum:number=0;
  saveSum:number=0;



  constructor(private ShoppingApiService:ShoppingApiService,private itemnotify:itemNotify,
  private route:Router,private loadingIndicatorService: LoadingIndicatorServiceService,private location: Location ) { 

  }

  ngOnInit() {
    this.GetMyOrders();
  }
  async GetMyOrders()
  {
    let userId:string=localStorage.getItem("email");;  
    let active:boolean = true; 
    
    if(userId!==null)
    {
     
      await this.ShoppingApiService.GetMyOrders(userId,active)
        .subscribe(
          (data) => { 
      
          this.rows = data; //this.cartItems;
          console.log('cancelOrder',this.rows);
          return this.rows;
          });
    }
  }

  RemoveItems(itemid,quantity,rowid)
  {
    
  }
  onPage(event:Event)
  {
    
  }
}
