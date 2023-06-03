import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private router: Router = inject(Router);
  private accountService: AccountService = inject(AccountService);

  ngOnInit(): void {
    if (this.accountService.getUser()) this.router.navigateByUrl('/home');
  }

}
