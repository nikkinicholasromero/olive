import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { routes } from '../../app-routing.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [AuthenticationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "login" when logout() is called',
    inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
      spyOn(authenticationService, 'logout');
      spyOn(router, 'navigate');
      component.logout();
      expect(authenticationService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['login']);
    })
  );
});
