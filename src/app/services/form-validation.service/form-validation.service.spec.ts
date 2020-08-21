import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from './form-validation.service';

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not disable form if form is invalid', () => {
    let form: FormGroup = new FormGroup({
      emailAddress: new FormControl(''),
      password: new FormControl('', [Validators.required])
    });

    service.validateForm(form);
    
    expect(form.enabled).toBeTrue();
  });

  it('should disable form if form is invalid', () => {
    let form: FormGroup = new FormGroup({
      emailAddress: new FormControl('someEmail@address.com'),
      password: new FormControl('password', [Validators.required])
    });

    service.validateForm(form);
    
    expect(form.enabled).toBeFalse();
  });
});