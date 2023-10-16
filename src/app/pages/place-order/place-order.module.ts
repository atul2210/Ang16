import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlaceOrderComponent } from './place-order.component';
import {FormsModule,ReactiveFormsModule,} from '@angular/forms';

const routes: Routes = [
  { path: '', component: PlaceOrderComponent }
];

@NgModule({
  declarations: [PlaceOrderComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PlaceOrdersModule { }
