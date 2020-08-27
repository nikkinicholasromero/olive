import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private readonly path: string = "http://localhost:8080/forgotPassword";
  constructor(private httpClient: HttpClient) {}

  sendForgotPasswordLink(emailAddress: string): Observable<any> {
    const url: string = this.path + `/${emailAddress}`;
    return this.httpClient.put<any>(url, null);
  }
}
