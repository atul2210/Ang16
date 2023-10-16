import { Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import {ReactiveFormsModule,FormsModule,NgControl,  FormGroup,FormControl,ValidationErrors,Validator, Validators,FormBuilder, AbstractControl} from '@angular/forms'
import {Router,ActivatedRoute} from '@angular/router';
import {registration} from '../../model/registration';
import {ShoppingApiService} from '../../service/shopping-api.service'
import Validation from '../../utils/Validation';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  status;
  
  display='none'; //default Variable
  err:string="";
  isOk=false;
  mobile:string="";
  loading:boolean=false;
  data;
  
  // myemail: FormControl;
  // password: FormControl;
  // confirmpassword: FormControl;
  // oldPassword:FormControl;
  items:any;

  constructor(private ActivatedRoute:ActivatedRoute,private router:Router,private ShoppingApiService:ShoppingApiService,private formBuilder: FormBuilder) { }

  myform: FormGroup = new FormGroup({
    //fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
    //acceptTerms: new FormControl(false),
  });
  submitted = false;

  ngOnInit() {
    this.myform = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
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
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'confirmpassword')],
      }
    );
   


    
  

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


  changepassword()
  {
    if(this.myform.valid)
    {

     let email =  this.myform.controls["myemail"].value;
     let password= this.myform.controls["password"].value;
     let confirmpassword= this.myform.controls["confirmpassword"].value;
     let oldPaswd = this.myform.controls["oldPassword"].value
      this.ShoppingApiService.changepassword(email,password,confirmpassword,oldPaswd)
      .subscribe((res:Response)=>
      {
        this.items=res;
        this.err= this.items.body.result;
      },
      err=>{
        
        this.err=err.error;
     //   console.log("error ",err.body["error"]);
      }
    
    )
      
    }
  }

  RedirectToLogin()
  {
      this.router.navigateByUrl('/login');
  }    


}
