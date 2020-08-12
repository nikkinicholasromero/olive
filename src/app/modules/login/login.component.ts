import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    emailAddress: [''],
    password: ['']
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const emailAddress: string = this.loginForm.controls['emailAddress'].value;
    const password: string = this.loginForm.controls['password'].value;
    if (this.authenticationService.authenticate(emailAddress, password)) {
      this.router.navigate(['home']);
    }
  }
}
