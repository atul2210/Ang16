import {Injectable} from '@angular/core';

@Injectable()

export class itemService{
constructor(){}
public itemid:number;

set itemIdLogin(object:number){
    this.itemid = object; 
    alert('set ' + object)
 }

 get itemIdLogin(){
   alert('get ' + this.itemid)
    return this.itemid;
 }




}