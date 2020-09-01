import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordCodeValidation {
  private readonly path: string = "http://localhost:8080/forgotPassword";
  constructor(private httpClient: HttpClient) {}

  validateForgotPasswordCode(emailAddress: string, forgotPasswordCode: string): Observable<any> {
    const url: string = `${this.path}/${emailAddress}?forgotPasswordCode=${forgotPasswordCode}`;
    return this.httpClient.get<any>(url);
  }
}
