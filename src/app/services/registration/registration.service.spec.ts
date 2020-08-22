import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegistrationService } from './registration.service';
import { UserAccount } from '../../models/user-account';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(RegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.post method',
    inject([HttpClient], (httpClient: HttpClient) => {
      spyOn(httpClient, 'post');

      const url: string = "http://localhost:8080/registration";

      const userAccount: UserAccount = {
        emailAddress: "someEmail@address.com",
        password: "somePassword",
        firstName: "someFirstName",
        lastName: "someLastname"
      };

      service.register(userAccount);

      expect(httpClient.post).toHaveBeenCalledWith(url, userAccount, jasmine.any(Object));
    })
  );
});
