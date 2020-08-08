import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { 
  }

  public isAuthenticated() {
    return !!localStorage.getItem('authentication')
  }

  public authenticate(username: string, password: string): boolean {
    localStorage.setItem('authentication', 'true');
    return true;
  }

  public logout(): void {
    localStorage.removeItem('authentication');
  }
}
