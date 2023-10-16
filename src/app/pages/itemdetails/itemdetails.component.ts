import { Component, OnInit,Input,Output,EventEmitter, ɵConsole, Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShoppingApiService} from '../../service/shopping-api.service';
import {HomepageComponent} from '../../home/homepage/homepage.component';
import {Globals} from '../../model/global';
////import { ColdObservable } from 'rxjs/testing/ColdObservable';
import {Iitems} from '../../pages/iitems';
import { Router } from '@angular/router';
import { CartItemServiceService } from '../../service/cart-item-service.service';
import { itemNotify, Inotify } from './item-notify';
import { HttpRequest, HttpHeaders } from '@angular/common/http'; 
import {itemService} from '../../pages/itemdetails/itemdetails.service';
import { LoadingIndicatorServiceService } from '../../service/loading-indicator-service.service';


import {ReactiveFormsModule,FormsModule,NgControl,  FormGroup,FormControl,ValidationErrors,Validator, Validators} from '@angular/forms'
import { min } from 'rxjs/operators';
import {addToCart} from '../../model/AddToCart';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
 
})
export class ItemdetailsComponent implements OnInit {
addedItemCount:number=0;  
//itemDetail:any[];

image1:any;
colorDetail:any[]=[];
color:string="";
quantity:number=1;
itemid:string="";
colorname: string="";
showSelected: boolean=false;
price:number=0;
offerprice:number=0;
deliverycharges:number=0;
img1:any;
coloId:number=0;
sizeName:string;
category:string;
brand:string;
availableQty:number=0;
breakpoint: number=0;
displayError:boolean=false;
loading:boolean=false;
myform: FormGroup;
sizes: FormControl;
selecteditemId:any;
minQty:number=1;
maxQty:number=0;
disableplus:boolean=false;
disableminus:boolean=true;
availableSizes:any[]=[];
totalPaidAmount:number=1;
sizeId=0;
sizeIdParam:number=0;
itemDesdription:string="";
imageurl:string="";
imageIndex:number=0;
  constructor( public restProvider:ShoppingApiService,public HomepageComponent:HomepageComponent,private route:ActivatedRoute, private globals:Globals,
    private router:Router, private CartItemServiceService:CartItemServiceService,private inotify:itemNotify,private loadingIndicatorService: LoadingIndicatorServiceService,private itemService:itemService

    
    
    ){
      loadingIndicatorService
      .onLoadingChanged
      .subscribe(isLoading => this.loading = isLoading);

    //////  this.itemService= new itemService();


  }
  itemsdet:any[]=[]; 
  
  public ngOnInit()
  {
    //const img1 = require('./assets/thumbnail.jpg');
    //const img2 = require('./assets/thumbnail2.jpg');
    
    //$('#74').ezPlus();
   
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.sizes= new  FormControl('',Validators.required);
    
    this.myform = new FormGroup({
    
      sizes:this.sizes,
    });


    
    this.itemid = this.route.snapshot.params["itemid"];
    this.sizeIdParam = this.route.snapshot.params["sizeId"];
    this.selecteditemId=this.itemid;
    this.GetItemDetails(this.itemid);
  }



GetItemDetails(itemId:string)
{

  
  this.itemid=itemId;
 
  this.restProvider.itemDetails(itemId,this.sizeIdParam)
  .subscribe(
    data => {
      debugger;
      this.itemsdet= Array.of(data.body)
     
      if(data.body.itemDetail.itemLists[0].availableQty>0) 
      {
        
        // data.body.image1= data.body.image1;
          this.availableSizes = this.itemsdet[0].availableSize; 
          this.itemsdet= Array.of(data.body)
          console.log("dddds",this.availableSizes);
        // //   ///this.colorDetail =data.body.availableColor.split(";")
        // //  // this.colorname=this.colorDetail[0]
          this.colorname=data.body.itemDetail.itemLists[0].colorName;
          this.price = data.body.itemDetail.itemLists[0].price
          this.offerprice =data.body.itemDetail.itemLists[0].offerPrice
          this.deliverycharges = data.body.itemDetail.itemLists[0].deliveryCharges
          this.coloId =data.body.itemDetail.itemLists[0].colorId
          this.sizeName =data.body.itemDetail.itemLists[0].sizeName
        //  this.sizeId=data.body.itemDetail.itemLists[0].sizeId
          this.category = data.body.itemDetail.itemLists[0].categoryName
          this.brand = data.body.itemDetail.itemLists[0].brand
          this.availableQty =data.body.itemDetail.itemLists[0].availableQty
          this.displayError=false;
          this.maxQty=data.body.itemDetail.itemLists[0].availableQty;
          this.totalPaidAmount=this.offerprice;
          this.imageurl=data.body.itemDetail.itemLists[0].images[0];
          this.itemDesdription=data.body.itemDetail.itemDescripton;
      }
    else  
    {
      this.displayError=true;
    }
  }
  
)



}



  overTitle(){
    if(this.showSelected == true){ ;
      this.showSelected = false;
    }
    else {
      this.showSelected = true; 
    }
  }

  
  addToCart(){
     
    let email=localStorage.getItem("email");
      if(email!==null || email!.trim()!=="")
      {
            let data = new addToCart();
            data.colorId= this.coloId;
            data.email=email;
            data.quantity=this.minQty;
            data.itemid=parseInt(this.itemid);
            data.sizeId=this.sizeIdParam;
            this.restProvider.addToCart(data)
            .subscribe(data =>   { 
              
                this.inotify.totalCartItem = data.count; 
                this.notifyTotalItem(this.inotify);
                this.itemService.itemid=Number(this.itemid);
                this.itemService.itemIdLogin=Number(this.itemid);
                this.router.navigateByUrl('/checkin');
              },
              err=>
              {
                this.router.navigateByUrl('/login');
              } );
              this.itemService.itemid=Number(this.itemid);
              this.itemService.itemIdLogin=Number(this.itemid);
      }
      else  this.router.navigateByUrl('/login');
}

    private getColor(colorName:string)
    {
      this.colorname=colorName;
    }

private notifyTotalItem(totalItem:Inotify)
{ 
  this.restProvider.changeSelectedItem(totalItem);
}

onResize(event:any) {
  this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
}

salequantityplus()
{

  this.minQty++;  
  this.disableminus=false;
  this.totalPaidAmount=this.offerprice*this.minQty;
 
  if(this.minQty==this.maxQty)
    {
      this.disableplus=true;
      
    }
    

}
salequantitminus()
{
  this.minQty--; 
  this.disableplus=false; 
  this.totalPaidAmount=this.offerprice*this.minQty;
  if(this.minQty==1)
    {
       
        this.disableminus=true;
    }
    

}


// get ItemidWithoutLogin():number 
// {

// }

// set ItemidWithoutLogin(value:number)
// {
//   this.itemService.itemid=Number(this.itemid);
//   alert(`call from Setter: ${this.itemid}` );
// }
imgout:string="";
 hoverSmallImage(img:string)
{
  
  this.imgout= img; //this.itemDetail[0].image1
  //this.itemDetail.itemLists[0].images[0]=img;
 
}

 outSmallImage()
{
 
  this.itemsdet[0].image1=this.imgout;
 

}

GetDetailsOnSizeChange(sizeid:number)
{
 
  this.sizeIdParam=sizeid;
 this.GetItemDetails(this.itemid);
}

ChangeImage(indx:number)
{
  this.imageIndex=indx;
   
}

}
