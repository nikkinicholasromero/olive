import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [{
    path: '',
    component: MainComponent
}, {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
}, {
    path: 'register',
    loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule)
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
