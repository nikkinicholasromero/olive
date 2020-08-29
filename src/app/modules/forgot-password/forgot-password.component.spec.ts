import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../../app-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { ForgotPasswordService } from 'src/app/services/forgot-password/forgot-password.service';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let emailAddress: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent, FormFieldComponent],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule, HttpClientModule],
      providers: [FormBuilder,FormValidationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.form.controls['emailAddress'].setValue('someValid@email.com');
    emailAddress = component.form.controls['emailAddress'].value;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate entire form when submit is clicked and not call forgot password service if form is invalid',
    inject([FormValidationService, ForgotPasswordService], (formValidationService: FormValidationService, forgotPasswordService: ForgotPasswordService) => {
        spyOn(formValidationService, 'validateForm');
        spyOn(forgotPasswordService, 'sendForgotPasswordLink');
        component.form.enable();
        component.onSubmit();
        expect(component.loading).toBeFalse();
        expect(component.forgotPasswordSuccessful).toBeFalse();
        expect(component.forgotPasswordError).toBeFalse();
        expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
        expect(forgotPasswordService.sendForgotPasswordLink).not.toHaveBeenCalled();
    })
  );

  it('should validate entire form when submit is clicked and call forgot password service if form is valid',
    inject([FormValidationService, ForgotPasswordService], (formValidationService: FormValidationService, forgotPasswordService: ForgotPasswordService) => {
        spyOn(formValidationService, 'validateForm');
        spyOn(forgotPasswordService, 'sendForgotPasswordLink').and.returnValue(of(null));
        component.form.disable();
        component.onSubmit();
        expect(component.loading).toBeFalse();
        expect(component.forgotPasswordSuccessful).toBeTrue();
        expect(component.forgotPasswordError).toBeFalse();
        expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
        expect(forgotPasswordService.sendForgotPasswordLink).toHaveBeenCalledWith(emailAddress);
    })
  );

  it('should validate entire form when submit is clicked and call forgot password service if form is valid and show default error emssage if there is an error',
    inject([FormValidationService, ForgotPasswordService], (formValidationService: FormValidationService, forgotPasswordService: ForgotPasswordService) => {
        spyOn(formValidationService, 'validateForm');
        spyOn(forgotPasswordService, 'sendForgotPasswordLink').and.callFake(() => {
          const error: any = {
              status: 500,
              error: { errors: [{ message: "Some server error message" }] }
          };
          return throwError(error);
        });
        component.form.disable();
        component.onSubmit();
        expect(component.loading).toBeFalse();
        expect(component.forgotPasswordSuccessful).toBeFalse();
        expect(component.forgotPasswordError).toBeTrue();
        expect(component.errorData.text).toEqual("Server is not responding right now. Please try again later.");
        expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
        expect(forgotPasswordService.sendForgotPasswordLink).toHaveBeenCalledWith(emailAddress);
    })
  );

  it('should navigate to "/login" when successData.okCallback is called',
      inject([Router], (router: Router) => {
          spyOn(router, 'navigate');
          component.successData.okCallback();
          expect(router.navigate).toHaveBeenCalledWith(['/login']);
      })
  );

  it('should set forgotPasswordError to false and enable form when errorData.okCallback is called', () => {
      component.forgotPasswordError = true;
      component.form.disable();
      component.errorData.okCallback();
      expect(component.forgotPasswordError).toBeFalse();
      expect(component.form.enabled).toBeTrue();
  });
});
