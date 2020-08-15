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

  it('getErrorMessage should return "${fieldName} is required" if ${field} is required ', () => {
    hostComponent.formField.field.setValidators([Validators.required]);
    hostComponent.formField.field.setValue('');
    hostComponent.formField.field.markAsDirty();
    hostComponent.formField.field.updateValueAndValidity();

    expect(hostComponent.formField.getErrorMessage()).toEqual("Password is required");
  });

  it('getErrorMessage should return "Please enter a valid email address" if ${field} is expected to be a valid email address but is not ', () => {
    hostComponent.formField.field.setValidators([Validators.email]);
    hostComponent.formField.field.setValue('asdf');
    hostComponent.formField.field.markAsDirty();
    hostComponent.formField.field.updateValueAndValidity();

    expect(hostComponent.formField.getErrorMessage()).toEqual("Please enter a valid email address");
  });

  it('getErrorMessage should return the appropriate error message', () => {
    hostComponent.formField.field.setValue('somePassword');
    hostComponent.formField.field.markAsDirty();

    expect(hostComponent.formField.getErrorMessage()).toBeNull();
  });
});
