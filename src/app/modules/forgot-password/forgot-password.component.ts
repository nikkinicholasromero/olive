import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service/form-validation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formValidationService.validateForm(this.form);
  }
}
