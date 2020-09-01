import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../login/login-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { ForgotPasswordCodeValidation } from '../../services/forgot-password-code-validation/forgot-password-code-validation.service';
import { LoadingOverlayComponent } from '../../components/loading-overlay/loading-overlay.component';
import { SharedModule } from '../../shared.module';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent, FormFieldComponent, LoadingOverlayComponent],
      imports: [SharedModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes), HttpClientModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          queryParams: of({ "emailAddress": "someEmail@address.com", "forgotPasswordCode": "someForgotPasswordCode" })
        },
      }, ForgotPasswordCodeValidation, FormBuilder, FormValidationService]
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

  it('should route to [""] when errorData.okCallback is called',
    inject([ForgotPasswordCodeValidation], (forgotPasswordCodeValidation: ForgotPasswordCodeValidation) => {
      spyOn(forgotPasswordCodeValidation, 'validateForgotPasswordCode').and.returnValue(of(null));
      fixture = TestBed.createComponent(ResetPasswordComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component).toBeTruthy();
      component.errorData.okCallback();
      expect(component.forgotPasswordCodeValidationError).toBeFalse();
    })
  );
});
