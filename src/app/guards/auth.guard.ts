import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private unauthenticatedUrls: string[] = ["/login", "/register", "/accountActivation", "/forgotPassword", "/resetPassword"];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isUnauthenticatedUrl = !!this.unauthenticatedUrls.find(e => state.url.indexOf(e) >= 0);
    const isUserAuthenticated = this.authenticationService.isAuthenticated();

    if ((isUnauthenticatedUrl && !isUserAuthenticated) || (!isUnauthenticatedUrl && isUserAuthenticated)) {
      return true;
    } 
    
    if (isUnauthenticatedUrl && isUserAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
