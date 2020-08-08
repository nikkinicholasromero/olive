import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }