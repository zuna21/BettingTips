import { Component, ElementRef, HostListener, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { Package } from 'src/app/_interfaces/package';
import { User } from 'src/app/_interfaces/user';
import { UserEdit } from 'src/app/_interfaces/userEdit';
import { AccountService } from 'src/app/_services/account.service';
import { PackageService } from 'src/app/_services/package.service';
import { UserService } from 'src/app/_services/user.service';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html',
  styleUrls: ['./nav-dropdown.component.css']
})
export class NavDropdownComponent implements OnInit {
  private router: Router = inject(Router);
  private packageService: PackageService = inject(PackageService);
  public accountService: AccountService = inject(AccountService);
  private dialog: MatDialog = inject(MatDialog);
  private userService: UserService = inject(UserService);

  private userPackages = new BehaviorSubject<Package[]>([]);
  userPackages$ = this.userPackages.asObservable();
  isTipsOpen: boolean = false;
  isDropdownOpen: boolean = false;



  constructor(
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  public setUserPackage(userPackage: Package) {
    const newUserPackages: Package[] = [];
    newUserPackages.push(userPackage);
    this.userPackages.next(newUserPackages);
  }

  loadPackages() {
    this.packageService.getUserPackages()
      .pipe(take(1))
      .subscribe({
        next: packages => this.userPackages.next(packages)
      });
  }

  onOpenTips() {
    this.isTipsOpen = !this.isTipsOpen;
  }

  onOpenDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
        // clicked outside => close dropdown list
     this.isDropdownOpen = false;
     this.isTipsOpen = false;
     }
  }

  onLogOut() {
    this.accountService.setUser(null);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  onEditProfile() {
    const currentUser = this.accountService.getUser();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      user: currentUser
    };

    const dialogRef = this.dialog.open(EditUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: newPassword => {
        if (!newPassword) return;

        const newUserValeu: UserEdit = {
          username: currentUser.username,
          email: currentUser.email,
          password: newPassword.password
        };
        this.userService.editUser(currentUser, newUserValeu).pipe(take(1))
          .subscribe({
            next: (user: User) => {
              this.accountService.setUser(user);
              localStorage.removeItem('userToken');
              localStorage.setItem('userToken', JSON.stringify(user.token));
            }
          });
      }
    });
  }
}
