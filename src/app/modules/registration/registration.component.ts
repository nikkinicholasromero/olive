import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { FormValidationService } from '../../services/form-validation.service/form-validation.service';

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
