import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChangepasswordComponent} from './changepassword.component';
import { Routes,RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [{ path: '', component: ChangepasswordComponent },

];
@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
   
    RouterModule.forChild(routes)
  ],
  
})
export class ChangepasswordModule { }
