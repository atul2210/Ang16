
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { BehaviorSubject } from 'rxjs';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleauthService {
  
  //user = new BehaviorSubject<any>(this.fireAuth.currentUser);
  constructor(
    private googleAuth: SocialAuthService
  ) {
    this.init();
  }

  init(): void {
   
  }

  handle(token): void {
   
  }

  signOut(): void {
   
  }
}