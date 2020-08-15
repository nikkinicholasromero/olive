import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {
  private readonly ERROR_MESSAGE_MAP: Map<string, (field: string, errorDetails: any) => string> = new Map([
    ["required", (field: string, errorDetails: any) => `${field} is required`],
    ["email", (field: string, errorDetails: any) => `Please enter a valid email address`]
  ]);

  @Input()
  public readonly parent: FormGroup;

  @Input()
  public readonly fieldName: string;

  @Input()
  public readonly field: FormControl;

  @Input()
  public readonly type: string;

  public fieldId: string;

  constructor() { }

  ngOnInit(): void {
    Object.keys(this.parent.controls).forEach(key => {
      if (this.parent.controls[key] === this.field) {
        this.fieldId = key;
      }
    });
  }

  public hasError(): boolean {
    return this.field.dirty && !this.field.valid;
  }

  public getErrorMessage(): string {
    const errors: ValidationErrors = this.field.errors;
    for (const error in errors) {
      return this.ERROR_MESSAGE_MAP.get(error)(this.fieldName, errors[error]);
    }

    return null;
  }
}
