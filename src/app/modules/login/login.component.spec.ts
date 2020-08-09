import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { routes } from '../../app-routing.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule.withRoutes(routes), ReactiveFormsModule],
      providers: [AuthenticationService, FormBuilder]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "home" if authenticated',
      inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
          spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);
          spyOn(router, 'navigate').and.callThrough();
          component.ngOnInit();
          expect(router.navigate).toHaveBeenCalledWith(['home']);
      })
  );

  it('should not navigate to /home if not authenticated',
      inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
          spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);
          spyOn(router, 'navigate').and.callThrough();
          component.ngOnInit();
          expect(router.navigate).not.toHaveBeenCalledWith(['home']);
      })
  );
});
