import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';


import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {ShoppingApiService} from '../../service/shopping-api.service';
import {responseData} from '../../model/pagedata'



@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
  providers: [NgbCarouselConfig],

})
export class SlidersComponent implements OnInit {
item;

  data:any;  
  
  
  imageItems:any[]=[];
  constructor(private config: NgbCarouselConfig, private shopapi:ShoppingApiService) { 
   
/*ngx sliders end*/
config.interval = 2000;
config.wrap = true;
config.keyboard = false;

//config.pauseOnHover = false;
// this.shopapi.getimages()
// .subscribe((m)=>
// {
//   this.item = m;
//   this.imageItems = this.item.body;
//   console.log(this.imageItems);
// },
// err=>{
// console.log(err);
 
// }
// );

// this.imageItems = [
//   'https://placeimg.com/600/600/any',
//   'https://placeimg.com/600/600/nature',
//   'https://placeimg.com/600/600/sepia',
//   'https://placeimg.com/600/600/people',
//   'https://placeimg.com/600/600/tech'
// ];
// this.imageItems = [
//   'https://placeimg.com/600/600/any',
//   'https://placeimg.com/600/600/nature',
//   'https://placeimg.com/600/600/sepia',
//   'https://placeimg.com/600/600/people',
//   'https://placeimg.com/600/600/tech'
// ];

    
this.imageItems = ['assets/Pics/free1.jpg',
'assets/Pics/free2.jpg',
'assets/Pics/free3.jpg',
'assets/Pics/free4.jpg',
'assets/Pics/free5.jpg',
'assets/Pics/free6.jpg',
'assets/Pics/free8.jpg'
];


  }

  ngOnInit() {
   
    // const slideItems = [
    //   { src: "assets/Pics/pic4.jpg", title: 'Title 1' },
    //   { src: 'assets/Pics/pic1.jpg', title: 'Title 2' },
    //   { src: 'assets/Pics/pic2.jpg', title: 'Title 3' },
    //   { src: 'assets/Pics/pic3.jpg', title: 'Title 4' }
  
    // ];
    
  //  this.slider.items = slideItems; //ngx 
   

  }

}
