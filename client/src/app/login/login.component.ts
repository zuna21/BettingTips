import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private router: Router = inject(Router);
  private accountService: AccountService = inject(AccountService);
  private toastr: ToastrService = inject(ToastrService);
  
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.accountService.getUser()) this.router.navigateByUrl('/home');
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.accountService.login(this.loginForm.value).pipe(take(1))
      .subscribe({
        next: user => {
          this.accountService.setUser(user);
          localStorage.setItem('userToken', JSON.stringify(user.token));
          this.toastr.success(`Welcome ${this.accountService.getUser().username}`);
          this.router.navigateByUrl('/home');
        }
      });
  }

}
