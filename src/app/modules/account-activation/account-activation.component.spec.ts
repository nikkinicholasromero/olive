import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../../app-routing.module';
import { AccountActivationComponent } from './account-activation.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { AccountActivationService } from '../../services/account-activation/account-activation.service';
import { LoadingOverlayComponent } from '../../components/loading-overlay/loading-overlay.component';

describe('AccountActivationComponent', () => {
    let component: AccountActivationComponent;
    let fixture: ComponentFixture<AccountActivationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountActivationComponent, FormFieldComponent, LoadingOverlayComponent],
            imports: [RouterTestingModule.withRoutes(routes), HttpClientModule],
            providers: [AccountActivationService, {
                provide: ActivatedRoute,
                useValue: {
                    queryParams: of({ "emailAddress": "someEmail@address.com", "activationCode": "someActivationCode" })
                },
            },]
        }).compileComponents();
    }));

    it('should show successful message when accountActivationService does not throw error',
        inject([AccountActivationService], (accountActivationService: AccountActivationService) => {
            spyOn(accountActivationService, 'activateAccount').and.returnValue(of(null));
            fixture = TestBed.createComponent(AccountActivationComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
            expect(component.header).toEqual("Account Activated");
            expect(component.message).toEqual("You may now log in using your account.");
            expect(component.loading).toBeFalse();
            expect(accountActivationService.activateAccount).toHaveBeenCalledWith('someEmail@address.com', 'someActivationCode');
        })
    );

    it('should show failure message when accountActivationService does not throw error',
        inject([AccountActivationService], (accountActivationService: AccountActivationService) => {
            spyOn(accountActivationService, 'activateAccount').and.callFake(() => {
                const error: any = {
                    status: 400,
                    error: { errors: [{ message: "Some server error message" }] }
                };
                return throwError(error);
            });
            fixture = TestBed.createComponent(AccountActivationComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
            expect(component.header).toEqual("Activation Failed");
            expect(component.message).toEqual("Some server error message");
            expect(component.loading).toBeFalse();
            expect(accountActivationService.activateAccount).toHaveBeenCalledWith('someEmail@address.com', 'someActivationCode');
        })
    );

    it('should show failure message when accountActivationService does not throw error',
        inject([AccountActivationService], (accountActivationService: AccountActivationService) => {
            spyOn(accountActivationService, 'activateAccount').and.callFake(() => {
                const error: any = {
                    status: 500,
                    error: { errors: [{ message: "Some server error message" }] }
                };
                return throwError(error);
            });
            fixture = TestBed.createComponent(AccountActivationComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
            expect(component.header).toEqual("Activation Failed");
            expect(component.message).toEqual("Server is not responding right now. Please try again later.");
            expect(component.loading).toBeFalse();
            expect(accountActivationService.activateAccount).toHaveBeenCalledWith('someEmail@address.com', 'someActivationCode');
        })
    );

    it('should navigate to root when submit is clicked',
        inject([AccountActivationService, Router], (accountActivationService: AccountActivationService, router: Router) => {
            spyOn(accountActivationService, 'activateAccount').and.returnValue(of(null));
            spyOn(router, 'navigate');
            fixture = TestBed.createComponent(AccountActivationComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            component.onSubmit();
            expect(router.navigate).toHaveBeenCalledWith(['']);
        })
    );
});
