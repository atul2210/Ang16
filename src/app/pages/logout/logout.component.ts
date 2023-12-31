import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShoppingApiService} from '../../service/shopping-api.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service:ShoppingApiService) {
    this.service.dispSignInYes(false);
   }

  ngOnInit() {
    this.service.userFullName("");
    this.service.logout();
   
    

  }

}
