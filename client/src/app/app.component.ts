import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoadingService } from './_services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);
  loadingService: LoadingService = inject(LoadingService);

  ngOnInit(): void {
    this.loginUser();
  }

  loginUser() {
    const userToken = JSON.parse(localStorage.getItem('userToken'));

    if (!userToken) {
      this.router.navigateByUrl('/login');
    } else {
      this.accountService.getUserByToken().pipe(take(1))
        .subscribe({
          next: user => {
            this.accountService.setUser(user);
            localStorage.setItem('userToken', JSON.stringify(user.token)); // iako do ovoga nikad nece doci jer ako nema ide na login
          }
        });
    }
  }

}
