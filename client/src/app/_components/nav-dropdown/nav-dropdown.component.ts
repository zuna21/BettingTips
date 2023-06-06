import { Component, ElementRef, HostListener, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { PackageService } from 'src/app/_services/package.service';

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html',
  styleUrls: ['./nav-dropdown.component.css']
})
export class NavDropdownComponent implements OnInit {
  isTipsOpen: boolean = false;
  isDropdownOpen: boolean = false;
  public accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);


  constructor(
    private elementRef: ElementRef,
    public packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.packageService.getAllPackages()
      .pipe(take(1))
      .subscribe({
        next: packages => this.packageService.setPackages(packages)
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
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
