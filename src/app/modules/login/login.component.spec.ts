import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { routes } from '../../app-routing.module';
import { LoginComponent } from './login.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormValidationService } from '../../services/form-validation/form-validation.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, FormFieldComponent],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [AuthenticationService, FormBuilder, FormValidationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate entire form when submit is clicked. should not call authentication and router if form is invalid',
    inject([FormValidationService, AuthenticationService, Router], (formValidationService: FormValidationService, authenticationService: AuthenticationService, router: Router) => {
      spyOn(formValidationService, 'validateForm');
      spyOn(authenticationService, 'authenticate');
      spyOn(router, 'navigate');
      component.form.enable();
      component.onSubmit();
      expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
      expect(authenticationService.authenticate).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    })
  );

  it('should validate entire form when submit is clicked. should call authentication if form is valid. should not call route if authentication failed',
    inject([FormValidationService, AuthenticationService, Router], (formValidationService: FormValidationService, authenticationService: AuthenticationService, router: Router) => {
      spyOn(formValidationService, 'validateForm');
      spyOn(authenticationService, 'authenticate').and.returnValue(false);
      spyOn(router, 'navigate');
      component.form.controls['emailAddress'].setValue("someEmail@address.com");
      component.form.controls['password'].setValue("somePassword");
      component.form.disable();
      component.onSubmit();
      expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
      expect(authenticationService.authenticate).toHaveBeenCalledWith("someEmail@address.com", "somePassword");
      expect(router.navigate).not.toHaveBeenCalled();
    })
  );

  it('should validate entire form when submit is clicked. should call authentication if form is invalid. should not call route if authentication failed',
    inject([FormValidationService, AuthenticationService, Router], (formValidationService: FormValidationService, authenticationService: AuthenticationService, router: Router) => {
      spyOn(formValidationService, 'validateForm');
      spyOn(authenticationService, 'authenticate').and.returnValue(false);
      spyOn(router, 'navigate');
      component.form.controls['emailAddress'].setValue("someEmail@address.com");
      component.form.controls['password'].setValue("somePassword");
      component.form.disable();
      component.onSubmit();
      expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
      expect(authenticationService.authenticate).toHaveBeenCalledWith("someEmail@address.com", "somePassword");
      expect(router.navigate).not.toHaveBeenCalled();
    })
  );

  it('should validate entire form when submit is clicked. should call authentication if form is invalid. should call route if authentication failed',
    inject([FormValidationService, AuthenticationService, Router], (formValidationService: FormValidationService, authenticationService: AuthenticationService, router: Router) => {
      spyOn(formValidationService, 'validateForm');
      spyOn(authenticationService, 'authenticate').and.returnValue(true);
      spyOn(router, 'navigate');
      component.form.controls['emailAddress'].setValue("someEmail@address.com");
      component.form.controls['password'].setValue("somePassword");
      component.form.disable();
      component.onSubmit();
      expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
      expect(authenticationService.authenticate).toHaveBeenCalledWith("someEmail@address.com", "somePassword");
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    })
  );
});
