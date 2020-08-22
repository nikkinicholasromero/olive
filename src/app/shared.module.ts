import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { SuccessAlertComponent } from './components/alerts/success/success-alert.component';

@NgModule({
  declarations: [FormFieldComponent, SuccessAlertComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [FormFieldComponent, SuccessAlertComponent]
})
export class SharedModule { }
