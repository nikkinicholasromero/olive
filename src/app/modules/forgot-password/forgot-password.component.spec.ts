import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormValidationService } from '../../services/form-validation.service/form-validation.service';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent, FormFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder,FormValidationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
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
