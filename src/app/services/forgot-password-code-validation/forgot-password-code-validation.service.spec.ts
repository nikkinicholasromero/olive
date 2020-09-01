import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ForgotPasswordCodeValidation } from './forgot-password-code-validation.service';

describe('ForgotPasswordCodeValidation', () => {
  let service: ForgotPasswordCodeValidation;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ForgotPasswordCodeValidation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.put method',
    inject([HttpClient], (httpClient: HttpClient) => {
      spyOn(httpClient, 'get');

      const url: string = "http://localhost:8080/forgotPassword/someEmail@address.com?forgotPasswordCode=someForgotPasswordCode";

      service.validateForgotPasswordCode("someEmail@address.com", "someForgotPasswordCode");

      expect(httpClient.get).toHaveBeenCalledWith(url);
    })
  );
});
