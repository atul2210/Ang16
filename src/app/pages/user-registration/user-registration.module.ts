import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRegistrationComponent} from './user-registration.component';
import { Routes,RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [{ path: '', component: UserRegistrationComponent },

];
@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserRegistrationComponentModule { }
