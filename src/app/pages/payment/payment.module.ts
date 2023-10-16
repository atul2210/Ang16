import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentComponent} from './payment.component';
import { Routes,RouterModule } from '@angular/router';
//import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [{ path: '', component: PaymentComponent },

];
@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,//,FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PaymentModule { }
