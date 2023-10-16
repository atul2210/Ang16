import { Component, OnInit,AfterViewInit,ElementRef, Inject } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import {registration} from '../../model/registration'
import {ShoppingApiService} from '../../service/shopping-api.service'
import {LoginComponent} from '../login/login.component';

import {activateuserservce} from '../../service/ActivateUserService';
import {ReactiveFormsModule,FormsModule,NgControl,  FormGroup,FormControl,ValidationErrors,Validator, Validators,FormBuilder, AbstractControl} from '@angular/forms'
import Validation from '../../utils/Validation';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
//////  isOtpOK:boolean=true;
  states: string[] = [
    // 'Uttar Pradesh',
    // 'Delhi',
    // 'Madhya Pradesh',
  ];
  citeis:any=null;
  selectedState;

  response:any=null;

  // myform: FormGroup;
  // mobile:FormControl;
  // firstName: FormControl;
  // middleName:FormControl;
  // lastName: FormControl;
  // myemail: FormControl;
  // password: FormControl;
  // //language: FormControl;
  // city:FormControl;
  // address:FormControl;
  // mystate:FormControl;
  // ulternatemobile:FormControl;
  // pin:FormControl;
  // otp:FormControl;
  ResState:any;
  afterSubmit:boolean=false;
  entMobile:number
  err:any;
  messege:string="";



  myform: FormGroup = new FormGroup({
    username: new FormControl(''),
    mobile: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(false),
    password: new FormControl(false),
    
    confirmpassword: new FormControl(false),
    city: new FormControl(false),
    address: new FormControl(false),
  });
  submitted = false;
 

  
  constructor(private formBuilder: FormBuilder, private ActivatedRoute:ActivatedRoute,private router:Router,private ShoppingApiService:ShoppingApiService,private activateuserservce:activateuserservce) { }
  
  
  ngOnInit() {
    let userform:FormGroup;
    this.myform = this.formBuilder.group(
      {
       
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        mobile: ['', [Validators.required],  Validators.minLength(10), Validators.maxLength(10)],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        city:  ['', Validators.required],
        address:  ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmpassword')],
      }
    );




    // this.createFormControls();
    // this.createForm();
   
    //this.myform.controls["mobile"].patchValue(this.ActivatedRoute.snapshot.params['mobile']);
    
    this.ShoppingApiService.GetStates()
    .subscribe((res)=>
    {
      this.ResState=res.body;
      this.states=this.ResState;
      //console.log("states",this.states)
      
    });



    }
   
    get f(): { [key: string]: AbstractControl } {
      return this.myform.controls;
    }
  
    onSubmit(): void {
      this.submitted = true;
  
      if (this.myform.invalid) {
        return;
      }
  
      console.log(JSON.stringify(this.myform.value, null, 2));
    }
  
    onReset(): void {
      this.submitted = false;
      this.myform.reset();
    }
    
    save() 
    { 

     
      if(this.myform.valid)
      {

        let data: registration;
        data = new registration();
        data.mobile = this.myform.controls['mobile'].value; 
        data.ulternateMobile = this.myform.controls["ulternatemobile"].value;
        data.firstName = this.myform.controls["firstName"].value;
        data.middleName = this.myform.controls["middleName"].value;
        data.lastName = this.myform.controls["lastName"].value;
        data.myemail = this.myform.controls["myemail"].value;
        data.password = this.myform.controls["password"].value;
        data.address = this.myform.controls["address"].value;
        data.city = this.myform.controls["city"].value;

          this.ShoppingApiService.addUser(data)
          .subscribe((m:Response)=>
          {
            this.response=m;
            this.err=this.response;
            this.router.navigateByUrl('/NewUserActivate')
          },
          (err) => 
          {
                 
            this.router.navigateByUrl("/Error/"+err.error.error +"/regis/"+data.mobile )
          });
    }
  }
    
  GetCities(StateId:string)
  {

   
    this.ShoppingApiService.GetCities(StateId)
    .subscribe((res:Response)=>
    {
        this.citeis=res.body
     ////   console.log(this.citeis)
    });
  }

  async proceed()
  {
    if(this.myform.valid)
    {
            let res = await this.ShoppingApiService.getOTP(this.myform.controls["mobile"].value)
                .then((res:Response)=>{                 
                this.messege= "We have send an OTP to your Mobile Number " + this.myform.controls["mobile"].value + "  Please check and enter OTP."
                })
                .catch(err=>
                {
                  this.err=err;
                });
                this.afterSubmit=true;

    }
        this.myform.controls["otp"].setValidators(Validators.required);
        this.myform.controls["otp"].updateValueAndValidity;
  }

  goback()
  {
    this.afterSubmit=false;
  }


  }

  


