import { Component, OnInit,Pipe, PipeTransform,OnDestroy,Input, Inject, Output, EventEmitter  } from '@angular/core';
import {SlidersComponent} from '../../pages/sliders/sliders.component';
import {ShoppingApiService} from '../../service/shopping-api.service';
import {responseData} from '../../model/pagedata'
import {BrowserModule, DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {SearchServiceService} from '../../service/search-service.service';
import { LoadingIndicatorServiceService } from '../../service/loading-indicator-service.service';
import { Observable } from 'rxjs';
import { share, finalize } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Title, Meta } from '@angular/platform-browser';
 

import {MenuServiceService} from '../../service/menu/menu-service.service'
import { Subscription } from 'rxjs';
import { SearchResultComponent } from '../search-result/search-result.component';

import { Router,NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';

//import {MatButton,MatMenu,MatMenuTrigger} from '@angular/material';




@Component({
  selector: 'app-home',
  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
 
})


export class HomeComponent implements OnInit  {
  data:string;  
  loading:boolean=false;
  pageindex:number=1;
  pagesize:number=0;
  pageArray:any[];
  count:number;
  dynamicHtml:string;
  private request$: Observable<any>;
  deviceInfo = null;
  menuitems;
  private subs: Subscription;


  constructor(private responseData:responseData,private ShoppingApiService:ShoppingApiService,private service:SearchServiceService,private loadingIndicatorService: LoadingIndicatorServiceService,private devideDetect:DeviceDetectorService,private titleService: Title, private metaService: Meta, private mnuservice:MenuServiceService,  private router:Router) {
    loadingIndicatorService
    .onLoadingChanged
    .subscribe(isLoading => this.loading = isLoading);
   
  }


  ngOnInit() {

    this.titleService.setTitle("Vidhim");
    this.metaService.addTags([
      {name: 'keywords', content:  'men women kids vidhim shopping kurti legging kids frocks online shopping '},
      {name: 'description', content: 'cheap rate www.vidhim.com all types of cheap range items online shopping kids women woman men man kid .'},
      {name: 'robots', content: 'subse sasta loot machi hai '}
    ]);

    this.deviceInfo = this.devideDetect.getDeviceInfo();
    const isMobile = this.devideDetect.isMobile();
    const isTablet = this.devideDetect.isTablet();
    const isDesktopDevice = this.devideDetect.isDesktop();

    if(isMobile) {this.pagesize=4; }
    if(isTablet) {this.pagesize=8;}
    if(isDesktopDevice)(this.pagesize=10);
    this.testarr=[];

    this.GetBootStrapMenuItems();
    this.onScrollDown(0);
 
  }


private  GetDynamicDiv(arr:any[])
{
 
  for(let item of arr)
  {
   
    this.data = this.data + "<ul>"
    this.data = this.data +  "<li id =" +item.itemid +">"
    this.data= this.data  + "<a  target='_blank' href='/itemDetail/" + item.itemid + "'>"
    this.data= this.data  + "<img src='"+ item.image + "' class='items' height='100px' width='100px'  />"
    this.data= this.data +  "</a>"
    this.data = this.data +  "<br clear='all' />"
    this.data = this.data +  "<div>"+ item.itemName + "</div>"
    this.data= this.data + "</li></ul>" 
    
  }

    return this.data;
}



toHTML(input) : any {
  return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}

public testarr: Array<any> = [];
public itemlist: Array<any> = [];
 
  public onScrollDown(mnuId:number): void {

   
  this.service.GetItems(mnuId,this.pageindex,this.pagesize,(itemsarr)=>
  {
      this.count = itemsarr.itemCount;
      console.log('pconpp', this.testarr)
      if(this.pageindex===1)
      {
        this.testarr =itemsarr.itemDetails
        this.pageindex++;
      }
      else
      {
         this.testarr = this.testarr.concat(itemsarr.itemDetails);
         this.pageindex++;
      }
  });
}



private onFinalize(): void {
  this.request$ = null;
}

//May 2023

public GetBootStrapMenuItems()
{
  let isMainMenu:boolean=true;
  this.subs = this.mnuservice.menuitems()
  .subscribe((res:Response)=>
  {
     this.menuitems = res.body
     console.log('menuitem',this.menuitems)
  });
}

public async PassvalueToChild(id:number)
{
  this.pageindex=1;
  this.onScrollDown(id)
}

///
onScrollUp() {
  console.log("scrolled up!!");
}


}



