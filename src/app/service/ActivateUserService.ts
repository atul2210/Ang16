
import { Injectable, Inject } from '@angular/core';

export class activateuserservce
{
constructor()
    {
        
    }
    getEmail:string = null;

    setOption(option, value) {      
        this.getEmail = value;  
      }  
      
      getOption() {  
        return this.getEmail;  
      }  


}