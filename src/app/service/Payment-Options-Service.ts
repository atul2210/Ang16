import {Injectable} from '@angular/core';

@Injectable()

export class PaymentOptionService{
constructor(){}
public paymentId:number;

set setPaymentOption(object:number){
    this.paymentId = object; 
 }

 get GetPaymentOption(){
    return this.paymentId;
 }




}