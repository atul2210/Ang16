import { Component, OnInit,OnDestroy,Input, Inject, Output, EventEmitter } from '@angular/core';
import {MenuServiceService} from '../../service/menu/menu-service.service'
import { Observable, Subscription } from 'rxjs';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SearchServiceService } from '../../service/search-service.service';
import { Router,NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';

//import {MatButton,MatMenu,MatMenuTrigger} from '@angular/material';
import {ShoppingApiService} from '../../service/shopping-api.service'

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.css'],
  
 
})
export class DynamicMenuComponent implements OnInit {
  private subs: Subscription;
  itemname:string;
  menuitems;
  loading:boolean=false;
  menuHtml:string="";  private subscription: Subscription;
  pageindex:number=0;
  pagesize:number=0;
  data:string;  
 
  pageArray:any[];
  count:number;
  dynamicHtml:string;
  private request$: Observable<any>;
  deviceInfo = null;
 
 
  //@Input() items:any;
  //@Input() menuName: string;
 
  //@Output() menuItem = new EventEmitter<number>();

  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}

  constructor(private router:Router,private http:SearchServiceService,private service:MenuServiceService,private search : SearchResultComponent,private ShoppingApiService:ShoppingApiService) { 
    
  }

  ngOnInit() {
    this.GetBootStrapMenuItems();
  
  }

  public GetBootStrapMenuItems()
  {
    let isMainMenu:boolean=true;
    this.subs = this.service.menuitems()
    .subscribe((res:Response)=>
    {
       this.menuitems = res.body
       console.log('menuitem',this.menuitems),
       error => console.log('MenuError', error)
    });
  }

 public async PassvalueToChild(id:number)
 {
  
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  

  this.ShoppingApiService.MenuId(id);
 
 }

  

searchResult()
{

}
// public testarr: Array<any> = [];
// public itemlist: Array<any> = [];
// public onScrollDown(mnuId:number): void {

   
//   this.servicesearch.GetItems(mnuId,this.pageindex,this.pagesize,(itemsarr)=>
//   {
//       this.count = itemsarr.itemCount;
//       console.log('pconpp', this.testarr)
//       if(this.pageindex===1)
//       {
//         this.testarr =itemsarr.itemDetails
//         this.pageindex++;
//       }
//       else
//       {
//          this.testarr = this.testarr.concat(itemsarr.itemDetails);
//          this.pageindex++;
//       }
//   });
// }





}
