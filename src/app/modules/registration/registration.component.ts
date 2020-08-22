import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../validators/custom-validators/custom-validators';
import { FormValidationService } from '../../services/form-validation/form-validation.service';
import { SuccessData } from '../../components/alerts/success/success-data';
import { RegistrationService } from '../../services/registration/registration.service';
import { UserAccount } from '../../models/user-account';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  }, {
    validators: CustomValidators.customPasswordValidator
  });

  registrationSuccessful: boolean = false;

  successData: SuccessData = {
    title: "Registration Successful",
    text: "You will receive an email shortly. Use that to activate your account. ",
    okCallback: () => this.router.navigate(['/login'])
  };

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private router: Router,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formValidationService.validateForm(this.form);

    if (this.form.disabled) {
      const userAccount: UserAccount = {
        emailAddress: this.form.controls['emailAddress'].value,
        password: this.form.controls['password'].value,
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value
      };

      this.registrationService.register(userAccount).subscribe(() => {
        this.registrationSuccessful = true;
      });
    }
  }
}
