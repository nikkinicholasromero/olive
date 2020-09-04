import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../../app-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { ForgotPasswordCodeValidation } from '../../services/forgot-password-code-validation/forgot-password-code-validation.service';
import { ResetPasswordService } from '../../services/reset-password/reset-password.service';
import { LoadingOverlayComponent } from '../../components/loading-overlay/loading-overlay.component';
import { ErrorAlertComponent } from 'src/app/components/alerts/error/error-alert.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent, FormFieldComponent, LoadingOverlayComponent, ErrorAlertComponent],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule, HttpClientModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          queryParams: of({ "emailAddress": "someEmail@address.com", "forgotPasswordCode": "someForgotPasswordCode" })
        },
      }, ForgotPasswordCodeValidation, FormBuilder, FormValidationService, ResetPasswordService]
    }).compileComponents();
  }));

  it('should display page when forgotPasswordCodeValidation does not throw an exception', 
    inject([ForgotPasswordCodeValidation], (forgotPasswordCodeValidation: ForgotPasswordCodeValidation) => {
      spyOn(forgotPasswordCodeValidation, 'validateForgotPasswordCode').and.returnValue(of(null));
      fixture = TestBed.createComponent(ResetPasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(component.loading).toBeFalse();
      expect(component.forgotPasswordCodeValidationError).toBeFalse();
    })
  );

  it('should show failure message when forgotPasswordCodeValidation does throws an exception',
    inject([ForgotPasswordCodeValidation], (forgotPasswordCodeValidation: ForgotPasswordCodeValidation) => {
        spyOn(forgotPasswordCodeValidation, 'validateForgotPasswordCode').and.callFake(() => {
            const error: any = {
                status: 400,
                error: { errors: [{ message: "Some server error message" }] }
            };
            return throwError(error);
        });
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component.loading).toBeFalse();
        expect(component.forgotPasswordCodeValidationError).toBeTrue();
    })
  );

  it('should validate entire form when submit is clicked',
    inject([ForgotPasswordCodeValidation, FormValidationService], (forgotPasswordCodeValidation: ForgotPasswordCodeValidation, formValidationService: FormValidationService) => {
      spyOn(forgotPasswordCodeValidation, 'validateForgotPasswordCode').and.returnValue(of(null));
      spyOn(formValidationService, 'validateForm');
      fixture = TestBed.createComponent(ResetPasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      component.onSubmit();
      expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
    })
  );

  it('should display successData when reset password is successful',
    inject([ForgotPasswordCodeValidation, ResetPasswordService, Router], (forgotPasswordCodeValidation: ForgotPasswordCodeValidation, resetPasswordService: ResetPasswordService, router: Router) => {
      spyOn(forgotPasswordCodeValidation, 'validateForgotPasswordCode').and.returnValue(of(null));
      spyOn(resetPasswordService, 'resetPassword').and.returnValue(of(null));
      spyOn(router, 'navigate');
      fixture = TestBed.createComponent(ResetPasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      component.form.controls['password'].setValue('somePassword');
      component.form.disable();
      component.onSubmit();
      expect(component.loading).toBeFalse();
      expect(component.forgotPasswordCodeValidationError).toBeFalse();
      expect(component.resetPasswordSuccessful).toBeTrue();
    })
  );

  it('should display errorData when reset password failed',
    inject([ForgotPasswordCodeValidation, ResetPasswordService, Router], (forgotPasswordCodeValidation: ForgotPasswordCodeValidation, resetPasswordService: ResetPasswordService, router: Router) => {
      spyOn(forgotPasswordCodeValidation, 'validateForgotPasswordCode').and.returnValue(of(null));
      spyOn(resetPasswordService, 'resetPassword').and.callFake(() => {
        const error: any = {
            status: 500,
            error: { errors: [{ message: "Some server error message" }] }
        };
        return throwError(error);
      });
      spyOn(router, 'navigate');
      fixture = TestBed.createComponent(ResetPasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      component.form.controls['password'].setValue('somePassword');
      component.form.disable();
      component.onSubmit();
      expect(component.loading).toBeFalse();
      expect(component.resetPasswordSuccessful).toBeFalse();
      expect(component.forgotPasswordCodeValidationError).toBeTrue();
    })
  );

  it('should route to [""] when errorData.okCallback is called',
    inject([ForgotPasswordCodeValidation, Router], (forgotPasswordCodeValidation: ForgotPasswordCodeValidation, router: Router) => {
      spyOn(forgotPasswordCodeValidation, 'validateForgotPasswordCode').and.returnValue(of(null));
      spyOn(router, 'navigate');
      fixture = TestBed.createComponent(ResetPasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      component.errorData.okCallback();
      expect(component.forgotPasswordCodeValidationError).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['']);
    })
  );

  it('should navigate to [""] when successData.okCallback is called',
      inject([ForgotPasswordCodeValidation, Router], (forgotPasswordCodeValidation: ForgotPasswordCodeValidation, router: Router) => {
          spyOn(forgotPasswordCodeValidation, 'validateForgotPasswordCode').and.returnValue(of(null));  
          spyOn(router, 'navigate');
          fixture = TestBed.createComponent(ResetPasswordComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
          expect(component).toBeTruthy();
          component.successData.okCallback();
          expect(router.navigate).toHaveBeenCalledWith(['']);
      })
  );
});
