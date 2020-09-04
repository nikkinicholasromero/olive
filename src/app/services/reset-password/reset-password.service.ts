import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResetPasswordRequest } from '../../models/reset-password-request';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private readonly url: string = "http://localhost:8080/password";
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {
  }

  resetPassword(requestPasswordRequest: ResetPasswordRequest): Observable<any> {
    return this.httpClient.post<any>(this.url, requestPasswordRequest, this.httpOptions);
  }
}
