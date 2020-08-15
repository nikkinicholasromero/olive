import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  @Component({
    template: `
      <app-form-field
       [type]="'password'" [parent]="formGroup"
       [field]="this.formGroup.controls['password']" [fieldName]="'Password'">
      </app-form-field>`
  })
  class TestHostComponent {
    formField: FormFieldComponent;

    public formGroup: FormGroup = new FormGroup({
      emailAddress: new FormControl(['']),
      password: new FormControl([''], [Validators.required])
    });

    @ViewChild(FormFieldComponent)
    set setFormField(formField: FormFieldComponent) {
      this.formField = formField;
    };
  }

  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormFieldComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent.formField).toBeTruthy();
    expect(hostComponent.formField.fieldId).toEqual('password');
  });

  it('hasError should return true if field is dirty and invalid', () => {
    hostComponent.formField.field.setValue('');
    hostComponent.formField.field.markAsDirty();

    expect(hostComponent.formField.hasError()).toBeTrue();
  });

  it('hasError should return false if field is dirty and valid', () => {
    hostComponent.formField.field.setValue('somePassword');
    hostComponent.formField.field.markAsDirty();

    expect(hostComponent.formField.hasError()).toBeFalse();
  });

  it('hasError should return false if field is not dirty and invalid', () => {
    hostComponent.formField.field.setValue('');
    hostComponent.formField.field.markAsPristine();

    expect(hostComponent.formField.hasError()).toBeFalse();
  });

  it('hasError should return false if field is not dirty and valid', () => {
    hostComponent.formField.field.setValue('somePassword');
    hostComponent.formField.field.markAsPristine();

    expect(hostComponent.formField.hasError()).toBeFalse();
  });

  it('getErrorMessage should return "Password is required" when error is required', () => {
    hostComponent.formField.field.setErrors({ required: true });

    expect(hostComponent.formField.getErrorMessage()).toEqual("Password is required");
  });

  it('getErrorMessage should return "Password should be at least 8 characters long" when error is minLength', () => {
    hostComponent.formField.field.setErrors({ minlength: true });

    expect(hostComponent.formField.getErrorMessage()).toEqual("Password should be at least undefined characters long");
  });

  it('getErrorMessage should return "Please enter a valid email address" when error is email', () => {
    hostComponent.formField.field.setErrors({ email: true });

    expect(hostComponent.formField.getErrorMessage()).toEqual("Please enter a valid email address");
  });

  it('getErrorMessage should return "Passwords does not match" when error is passwordDoesNotMatch', () => {
    hostComponent.formField.field.setErrors({ passwordDoesNotMatch: true });

    expect(hostComponent.formField.getErrorMessage()).toEqual("Passwords does not match");
  });

  it('getErrorMessage should return the appropriate error message', () => {
    hostComponent.formField.field.setValue('somePassword');
    hostComponent.formField.field.markAsDirty();

    expect(hostComponent.formField.getErrorMessage()).toBeNull();
  });
});
