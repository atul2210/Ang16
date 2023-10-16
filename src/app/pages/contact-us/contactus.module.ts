import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactUsComponent} from './contact-us.component';
import { Routes,RouterModule } from '@angular/router';


const routes: Routes = [{ path: '', component: ContactUsComponent },

];
@NgModule({
  declarations: [ContactUsComponent],
  imports: [
   
    RouterModule.forChild(routes)
  ],
  
})

export class ContactUsModule { }
