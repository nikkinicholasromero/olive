import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [{
    path: '',
    component: MainComponent
}, {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
}, {
    path: 'register',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule)
}, {
    path: 'accountActivation',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/account-activation/account-activation.module').then(m => m.AccountActivationModule)
}, {
    path: 'forgotPassword',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
}, {
    path: 'resetPassword',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
}, {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
}, {
    path: '**',
    component: PageNotFoundComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
