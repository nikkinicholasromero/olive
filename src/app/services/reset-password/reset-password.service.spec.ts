import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordRequest } from '../../models/reset-password-request';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.post method',
    inject([HttpClient], (httpClient: HttpClient) => {
      spyOn(httpClient, 'post');

      const url: string = "http://localhost:8080/password";

      const resetPasswordRequest: ResetPasswordRequest = {
        emailAddress: "someEmail@address.com",
        forgotPasswordCode: "someCode",
        newPassword: "someNewPassword"
      };

      service.resetPassword(resetPasswordRequest);

      expect(httpClient.post).toHaveBeenCalledWith(url, resetPasswordRequest, jasmine.any(Object));
    })
  );
});
