import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { FormValidationService } from '../../services/form-validation.service/form-validation.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formValidationService.validateForm(this.form);
  }
}
