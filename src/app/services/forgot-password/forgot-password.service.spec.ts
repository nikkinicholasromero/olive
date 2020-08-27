import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ForgotPasswordService } from './forgot-password.service';

describe('ForgotPasswordService', () => {
  let service: ForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.put method',
    inject([HttpClient], (httpClient: HttpClient) => {
      spyOn(httpClient, 'put');

      const url: string = "http://localhost:8080/forgotPassword/someEmail@address.com";

      service.sendForgotPasswordLink("someEmail@address.com");

      expect(httpClient.put).toHaveBeenCalledWith(url, null);
    })
  );
});
