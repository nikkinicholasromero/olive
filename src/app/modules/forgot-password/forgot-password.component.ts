import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { ForgotPasswordService } from '../../services/forgot-password/forgot-password.service';
import { ErrorData } from '../../components/alerts/error/error-data';
import { SuccessData } from '../../components/alerts/success/success-data';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]]
  });

  loading: boolean = false;
  forgotPasswordSuccessful: boolean = false;
  forgotPasswordError: boolean = false;

  errorData: ErrorData = {
    title: "Forgot Password Failed",
    text: "Server is not responding right now. Please try again later.",
    okCallback: () => {
      this.forgotPasswordError = false;
      this.form.enable();
    }
  };

  successData: SuccessData = {
    title: "Forgot Password Succesful",
    text: "You will receive an email shortly. Use that to reset your password. ",
    okCallback: () => this.router.navigate(['/login'])
  };

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private fogotPasswordService: ForgotPasswordService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formValidationService.validateForm(this.form);

    if (this.form.disabled) {
      const emailAddress = this.form.controls['emailAddress'].value;

      this.loading = true;
      this.fogotPasswordService.sendForgotPasswordLink(emailAddress)
        .pipe(catchError(this.handleError<any>()))
        .subscribe((data) => {
          if (data !== undefined) {
            this.forgotPasswordSuccessful = true;
          }

          this.loading = false;
        });

    }
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.forgotPasswordError = true;
      return of(result as T);
    };
  }
}
