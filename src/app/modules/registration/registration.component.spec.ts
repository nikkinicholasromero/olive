import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { routes } from './registration-routing.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;

    class MockRouter {
        navigate() { }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationComponent],
            imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
            providers: [
                AuthenticationService, { provide: Router, useClass: MockRouter }, FormBuilder
            ]
        })
            .compileComponents();
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
            expect(router.navigate).toHaveBeenCalledWith(['/home']);
        })
    );

    it('should not navigate to /home if not authenticated',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
            spyOn(router, 'navigate').and.callThrough();
            component.ngOnInit();
            expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
        })
    );
});
