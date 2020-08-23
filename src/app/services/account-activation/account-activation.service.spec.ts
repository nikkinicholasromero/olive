import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AccountActivationService } from './account-activation.service';

describe('AccountActivationService', () => {
  let service: AccountActivationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AccountActivationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.put method',
    inject([HttpClient], (httpClient: HttpClient) => {
      spyOn(httpClient, 'put');

      const url: string = "http://localhost:8080/activation/someEmail@address.com?activationCode=someActivationCode";

      service.activateAccount("someEmail@address.com", "someActivationCode");

      expect(httpClient.put).toHaveBeenCalledWith(url, null);
    })
  );
});
