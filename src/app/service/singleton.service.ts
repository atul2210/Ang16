import { Injectable, Inject } from '@angular/core';


@Injectable()
export class SingletonService {

  constructor( ) { 

  }

  session:string = localStorage.getItem("id_token");
}
