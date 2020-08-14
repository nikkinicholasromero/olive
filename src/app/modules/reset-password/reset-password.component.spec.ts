import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '../../app-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { FormFieldComponent } from 'src/app/components/form-field/form-field.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent,FormFieldComponent],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [FormBuilder]
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

  it('should navigate to root when submit is clicked',
      inject([Router], (router: Router) => {
          spyOn(router, 'navigate').and.callThrough();
          component.onSubmit();
          expect(router.navigate).toHaveBeenCalledWith(['']);
      })
  );
});
