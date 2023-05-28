import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { PackageService } from 'src/app/_services/package.service';

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html',
  styleUrls: ['./nav-dropdown.component.css']
})
export class NavDropdownComponent implements OnInit {
  isTipsOpen: boolean = false;
  isDropdownOpen: boolean = false;


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
}
