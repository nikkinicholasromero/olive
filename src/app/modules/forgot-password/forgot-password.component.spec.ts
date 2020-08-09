import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [AuthenticationService,FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "home" if authenticated',
      inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
          spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
          spyOn(router, 'navigate').and.callThrough();
          component.ngOnInit();
          expect(router.navigate).toHaveBeenCalledWith(['home']);
      })
  );

  it('should not navigate to "home" if not authenticated',
      inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
          spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
          spyOn(router, 'navigate').and.callThrough();
          component.ngOnInit();
          expect(router.navigate).not.toHaveBeenCalledWith(['home']);
      })
  );

  it('should navigate to root when submit is clicked',
      inject([Router], (router: Router) => {
          spyOn(router, 'navigate').and.callThrough();
          component.onSubmit();
          expect(router.navigate).toHaveBeenCalledWith(['']);
      })
  );
});
