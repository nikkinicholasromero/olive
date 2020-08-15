import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './components/form-field/form-field.component';

@NgModule({
  declarations: [FormFieldComponent],
  imports: [CommonModule,ReactiveFormsModule],
  exports: [FormFieldComponent]
})
export class SharedModule { }
