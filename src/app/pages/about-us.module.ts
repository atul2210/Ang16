import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AboutUsComponent} from '../pages/about-us.component';
import { Routes,RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';

//import { PmtRcvtThanksComponent } from './pmt-rcvt-thanks/pmt-rcvt-thanks.component';


const routes: Routes = [{ path: '', component: AboutUsComponent },

];
@NgModule({
  declarations: [AboutUsComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutUsModule { }
