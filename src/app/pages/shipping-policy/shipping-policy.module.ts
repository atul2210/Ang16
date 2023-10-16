import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShippingPolicyComponent} from './shipping-policy.component';
import { Routes,RouterModule } from '@angular/router';


const routes: Routes = [{ path: '', component: ShippingPolicyComponent },

];
@NgModule({
  declarations: [ShippingPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShippingPolicydModule { }
