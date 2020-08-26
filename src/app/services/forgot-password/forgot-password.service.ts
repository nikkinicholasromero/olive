import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private readonly path: string = "http://localhost:8080/forgot-password";
  constructor(private httpClient: HttpClient) {}
}
