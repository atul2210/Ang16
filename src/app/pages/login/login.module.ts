import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import { Routes,RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

const routes: Routes = [{ path: '', component: LoginComponent },

];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes),
    GoogleSigninButtonModule
  ]
})
export class LoginModule { }
