import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-dropdown',
  templateUrl: './nav-dropdown.component.html',
  styleUrls: ['./nav-dropdown.component.css']
})
export class NavDropdownComponent {
  isTipsOpen: boolean = false;
  isDropdownOpen: boolean = false;

  constructor(
    private elementRef: ElementRef
  ) {}

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
