import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml,SafeStyle,SafeScript,SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer) {}
  
//  transform(value: any, type:string,args?: any): any {
    transform(value: any, type:string): SafeHtml|SafeStyle|SafeScript|SafeUrl|SafeResourceUrl {
      switch(type)
      {
          case'html': return this.sanitizer.bypassSecurityTrustHtml(value);
          case'style': return this.sanitizer.bypassSecurityTrustStyle(value);
          case 'script' : return this.sanitizer.bypassSecurityTrustScript(value);
          case 'url' :return this.sanitizer.bypassSecurityTrustUrl(value);
          case 'resourceurl' : return this.sanitizer.bypassSecurityTrustResourceUrl(value);
        //  case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
        
          default: throw new Error ('Invalid safe type speicified : ${type}' );

      }





    
  }


  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}


}
