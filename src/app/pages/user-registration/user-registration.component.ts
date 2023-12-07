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

 
  citeis:any=null;
  selectedState;

  response:any=null;
  isOtp:boolean=false;
  
  ResState:any;
  afterSubmit:boolean=false;
  entMobile:number
  err:any;
  messege:string="";
   
  errormsg:string;
  isValid:boolean=false;
  invalidOtp:boolean=false;


  myform: FormGroup = new FormGroup({
    
    mobile: new FormControl(''),
    firstName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;
 
  OtpForm: FormGroup = new FormGroup({
    Otp: new FormControl(''),
  });
  Otpsubmitted = false;
  constructor(private formBuilder: FormBuilder, private ActivatedRoute:ActivatedRoute,private router:Router,private ShoppingApiService:ShoppingApiService,private activateuserservce:activateuserservce) { 
    
  }
  
  
  ngOnInit() {
    
    this.myform = this.formBuilder.group(
      {
       
       
        mobile: ['', [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]],
        firstName: ['', Validators.required],
        
        email: ['', [ Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
      
        //acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );


    this.OtpForm = this.formBuilder.group(
      {
        Otp:[ '', [Validators.required]]
      }
    );

    }
   
    get f(): { [key: string]: AbstractControl } {
    
     
      return this.myform.controls;
    }

    get fotp(): { [key: string]: AbstractControl } {
      return this.OtpForm.controls;
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
    
    onSubmitOtp() 
    { 
      this.Otpsubmitted=true;
      if(this.myform.valid)
      {
        let data: registration;
        data = new registration();
        data.Otp = this.OtpForm.controls['Otp'].value; 
        data.mobile = this.myform.controls['mobile'].value; 
        data.firstLastName = this.myform.controls["firstName"].value;
        data.password = this.myform.controls["password"].value;
        data.email = this.myform.controls["email"].value;
        this.ShoppingApiService.addUser(data)
          .subscribe(m=>
          {
            if(m!="Invalid OTP")
            {
              this.response=m;
              this.invalidOtp=false;
              this.router.navigateByUrl('/NewUserActivate');
             
            }
            else
            {
              this.invalidOtp=true;
            }
           
          }
          );
    }
  }
    
 
  async proceed()
  {
    this.submitted = true;
  
    if (this.myform.invalid) { 
      return;
    }

    if(this.myform.valid)
    {
      this.ShoppingApiService.VerifyUser(this.myform.controls['mobile'].value,this.myform.controls["email"].value,)
      .subscribe((m)=>
      {
        if(m==="valid")
        {
          this.errormsg="";
          this.isValid=false;
          this.isOtp=true;
         
        }
        else
        {
          this.errormsg=m;
          this.isValid=true;
          this.isOtp=false;
        }
      });
    }
        
  }

  goback()
  {
    this.afterSubmit=false;
  }

  
}

  


