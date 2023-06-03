import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);
  title = 'client';

  ngOnInit(): void {
    this.userLogedIn();
  }

  userLogedIn() {
    if (localStorage.getItem('user')){
      const currentUser = JSON.parse(localStorage.getItem('user'));
      this.accountService.setUserToLocalStorage(currentUser);
      this.accountService.setUser(currentUser);
    } else {
      this.router.navigateByUrl('/login');
    }

  }
}
