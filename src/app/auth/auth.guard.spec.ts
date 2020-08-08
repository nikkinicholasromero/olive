import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { routes } from '../app-routing.module';
import { AuthenticationService } from './authentication.service';

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

    it('should return false and navigate to login if not authenticated',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            spyOn(router, 'navigate').and.callThrough();
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
            expect(guard.canActivate(null, null)).toBeFalse();
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        })
    );

    it('should return true and not navigate to login if authenticated',
        inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
            spyOn(router, 'navigate').and.callThrough();
            spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
            expect(guard.canActivate(null, null)).toBeTrue();
            expect(router.navigate).not.toHaveBeenCalledWith(['/login']);
        })
    );
});
