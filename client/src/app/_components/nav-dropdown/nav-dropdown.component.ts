import { Component, ElementRef, HostListener, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { Package } from 'src/app/_interfaces/package';
import { AccountService } from 'src/app/_services/account.service';
import { PackageService } from 'src/app/_services/package.service';

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html',
  styleUrls: ['./nav-dropdown.component.css']
})
export class NavDropdownComponent implements OnInit {
  private router: Router = inject(Router);
  private packageService: PackageService = inject(PackageService);
  public accountService: AccountService = inject(AccountService);

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
}
