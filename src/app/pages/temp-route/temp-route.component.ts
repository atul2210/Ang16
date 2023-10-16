import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-temp-route',
  templateUrl: './temp-route.component.html',
  styleUrls: ['./temp-route.component.css']
})
export class TempRouteComponent implements OnInit {
  search:string;
  val:string;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.search = this.route.snapshot.paramMap.get('tempsearch');
    this.val =  this.route.snapshot.paramMap.get('val')
  
    if(this.val =='search')
    {
        this.router.navigateByUrl('/search/'+this.search);
    }
  else
    {
  
     alert(this.val.toString())
    
      this.router.navigateByUrl('/menu/'+this.search.toString());
    }
  }

}
