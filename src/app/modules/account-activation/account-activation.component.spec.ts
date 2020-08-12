import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { AccountActivationComponent } from './account-activation.component';

describe('AccountActivationComponent', () => {
    let component: AccountActivationComponent;
    let fixture: ComponentFixture<AccountActivationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountActivationComponent],
            imports: [RouterTestingModule.withRoutes(routes)]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountActivationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to root when submit is clicked',
        inject([Router], (router: Router) => {
            spyOn(router, 'navigate').and.callThrough();
            component.onSubmit();
            expect(router.navigate).toHaveBeenCalledWith(['']);
        })
    );
});
