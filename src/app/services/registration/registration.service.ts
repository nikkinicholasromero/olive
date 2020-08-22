import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../../models/user-account';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly url: string = "http://localhost:8080/registration";
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {
  }

  register(userAccount: UserAccount): Observable<any> {
    return this.httpClient.post<any>(this.url, userAccount, this.httpOptions);
  }
}
