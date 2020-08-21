import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormValidationService } from '../../services/form-validation/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formValidationService.validateForm(this.form);

    if (this.form.disabled) {
      const emailAddress: string = this.form.controls['emailAddress'].value;
      const password: string = this.form.controls['password'].value;
      if (this.authenticationService.authenticate(emailAddress, password)) {
        this.router.navigate(['home']);
      }
    }
  }
}
