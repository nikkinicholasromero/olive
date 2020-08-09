import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { routes } from '../../app-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { Router } from '@angular/router';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [AuthenticationService, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
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
          expect(router.navigate).toHaveBeenCalledWith(['home']);
      })
  );

  it('should not navigate to /home if not authenticated',
      inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
          spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
          spyOn(router, 'navigate').and.callThrough();
          component.ngOnInit();
          expect(router.navigate).not.toHaveBeenCalledWith(['home']);
      })
  );
});
