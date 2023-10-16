import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import {CancelOrderComponent  } from './cancel-order.component';
import {authguard} from '../../service/auth-guard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const routes: Routes = [{ path: '', component: CancelOrderComponent,canActivate:[authguard] },

];
@NgModule({
  declarations: [CancelOrderComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
 
})
export class CancelOrderModule { }