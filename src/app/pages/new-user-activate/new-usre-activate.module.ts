import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewUserActivateComponent} from './new-user-activate.component';
import { Routes,RouterModule } from '@angular/router';
////import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [{ path: '', component: NewUserActivateComponent },

];
@NgModule({
  declarations: [NewUserActivateComponent],
  imports: [
    CommonModule,//FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ], 
})
export class NewUserActivateModule { }
