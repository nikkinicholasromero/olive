import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = this.formBuilder.group({
    emailAddress: [''],
    password: [''],
    confirmPassword: [''],
    firstName: [''],
    lastName: ['']
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    this.router.navigate(['/']);
  }
}
