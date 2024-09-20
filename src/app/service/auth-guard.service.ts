import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
    
   }

   canActivate(): boolean {
    var isauthenticate = localStorage.getItem("isAuthenticated");
    if (isauthenticate) {
      return true;   // If the user is logged in, allow access to the route
    } else {
      this.router.navigate(['/login']); // If not logged in, redirect to the login page
      return false;
    }
  }
}
