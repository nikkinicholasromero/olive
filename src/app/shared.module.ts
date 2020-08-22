import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { SuccessAlertComponent } from './components/alerts/success/success-alert.component';
import { ErrorAlertComponent } from './components/alerts/error/error-alert.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [FormFieldComponent, SuccessAlertComponent, ErrorAlertComponent, LoadingOverlayComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [FormFieldComponent, SuccessAlertComponent, ErrorAlertComponent, LoadingOverlayComponent]
})
export class SharedModule { }
