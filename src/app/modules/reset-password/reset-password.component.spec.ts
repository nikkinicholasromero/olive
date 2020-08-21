import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';
import { FormFieldComponent } from '../../components/form-field/form-field.component';
import { FormValidationService } from '../../services/form-validation.service/form-validation.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent,FormFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder,FormValidationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
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
