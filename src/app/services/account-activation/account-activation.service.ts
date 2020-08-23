import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountActivationService {
  private readonly path: string = "http://localhost:8080/activation";
  constructor(private httpClient: HttpClient) {}

  activateAccount(emailAddress: string, activationCode: string): Observable<any> {
    const url: string = this.path + `/${emailAddress}?activationCode=${activationCode}`;
    return this.httpClient.put<any>(url, null);
  }
}
