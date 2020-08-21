import { inject, TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../services/authentication/authentication.service';

describe('AuthGuard', () => {
    let guard: AuthGuard;

    class MockRouter {
        navigate() { }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            providers: [
                AuthenticationService, { provide: Router, useClass: MockRouter }
            ]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return false and navigate to login if not authenticated and url is "/home"',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            const state: RouterStateSnapshot = { root: null, url: '/home'};
            spyOn(router, 'navigate');
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
            expect(guard.canActivate(null, state)).toBeFalse();
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
            expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
        })
    );

    it('should return true if authenticated and url is "/home"',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            const state: RouterStateSnapshot = { root: null, url: '/home'};
            spyOn(router, 'navigate');
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
            expect(guard.canActivate(null, state)).toBeTrue();
            expect(router.navigate).not.toHaveBeenCalledWith(['/login']);
            expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
        })
    );

    it('should return true if not authenticated and url is "/login"',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            const state: RouterStateSnapshot = { root: null, url: '/login'};
            spyOn(router, 'navigate');
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
            expect(guard.canActivate(null, state)).toBeTrue();
            expect(router.navigate).not.toHaveBeenCalledWith(['/login']);
            expect(router.navigate).not.toHaveBeenCalledWith(['/home']);
        })
    );

    it('should return false and navigate to home if authenticated and url is "/login"',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            const state: RouterStateSnapshot = { root: null, url: '/login'};
            spyOn(router, 'navigate');
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
            expect(guard.canActivate(null, state)).toBeFalse();
            expect(router.navigate).not.toHaveBeenCalledWith(['/login']);
            expect(router.navigate).toHaveBeenCalledWith(['/home']);
        })
    );
});
