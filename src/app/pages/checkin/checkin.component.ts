import { Component, OnInit,Inject,Injectable, ViewChild, ViewChildren,ViewEncapsulation,ElementRef  } from '@angular/core';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { itemNotify } from '../itemdetails/item-notify';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {LoadingIndicatorServiceService} from '../../service/loading-indicator-service.service'
import {checkedInItems,checkedInItemsArray} from '../../model/checkedInItems';
import { Location } from '@angular/common';




@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
 

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
@Injectable()
export class CheckinComponent implements OnInit {
  cartItems:any;
 
  @ViewChild('myTable',{static:false}) table: any;

  rows: any;
  expanded: any = {};
  timeout: any;
  OfferPriceSum:number=0;
  saveSum:number=0;
  minQty:number =1;
  maxQty:number=0;
  disableplus:boolean=true;
  disableminus:boolean=false;
  totalPaidAmount:number=1;
  rowCounter:any[]=[];
  AddedRedicedQuantity:number=1;
  public loading: boolean = false;
  rowLoaderIndicator:boolean[]=[];
  enablePlus:boolean[]=[];
  enableMinus:boolean[]=[];
  isCartEmpty:boolean=false;
  @ViewChildren("myQty") myQty: ElementRef;


  constructor(private ShoppingApiService:ShoppingApiService,private itemnotify:itemNotify,
  private route:Router,private loadingIndicatorService: LoadingIndicatorServiceService,private location: Location ) { 

    loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);
   

  }

  ngOnInit() {
    this.GetCheckedInItems();
    
   
  } 

async GetCheckedInItems()
{
  let userSessionid:string;  
  userSessionid = localStorage.getItem("email"); 
  
  if(userSessionid!==null)
  {
   
    await this.ShoppingApiService.getCheckedInItem(userSessionid)
      .subscribe((data:checkedInItemsArray) => { 
       this.rows = data.body; 
      
       if(this.rows.length>0)
       {
        this.isCartEmpty=false;
        for(let i=0;i<this.rows.length;i++)
        {
          this.rowCounter.push(this.rows[i].quantity)
          this.rowLoaderIndicator.push(false);
          if(this.rows[i].quantity===1)
          
            this.enableMinus.push(true);
          else 
            this.enableMinus.push(false);
          this.enablePlus.push(false);
        }
      }
      else{
        this.isCartEmpty=true;
      }
     
       this.itemnotify.totalCartItem = this.rows.length;
       this.getSum(this.rows);
      
       return this.rows;
      });
  }
}

public getSum(sum:any[]) {
  this.OfferPriceSum=0;
  this.saveSum=0;
  for(var i = 0; i < sum.length; i++){
    this.OfferPriceSum =this.OfferPriceSum+this.OfferPriceSum+sum[i].offerprice;
    this.saveSum = this.saveSum + ((sum[i].price) - (sum[i].offerprice))*sum[i].quantity;
   
  }
  
}

public myFunction(item) {
document.getElementById("demo").innerHTML = this.rows.reduce(this.getSum);
}
 public RemoveItems(id:number,itemid:string,quantity:string,ColorId:string,SizeId:string)
  {
   
    const email=localStorage.getItem("email");;
      
    if(email)
    { 

          this.ShoppingApiService.RemoveItem(id,itemid,quantity,ColorId,SizeId,email)
          .subscribe((res)=>
          {
            
            this.GetCheckedInItems();
            
      });
      this.ShoppingApiService.changeSelectedItem(this.itemnotify);
    }
    else this.route.navigateByUrl('/login');
      
      

  }

private notify():void
{
  this.ShoppingApiService.changeSelectedItem(this.itemnotify)
  

}


placeOrder()
{
    this.route.navigateByUrl('checkin/pmt');
}

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
     // console.log('paged!', event);
    }, 100);
  }
fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
   
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

salequantityplus(qindex:number)
{
   
  
  
 
  // if( this.rows[qindex].quantity==this.rowCounter[qindex])
  // {
    
  //   this.disableplus=true;
  //   this.disableminus=false;
  //   return; 
  // }


 
  this.rows[qindex].quantity++;
  this.rows[qindex].ttlAmount  = this.rows[qindex].quantity* this.rows[qindex].offerPrice
   this.enableMinus[qindex]=false;
  this.updatecart(qindex,true,false);
}
salequantitminus(minus:number)
{
    
    this.rows[minus].quantity=this.rows[minus].quantity-1;
    this.rows[minus].ttlAmount  = this.rows[minus].quantity* this.rows[minus].offerPrice
   
    if(this.rows[minus].quantity===1)
    this.enableMinus[minus]=true;

    this.updatecart(minus,false,false);
}

  async updatecart (rowId:number,isadded:boolean,isdeleted:boolean)
  {
    
    this.rowLoaderIndicator[rowId] = true;
   
    this.ShoppingApiService.UpdateCart(this.rows[rowId].itemid,this.AddedRedicedQuantity,this.rows[rowId].sizeId,this.rows[rowId].colorId,isadded,isdeleted)
    .subscribe((res)=>
    {
      
    });
    this.rowLoaderIndicator[rowId] = false;
    if(isdeleted)
    {
      this.GetCheckedInItems();
    }
  }



}






