import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../login/login-routing.module';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class MockRouter {
      navigate() { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [
          AuthenticationService, { provide: Router, useClass: MockRouter }, FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home if authenticated',
      inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
          spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
          spyOn(router, 'navigate').and.callThrough();
          component.ngOnInit();
          expect(router.navigate).toHaveBeenCalledWith(['/home']);
      })
  );

  it('should not navigate to /home if not authenticated',
      inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
          spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
          spyOn(router, 'navigate').and.callThrough();
          component.ngOnInit();
          expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
      })
  );
});
