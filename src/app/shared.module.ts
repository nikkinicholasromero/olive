import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from './components/form-field/form-field.component';

@NgModule({
  declarations: [FormFieldComponent],
  imports: [ReactiveFormsModule],
  exports: [FormFieldComponent]
})
export class SharedModule { }
