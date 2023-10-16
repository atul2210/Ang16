import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CheckinComponent} from './checkin.component';
import { Routes,RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PaymentOptionsComponent } from './PaymentOPtions/Payment/payment-options/payment-options.component';
///////import {PaymentOptionService} from './Payment-Options-Service';
import { FormsModule } from '@angular/forms';
import {authguard} from '../../service/auth-guard';

const routes: Routes = [{ path: '', component: CheckinComponent},
{ path: 'pmt', component: PaymentOptionsComponent,canActivate:[authguard]}

];
@NgModule({
  declarations: [CheckinComponent, PaymentOptionsComponent],
  imports: [
    CommonModule,NgxDatatableModule,FormsModule,
    RouterModule.forChild(routes)
  ],
 
})
export class CheckintModule { }
