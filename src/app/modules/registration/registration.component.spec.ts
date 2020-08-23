import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../../app-routing.module';
import { RegistrationComponent } from './registration.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { RegistrationService } from '../../services/registration/registration.service';
import { UserAccount } from '../../models/user-account';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let userAccount: UserAccount;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationComponent, FormFieldComponent],
            imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule, HttpClientModule],
            providers: [FormBuilder, FormValidationService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
        component.form.controls['emailAddress'].setValue("someEmail@address.com");
        component.form.controls['password'].setValue("somePassword");
        component.form.controls['firstName'].setValue("someFirstName");
        component.form.controls['lastName'].setValue("someLastname");

        userAccount = {
            emailAddress: component.form.controls['emailAddress'].value,
            password: component.form.controls['password'].value,
            firstName: component.form.controls['firstName'].value,
            lastName: component.form.controls['lastName'].value
        };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate entire form when submit is clicked and not call registration service if form is invalid',
        inject([FormValidationService, RegistrationService], (formValidationService: FormValidationService, registrationService: RegistrationService) => {
            spyOn(formValidationService, 'validateForm');
            spyOn(registrationService, 'register');
            component.form.enable();
            component.onSubmit();
            expect(component.loading).toBeFalse();
            expect(component.registrationSuccessful).toBeFalse();
            expect(component.registrationError).toBeFalse();
            expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
            expect(registrationService.register).not.toHaveBeenCalled();
        })
    );

    it('should validate entire form when submit is clicked and call registration service if form is valid',
        inject([FormValidationService, RegistrationService], (formValidationService: FormValidationService, registrationService: RegistrationService) => {
            spyOn(formValidationService, 'validateForm');
            spyOn(registrationService, 'register').and.returnValue(of(null));
            component.form.disable();
            component.onSubmit();
            expect(component.loading).toBeFalse();
            expect(component.registrationSuccessful).toBeTrue();
            expect(component.registrationError).toBeFalse();
            expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
            expect(registrationService.register).toHaveBeenCalledWith(userAccount);
        })
    );

    it('should validate entire form when submit is clicked and call registration service if form is valid and show server error message if there is an error',
        inject([FormValidationService, RegistrationService], (formValidationService: FormValidationService, registrationService: RegistrationService) => {
            spyOn(formValidationService, 'validateForm');
            spyOn(registrationService, 'register').and.callFake(() => {
                const error: any = {
                    status: 400,
                    error: { errors: [{ message: "Some server error message" }] }
                };
                return throwError(error);
            });
            component.form.disable();
            component.onSubmit();
            expect(component.loading).toBeFalse();
            expect(component.registrationSuccessful).toBeFalse();
            expect(component.registrationError).toBeTrue();
            expect(component.errorData.text).toEqual("Some server error message");
            expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
            expect(registrationService.register).toHaveBeenCalledWith(userAccount);
        })
    );

    it('should validate entire form when submit is clicked and call registration service if form is valid and show default error emssage if there is an error',
        inject([FormValidationService, RegistrationService], (formValidationService: FormValidationService, registrationService: RegistrationService) => {
            spyOn(formValidationService, 'validateForm');
            spyOn(registrationService, 'register').and.callFake(() => {
                const error: any = {
                    status: 500,
                    error: { errors: [{ message: "Some server error message" }] }
                };
                return throwError(error);
            });
            component.form.disable();
            component.onSubmit();
            expect(component.loading).toBeFalse();
            expect(component.registrationSuccessful).toBeFalse();
            expect(component.registrationError).toBeTrue();
            expect(component.errorData.text).toEqual("Server is not responding right now. Please try again later.");
            expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
            expect(registrationService.register).toHaveBeenCalledWith(userAccount);
        })
    );

    it('should navigate to "/login" when successData.okCallback is called',
        inject([Router], (router: Router) => {
            spyOn(router, 'navigate');
            component.successData.okCallback();
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        })
    );

    it('should set registrationError to false and enable form when errorData.okCallback is called', () => {
        component.registrationError = true;
        component.form.disable();
        component.errorData.okCallback();
        expect(component.registrationError).toBeFalse();
        expect(component.form.enabled).toBeTrue();
    });
});
