import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators/custom-validators';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { RegistrationService } from '../../services/registration/registration.service';
import { UserAccount } from '../../models/user-account';
import { ErrorData } from '../../components/alerts/error/error-data';
import { SuccessData } from '../../components/alerts/success/success-data';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  form: FormGroup = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  }, {
    validators: CustomValidators.customPasswordValidator
  });

  loading: boolean = false;
  registrationSuccessful: boolean = false;
  registrationError: boolean = false;

  successData: SuccessData = {
    title: "Registration Successful",
    text: "You will receive an email shortly. Use that to activate your account. ",
    okCallback: () => this.router.navigate(['/login'])
  };

  errorData: ErrorData = {
    title: "Registration Failed",
    text: "",
    okCallback: () => {
      this.registrationError = false;
      this.form.enable();
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private router: Router,
    private registrationService: RegistrationService) { }

  onSubmit(): void {
    this.formValidationService.validateForm(this.form);

    if (this.form.disabled) {
      const userAccount: UserAccount = {
        emailAddress: this.form.controls['emailAddress'].value,
        password: this.form.controls['password'].value,
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value
      };

      this.loading = true;
      this.registrationService.register(userAccount)
        .pipe(catchError(this.handleError<any>()))
        .subscribe((data) => {
          if (data !== undefined) {
            this.registrationSuccessful = true;
          }

          this.loading = false;
        });
    }
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.errorData.text = "Server is not responding right now. Please try again later.";

      if (error.status === 400 && error.error.errors[0].message) {
        this.errorData.text = error.error.errors[0].message;
      }

      this.registrationError = true;

      return of(result as T);
    };
  }
}
