import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountActivationService } from '../../services/account-activation/account-activation.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountActivationService: AccountActivationService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const emailAddress: string = params['emailAddress'];
      const activationCode: string = params['activationCode'];

      this.accountActivationService.activateAccount(emailAddress, activationCode).subscribe(() => {
        this.loading = false;
      });
    });
  }

  onSubmit(): void {
    this.router.navigate(['']);
  }
}
