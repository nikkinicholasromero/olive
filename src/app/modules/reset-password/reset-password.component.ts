import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators/custom-validators';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { ForgotPasswordCodeValidation } from '../../services/forgot-password-code-validation/forgot-password-code-validation.service';
import { ErrorData } from '../../components/alerts/error/error-data';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private forgotPasswordCodeValidation: ForgotPasswordCodeValidation,
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const emailAddress: string = params['emailAddress'];
      const forgotPasswordCode: string = params['forgotPasswordCode'];

      this.forgotPasswordCodeValidation.validateForgotPasswordCode(emailAddress, forgotPasswordCode)
        .pipe(catchError(this.handleError<any>()))
        .subscribe(() => {
          this.loading = false;
        });
    });
  }

  onSubmit(): void {
    this.formValidationService.validateForm(this.form);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.forgotPasswordCodeValidationError = true;
      return of(result as T);
    };
  }
}
