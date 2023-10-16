import { Component, OnInit } from '@angular/core';
import {activateuserservce} from '../../service/ActivateUserService';
import {ShoppingApiService} from '../../service/shopping-api.service'
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-first-time-user',
  templateUrl: './first-time-user.component.html',
  styleUrls: ['./first-time-user.component.css']
})
export class FirstTimeUserComponent implements OnInit {
  emailId:string;
  constructor(private activeservice:activateuserservce,private ShoppingApiService:ShoppingApiService,private router:ActivatedRoute) { }
  status:any;
  ngOnInit() {

  ////  this.emailId=this.activeservice.getOption();
  this.emailId=this.router.snapshot.params['email'];

    this.ShoppingApiService.ActivateUserAccount(this.emailId,true)
    .subscribe(
     (data:Response) => {
     this.status=data;
  });

  }
}
