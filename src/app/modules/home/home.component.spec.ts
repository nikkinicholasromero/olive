import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  class MockRouter {
    navigate() { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        AuthenticationService, { provide: Router, useClass: MockRouter }
      ]
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

  it('should navigate to /login when logout() is called',
    inject([AuthenticationService, Router], (authenticationService: AuthenticationService, router: Router) => {
      spyOn(authenticationService, 'logout').and.callThrough();
      spyOn(router, 'navigate').and.callThrough();
      component.logout();
      expect(authenticationService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    })
  );
});
