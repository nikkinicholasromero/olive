import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { routes } from '../../app-routing.module';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationComponent],
            imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
            providers: [AuthenticationService, FormBuilder]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to /home if authenticated',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
            spyOn(router, 'navigate').and.callThrough();
            component.ngOnInit();
            expect(router.navigate).toHaveBeenCalledWith(['home']);
        })
    );

    it('should not navigate to /home if not authenticated',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
            spyOn(router, 'navigate').and.callThrough();
            component.ngOnInit();
            expect(router.navigate).not.toHaveBeenCalledWith(['home']);
        })
    );

    it('should navigate to root when submit is clicked',
        inject([Router], (router: Router) => {
            spyOn(router, 'navigate').and.callThrough();
            component.onSubmit();
            expect(router.navigate).toHaveBeenCalledWith(['']);
        })
    );
});
