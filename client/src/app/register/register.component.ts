import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../_services/package.service';
import { Package } from '../_interfaces/package';
import { take } from 'rxjs';
import { UserCreate } from '../_interfaces/userCreate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private router: Router = inject(Router);
  private accountService: AccountService = inject(AccountService);
  private fb: FormBuilder = inject(FormBuilder);
  private packageService: PackageService = inject(PackageService);

  registerUserForm: FormGroup | undefined;
  packages: Package[] = [];
  userToRegister: UserCreate = {
    username: '',
    email: '',
    password: '',
    package: null
  }

  ngOnInit(): void {
    if (this.accountService.getUser()) this.router.navigateByUrl('/home');
    this.initializeForm();
    this.loadPackages();
  }

  initializeForm() {
    this.registerUserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loadPackages() {
    this.packageService.getAllPackages().pipe(take(1))
      .subscribe({
        next: packages => this.packages = packages
      });
  }


  onRegister() {
    if (this.registerUserForm.invalid) return;
    this.userToRegister.username = this.registerUserForm.value.username;
    this.userToRegister.email = this.registerUserForm.value.email;
    this.userToRegister.password = this.registerUserForm.value.password;

    this.accountService.register(this.userToRegister).pipe(take(1))
      .subscribe({
        next: user => {
          this.accountService.setUser(user);
          this.accountService.setUserToLocalStorage(user);
          this.router.navigateByUrl('/waiting');
        }
      })
  }

  onSelectPackage(e, packageSelected: Package) {
    if (e.target.checked)
      this.userToRegister.package = packageSelected;
  }

}
