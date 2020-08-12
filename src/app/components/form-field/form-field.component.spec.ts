import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
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
      password: new FormControl([''])
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
});
