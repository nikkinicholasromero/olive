import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountActivationService } from '../../services/account-activation/account-activation.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {
  header: string = "Account Activated";
  message: string = "You may now log in using your account.";
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountActivationService: AccountActivationService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const emailAddress: string = params['emailAddress'];
      const activationCode: string = params['activationCode'];

      this.accountActivationService.activateAccount(emailAddress, activationCode)
        .pipe(catchError(this.handleError<any>()))
        .subscribe(() => {
          this.loading = false;
        });
    });
  }

  onSubmit(): void {
    this.router.navigate(['']);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.header = "Activation Failed";
      this.message = "Server is not responding right now. Please try again later.";

      if (error.status === 400 && error.error.errors[0].message) {
        this.message = error.error.errors[0].message;
      }

      return of(result as T);
    };
  }
}
