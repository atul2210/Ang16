import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemdetailsComponent} from './itemdetails.component';
import { Routes,RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgxImageZoomModule } from 'ngx-image-zoom';

// import {MatMenuModule,
//     MatButtonModule,
//     MatToolbarModule,
//     MatIconModule,
//     MatCardModule,MatGridListModule,
//     MatDividerModule, 
//     MatListModule,MatFormFieldModule,MatInputModule  } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { CurrencyPipe } from '@angular/common';

const routes: Routes = [{ path: '', component: ItemdetailsComponent },

];
@NgModule({
  declarations: [ItemdetailsComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,//NgxImageZoomModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,MatGridListModule,
    MatDividerModule, 
    MatListModule,MatFormFieldModule,MatInputModule,
    CurrencyPipe,
    NgxImageZoomModule,
    RouterModule.forChild(routes)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ], 
})
export class ItemdetailsModule { }
