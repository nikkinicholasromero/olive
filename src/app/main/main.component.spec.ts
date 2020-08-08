import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { MainComponent } from './main.component';
import { AuthenticationService } from '../auth/authentication.service';
import { routes } from '../app-routing.module';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    class MockRouter {
        navigate() { }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent],
            imports: [RouterTestingModule.withRoutes(routes)],
            providers: [
                AuthenticationService, { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to /home if already authenticated',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            spyOn(router, 'navigate').and.callThrough();
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
            component.ngOnInit();
            expect(router.navigate).toHaveBeenCalledWith(['/home']);
        })
    );

    it('should navigate to /login if not authenticated',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            spyOn(router, 'navigate').and.callThrough();
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
            component.ngOnInit();
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        })
    );
});
