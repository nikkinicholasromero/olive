import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  public validateForm(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsDirty();
      form.controls[key].updateValueAndValidity();
    });

    if (form.valid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsPristine();
        form.controls[key].updateValueAndValidity();
      });

      form.disable();
    }
  }
}