import { Component, OnInit } from '@angular/core';
import {activateuserservce} from '../../service/ActivateUserService';

@Component({
  selector: 'app-new-user-activate',
  templateUrl: './new-user-activate.component.html',
  styleUrls: ['./new-user-activate.component.css']
})
export class NewUserActivateComponent implements OnInit {
emailId:string;
  constructor(private activate:activateuserservce) { }

  ngOnInit() {
        this.emailId=this.activate.getOption();

  }

}
