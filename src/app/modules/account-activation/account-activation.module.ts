import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountActivationRoutingModule } from './account-activation-routing.module';
import { AccountActivationComponent } from './account-activation.component';

@NgModule({
  imports: [
    CommonModule,
    AccountActivationRoutingModule
  ],
  declarations: [AccountActivationComponent]
})
export class AccountActivationModule { }