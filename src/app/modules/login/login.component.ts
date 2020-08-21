import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';

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
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const emailAddress: string = this.form.controls['emailAddress'].value;
    const password: string = this.form.controls['password'].value;
    if (this.authenticationService.authenticate(emailAddress, password)) {
      this.router.navigate(['home']);
    }
  }
}
