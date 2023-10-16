import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShoppingApiService} from '../../service/shopping-api.service';
import { Router } from '@angular/router';
import {SingletonService} from '../../service/singleton.service';
import {ReactiveFormsModule,FormsModule,NgControl,  FormGroup,FormControl,ValidationErrors,Validator, Validators} from '@angular/forms';
import {registration,EditAddress} from '../../model/registration';

import { Subscription } from "rxjs";
import { Inotify,itemNotify } from '../../pages/itemdetails/item-notify';

import {PaymentOptionService} from '../../service/Payment-Options-Service';




@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  PlaceOrderForm: FormGroup;
  username:FormControl;
  userMiddleName:FormControl;
  userLastName:FormControl;
  address:FormControl;
  city:FormControl;
  mystate:FormControl;
  pin:FormControl;
  resp:any=null;
  state:string[];
  isEdited:boolean =false;
  isDisplayButton:boolean =true;
  @ViewChild('focusonAddress',{static:false})
  focusonAddress:ElementRef;
  currentLesson:boolean=false;
  cities:any=null;
  ResState:any;
  states;
  selectedState;
  editSelectedCity;
  editselectedState;
  constructor(public totalItem:itemNotify,private singleton:SingletonService,private route:Router,private active:ActivatedRoute,private service:ShoppingApiService,private pmtservice:PaymentOptionService) { }
  
  get currentsession():string
  {
    return this.singleton.session;
  }
  set currentsession(value:string)
  {
    this.singleton.session=value;
  }
 private subscription: Subscription;
 
  ngOnInit() 
  {
    let userform:FormGroup;
    this.createFormControls();
    this.createForm();
    this.CheckforLogin();
    this.GetAddress(localStorage.getItem("email"));
    this.subscription= this.service.getItem()
    .subscribe( 
        ttlItems=>
        {
         this.totalItem = ttlItems; 
         
        });




        this.service.GetStates()
        .subscribe((res)=>
        {
          this.ResState=res.body;
          this.states=this.ResState;
         
          
        });


       

  }
  

  GetAddress(email:string)
  {
   
    this.service.GetAddress(email)
    .subscribe((res:Response)=>
    {
     
   
      this.PlaceOrderForm.controls["userMiddleName"].setValue(res.body["middleName"]==='undefined'?'':res.body["middleName"]);
      this.PlaceOrderForm.controls["userLastName"].setValue(res.body["lastName"]);
      this.PlaceOrderForm.controls["address"].setValue(res.body["address"]);
     // this.PlaceOrderForm.controls["city"].setValue(res.body["city"]);
      this.PlaceOrderForm.controls["pin"].setValue(res.body["pin"]);
      this.PlaceOrderForm.controls["username"].setValue(res.body["firstName"]);
      
      this.editselectedState=res.body["state"]
     
      this.editSelectedCity=res.body["city"]
      this.GetCities(this.editselectedState);
      

         }
    );

  }

  


  Order(ee)
  {
    if(ee===true)
    {
     
    if(this.totalItem.totalCartItem===0) 
        {this.currentLesson=true;     return false; }
         else {
           this.currentLesson=false
       
          };
    let regis= new registration();
    
    if(this.currentsession!=='undefined')
    {
      //alert(this.PlaceOrderForm.controls["userMiddleName"].value);
      regis.middleName =  this.PlaceOrderForm.controls["userMiddleName"].value==='undefined'?'':this.PlaceOrderForm.controls["userMiddleName"].value;
      regis.lastName= this.PlaceOrderForm.controls["userLastName"].value;
      regis.address= this.PlaceOrderForm.controls["address"].value;
      regis.city= this.PlaceOrderForm.controls["city"].value;
      regis.pin= this.PlaceOrderForm.controls["pin"].value;
      regis.firstName= this.PlaceOrderForm.controls["username"].value;
      regis.state= this.PlaceOrderForm.controls["mystate"].value;
     regis.emailId=localStorage.getItem("email");
      regis.PrivacyAgreed=ee;

     



    
      this.service.paymentreceive(localStorage.getItem("userSession"),regis,this.pmtservice.GetPaymentOption)
        .subscribe((res:Response) =>
        {
        
          this.resp =res; 
        
            this.route.navigateByUrl("/PmtRecevdThanks")
        
          //if status code is unauthorized.. need to redirect login page with error message
        },
      err => 
      {
        if(err.status!==200)
        {
          localStorage.removeItem("id_token");
          this.route.navigateByUrl('/login');
        }

      

      });
    
   

      }
    }
    return false;
  }


  createForm() {
    this.PlaceOrderForm = new FormGroup({
      //name: new FormGroup({
      
      address:this.address,
      city:this.city,
      mystate:this.mystate,
      pin:this.pin,
      username:this.username,
      userLastName:this.userLastName,
      userMiddleName:this.userMiddleName

      
    });
  }
  createFormControls() {
    this.username=new FormControl({value:'',disabled:true},Validators.required);
    this.city = new FormControl({value: '', disabled: true},Validators.required);
   
    this.mystate= new FormControl({value: '', disabled: true},Validators.required);
   
    this.pin= new FormControl({value: '', disabled: true},Validators.required);
    this.address= new FormControl({value: '', disabled: true},Validators.required);
    this.userMiddleName=new FormControl({value: '', disabled: true});
    this.userLastName=  new FormControl({value: '', disabled: true},Validators.required);
  
  }

     

      EditAddress()
      {
        this.isEdited=true;
        this.isDisplayButton =false;
        this.PlaceOrderForm.controls["address"].enable();
        this.PlaceOrderForm.controls["city"].enable();
        this.PlaceOrderForm.controls["pin"].enable();
        this.PlaceOrderForm.controls["mystate"].enable();
        this.PlaceOrderForm.controls["username"].enable();
        this.PlaceOrderForm.controls["userMiddleName"].enable();
        this.PlaceOrderForm.controls["userLastName"].enable();

        this.focusonAddress.nativeElement.focus();
       

      }

      SaveAddress()
      {
        let edit = new EditAddress();
        edit.middleName =  this.PlaceOrderForm.controls["userMiddleName"].value==='undefined'?'':this.PlaceOrderForm.controls["userMiddleName"].value;
        edit.lastName= this.PlaceOrderForm.controls["userLastName"].value;
        edit.address= this.PlaceOrderForm.controls["address"].value;
        edit.city= this.PlaceOrderForm.controls["city"].value;
        edit.pin= this.PlaceOrderForm.controls["pin"].value;
        edit.firstName= this.PlaceOrderForm.controls["username"].value;
        edit.state= this.PlaceOrderForm.controls["mystate"].value;
        edit.emailId=localStorage.getItem("email");
       


      
            this.service.SaveEditedAddress(edit)
            .subscribe((res:Response)=>
                {
                  this.resp=res;
                  this.isEdited=false;
                
                  this.isDisplayButton =true;
                },
                      err => 
                {
                  this.isEdited=false;
                  this.isDisplayButton =true;
                  if(err.status!==200)
                  {
                    localStorage.removeItem("id_token");
                    this.route.navigateByUrl('/login');
                  }
            });
      }



      GetCities(StateId:string)
      {
    
        
       
        this.service.GetCities(StateId)
       
        .subscribe((res:Response)=>
        {
            this.cities=res.body
            console.log('cities9999 ',this.cities)
            
        });
      }

      CheckforLogin()
      {

        let storage:string = localStorage.getItem("id_token");
        let EmailId:string = localStorage.getItem("email");
   
      if(storage==null )
      {
        this.route.navigateByUrl('/login');
      }
  //   else
  //   {
       
  //       this.route.navigateByUrl("/PlaceOrder/");
  //       if(EmailId!=='undefined')
  //       {
  //         this.service.paymentreceive(EmailId,localstorage,this.rows)
  //         .subscribe((res:Response) =>
  //         {
          
  //           //if status code is unauthorized.. need to redirect login page with error message
  //         },
  //         err => 
  //         {
  //           if(err.status!==200)
  //           {
  //             localStorage.removeItem("id_token");
  //             this.route.navigateByUrl('/login')
  //           }

  //         }
       
        
  //       );
  //      }
  // /}


      }





      ngOnDestroy()
      {
        this.subscription.unsubscribe();
       
      }

}
