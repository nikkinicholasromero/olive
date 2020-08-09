import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = this.formBuilder.group({
    emailAddress: ['']
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  onSubmit(): void {
    this.router.navigate(['']);
  }

}
