import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators/custom-validators';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { ForgotPasswordCodeValidation } from '../../services/forgot-password-code-validation/forgot-password-code-validation.service';
import { ErrorData } from '../../components/alerts/error/error-data';
import { ResetPasswordRequest } from '../../models/reset-password-request';
import { ResetPasswordService } from '../../services/reset-password/reset-password.service';
import { SuccessData } from '../../components/alerts/success/success-data';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['']
  },{ 
    validators: CustomValidators.customPasswordValidator
  });
  loading: boolean = true;
  forgotPasswordCodeValidationError: boolean = false;

  errorData: ErrorData = {
    title: "Something went wrong",
    text: "Server is not responding right now. Please try again later.",
    okCallback: () => {
      this.router.navigate(['']);
    }
  };

  emailAddress: string = "";
  forgotPasswordCode: string = "";

  resetPasswordSuccessful: boolean = false;

  successData: SuccessData = {
    title: "Reset Password Successful",
    text: "You may now login using your new password. ",
    okCallback: () => { 
      this.router.navigate(['']);
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private forgotPasswordCodeValidation: ForgotPasswordCodeValidation,
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private router: Router,
    private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.emailAddress = params['emailAddress'];
      this.forgotPasswordCode = params['forgotPasswordCode'];

      this.forgotPasswordCodeValidation.validateForgotPasswordCode(this.emailAddress, this.forgotPasswordCode)
        .pipe(catchError(this.handleError<any>()))
        .subscribe(() => {
          this.loading = false;
        });
    });
  }

  onSubmit(): void {
    this.formValidationService.validateForm(this.form);

    if (this.form.disabled) {
      const resetPasswordRequest: ResetPasswordRequest = {
          emailAddress: this.emailAddress,
          forgotPasswordCode: this.forgotPasswordCode,
          newPassword: this.form.controls['password'].value
      }

      this.loading = true;
      this.resetPasswordService.resetPassword(resetPasswordRequest)
        .pipe(catchError(this.handleError<any>()))
        .subscribe((data) => {
          if (data !== undefined) {
            this.resetPasswordSuccessful = true;
          }

          this.loading = false;
        });
    }
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.forgotPasswordCodeValidationError = true;
      return of(result as T);
    };
  }
}
