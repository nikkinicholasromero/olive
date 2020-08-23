import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
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

    beforeEach(inject([AccountActivationService], (accountActivationService: AccountActivationService) => {
        spyOn(accountActivationService, 'activateAccount').and.returnValue(of(null));
        fixture = TestBed.createComponent(AccountActivationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(accountActivationService.activateAccount).toHaveBeenCalledWith('someEmail@address.com', 'someActivationCode');
        expect(component.loading).toBeFalse();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to root when submit is clicked',
        inject([Router], (router: Router) => {
            spyOn(router, 'navigate');
            component.onSubmit();
            expect(router.navigate).toHaveBeenCalledWith(['']);
        })
    );
});
