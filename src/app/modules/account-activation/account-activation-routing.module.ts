import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountActivationComponent } from './account-activation.component';

export const routes: Routes = [{
  path: '', component: AccountActivationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountActivationRoutingModule { }