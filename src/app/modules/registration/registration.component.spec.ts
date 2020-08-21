import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormValidationService } from '../../services/form-validation/form-validation.service';

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationComponent,FormFieldComponent],
            imports: [ReactiveFormsModule],
            providers: [FormBuilder,FormValidationService]
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

    it('should validate entire form when submit is clicked',
        inject([FormValidationService], (formValidationService: FormValidationService) => {
            spyOn(formValidationService, 'validateForm');
            component.onSubmit();
            expect(formValidationService.validateForm).toHaveBeenCalledWith(component.form);
        })
    );
});
