import { Component, OnInit,OnChanges, Input } from '@angular/core';
//import * as $ from 'jquery';
import {ShoppingApiService} from '../../src/app/service/shopping-api.service'
import {allItems} from '../app/model/allitems'
import {ActivatedRoute} from '@angular/router'
import { SearchServiceService } from './service/search-service.service';
import {LoadingIndicatorServiceService} from './service/loading-indicator-service.service';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {ngSkipHydration: 'true'},
})
export class AppComponent implements OnInit {
  title = 'app';
  items:any[];
  public categoryItemArray: Array<any> = [];
  private pageindex:number;
  private pagesize:number=8;
  public categoryId:number;
  public subcategory:number=0;
  public totalcount;
  loading:boolean=false;
  count:number;
  public testarr: Array<any> = [];
  public itemlist: Array<any> = [];
  menuItemid=1

constructor(private loadingIndicatorService: LoadingIndicatorServiceService,public restProvider:SearchServiceService,private route:ActivatedRoute,private ShoppingApiService:ShoppingApiService){
  loadingIndicatorService
  .onLoadingChanged
  .subscribe(isLoading => this.loading = isLoading);
 
 
}
public ngOnInit()
  {
  
    //this.subcategory= this.route.snapshot.params["subcategory"];
    
    this.pageindex = 0;

  this.onScrollDown();
 
  }


  public async onScrollDown() {
   
   
    
      this.ShoppingApiService.getMenuId()
      .subscribe(async mnuId=>
        {
          
          this.subcategory =mnuId;

          if(this.subcategory>0)
          {
            this.pageindex=1;
          }
       
       

        await this.restProvider.GetItems(this.subcategory,this.pageindex,this.pagesize,(itemsarr)=>
                {
                    this.count = itemsarr.itemCount;
                    this.testarr=itemsarr;
                    console.log('pconpp', this.testarr)
                    
                  if(this.testarr.length<this.count)
                    {
                      // for(let i =0;i<(itemsarr.results.length);i++ )
                      // {
                      
                    
                      //   itemsarr.results[i].image1 = 'data:image/jpeg;base64,' +  itemsarr.results[i].image1;
              
                      // }
                      this.testarr = this.testarr.concat(itemsarr.itemDetails);
                              
                    }    
                });
              });
    this.pageindex=this.pageindex+1;
    
 
   




    // this.restProvider.AllItems(this.subcategory, this.pageindex,this.pagesize,(categoryItemArray)=>
    // {
    // this.totalcount = categoryItemArray.count;
      
    //   if(this.categoryItemArray.length<this.totalcount)
    //   {
       
    //    ////////////// this.categoryItemArray = this.categoryItemArray.concat(categoryItemArray.results);
       
        
    //  } 
    // });
  }


}
