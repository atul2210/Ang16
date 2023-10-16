import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import {ShoppingApiService} from '../app/service/shopping-api.service';
import { HomepageComponent } from './home/homepage/homepage.component'
import { RouterModule,CanActivate } from '@angular/router';
import { PageNotFoundComponentComponent } from './page-not-found/page-not-found-component/page-not-found-component.component';
import {Globals} from './model/global'
//import { DeviceDetectorService } from 'ngx-device-detector';

import {serviceintercepter} from './service/sevice-intercepter';
import {authguard} from '../app/service/auth-guard';

import { NgxImgZoomModule } from 'ngx-img-zoom';
/////////import { SliderModule } from 'ngx-slider';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {  } from 'ngx-infinite-scroller';
//import { DeviceDetectorService } from 'ngx-device-detector';
import {responseData} from './model/pagedata';

import { SafePipe } from './safe.pipe';
import { CartItemServiceService } from './service/cart-item-service.service';
import { itemNotify } from './pages/itemdetails/item-notify';
import {HttpXsrfInterceptor} from './service/httpXsrfIntercepter';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import {LoadingIndicatorInterceptor,LoadingIndicatorServiceService} from '../../src/app/service/loading-indicator-service.service'
import {MenuServiceService} from './service/menu/menu-service.service';
import {SearchServiceService} from "./service/search-service.service"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DynamicMenuComponent } from './pages/dynamic-menu/dynamic-menu.component'
 import { FlexLayoutModule } from "@angular/flex-layout";
import {SlidersComponent} from './pages/sliders/sliders.component';
import { TempRouteComponent } from './pages/temp-route/temp-route.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { ForegetPasswordComponent } from './pages/foreget-password/foreget-password.component';
import { ErrorComponent } from './pages/error/error.component';

import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import {PmtRcvtThanksComponent} from './pages/pmt-rcvt-thanks/pmt-rcvt-thanks.component'

import{itemService} from '../app/pages/itemdetails/itemdetails.service';

import {SingletonService} from './service/singleton.service';
import {activateuserservce} from './service/ActivateUserService';
import { FirstTimeUserComponent } from './pages/first-time-user/first-time-user.component';
import {ReturnPolicyComponent} from './pages/return-policy/return-policy.component';
import { AppModule } from './app.module';
import {PaymentOptionService} from './service/Payment-Options-Service';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import { NgtUniversalModule, WINDOW } from '@ng-toolkit/universal';
import {provideClientHydration} from '@angular/platform-browser';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
 @NgModule({
  imports: [
    FlexLayoutModule,  ReactiveFormsModule,HttpClientModule,RouterModule,NgxDatatableModule,
    RouterModule.forRoot(    [
       {path:'',redirectTo:'HomeComponent',pathMatch:'full'},
       {path: 'login', loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginModule)},
       {path: 'welcome', loadChildren: () => import('../app/welcome/welcome.module').then(m => m.WelcomeModule)},
      {path:'HomeComponent',component:HomeComponent},
      {path:'menu/:subcategory',component:AppComponent},
      {path:'women/:category/:pageindex',component:AppComponent},
      {path:'men/:category/:pageindex',component:AppComponent},
      {path:'kids/:category/:pageindex',component:AppComponent},
      {path:'furn/:category/:pageindex',component:AppComponent},
      {path:'sports/:category/:pageindex',component:AppComponent},
      {path:'grocery/:category/:pageindex',component:AppComponent},
      {path:'elec/:category/:pageindex',component:AppComponent},
      {path:'home',component:HomepageComponent},
      {path:'FirstTimeUser',component:FirstTimeUserComponent},
      {path: 'itemDetail/:itemid:itemid/:sizeId', loadChildren: () => import('../app/pages/itemdetails/itemdetail.module').then(m => m.ItemdetailsModule)},
      
      {path:'TempRouteSearch/:tempsearch/:val',component:TempRouteComponent},
      {path:'menu/:menucate/:menusubcate',component:TempRouteComponent},
      {path: 'checkin', loadChildren: () => import('../app/pages/checkin/checkin.module').then(m => m.CheckintModule)},
      {path: 'registration', loadChildren: () => import('../app/pages/user-registration/user-registration.module').then(m => m.UserRegistrationComponentModule)},
      {path:'search/:item',component:SearchResultComponent,runGuardsAndResolvers: 'always'},
      {path: 'forgetpassword', loadChildren: () => import('../app/pages/foreget-password/forget-password.module').then(m => m.ForgetPasswordModule)},
      {path: 'logout', loadChildren: () => import('../app/pages/logout/logout.module').then(m => m.LogoutModule)},
      {path: 'changepassword', loadChildren: () => import('../app/pages/changepassword/changepassword.module').then(m => m.ChangepasswordModule)},
      {path:'Error/:message/:compo/:mobi',component:ErrorComponent },
      
     {path: 'ContactUs', loadChildren: () => import('../app/pages/contact-us/contactus.module').then(m => m.ContactUsModule)},
     {path: 'PrivacyPolicy', loadChildren: () => import('../app/pages/privacy-policy/privacy-policy.modle').then(m => m.PrivacyPolicyModule)},
     
      {path: 'AboutUs', loadChildren: () => import('../app/pages/about-us.module').then(m => m.AboutUsModule)},
     // {path: 'forgetpassword', loadChildren: () => import('../app/pages/foreget-password/forget-password.module').then(m => m.ForgetPasswordModule)},
      {path: 'Payment', loadChildren: () => import('../app/pages/payment/payment.module').then(m => m.PaymentModule)},
      {path: 'ShippingPolicy', loadChildren: () => import('../app/pages/shipping-policy/shipping-policy.module').then(m => m.ShippingPolicydModule)},
    
      {path: 'PlaceOrder/', loadChildren: () => import('../app/pages/place-order/place-order.module').then(m => m.PlaceOrdersModule)},
      {path: 'PmtRecevdThanks', loadChildren: () => import('../app/pages/pmt-rcvt-thanks/pmt-rcvt-thanks.module').then(m => m.PmtRcvtThanksModule)},
      {path: 'NewUserActivate', loadChildren: () => import('../app/pages/new-user-activate/new-usre-activate.module').then(m => m.NewUserActivateModule)},

      {path:'ReturnPolicy',component:ReturnPolicyComponent},
      
      {path: 'CancelOrder', loadChildren: () => import('../app/pages/cancel-order/cancel-order.module').then(m => m.CancelOrderModule)},

      {path:'**',component:PageNotFoundComponentComponent}
  
      ],{onSameUrlNavigation: 'reload'} ),
     //////// SliderModule,

    NgbModule,
    NgxImageZoomModule,
    //NgxInfiniteScrollerModule,
    InfiniteScrollModule,
    FormsModule,
    //NgxImgZoomModule,
   ///// BrowserAnimationsModule,
    MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule ,MatDividerModule,MatListModule,MatFormFieldModule,MatInputModule,
        BrowserAnimationsModule,
        AppModule,
       // BrowserTransferStateModule,
      //  DeviceDetectorService
      RouterModule,FlexLayoutServerModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},ShoppingApiService,Globals,
    ShoppingApiService,SingletonService,activateuserservce,itemService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:serviceintercepter,
     
      multi:true
  
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpXsrfInterceptor,
     
      multi:true
  
    },
    LoadingIndicatorServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (service: LoadingIndicatorServiceService) => new LoadingIndicatorInterceptor(service),
      multi: true,
      deps: [LoadingIndicatorServiceService]
    },
    MenuServiceService,
    authguard,responseData, CartItemServiceService,itemNotify,SearchResultComponent,
    SearchServiceService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:serviceintercepter,
      multi:true
  
    },
    FlexLayoutModule,
    PaymentOptionService,
    provideClientHydration(),
    NgtUniversalModule,
    { provide: WINDOW, useValue: {} }
  ],
    
  
  bootstrap: [HomepageComponent]
})
export class AppBrowserModule { }
