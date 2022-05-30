import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router : Router, private authService: AuthService) { }

  canActivate() {
      if(this.authService.isLoggedIn()) return true;
      this.router.navigate(['/login']);
      return false;
  }
}
