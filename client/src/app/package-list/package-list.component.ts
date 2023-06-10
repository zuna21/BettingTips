import { Component, OnInit, inject } from '@angular/core';
import { PackageService } from '../_services/package.service';
import { take } from 'rxjs';
import { Package } from '../_interfaces/package';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationsDialogComponent } from '../_components/confirmations-dialog/confirmations-dialog.component';
import { AccountService } from '../_services/account.service';
import { User } from '../_interfaces/user';
import { createConfirmDialog } from '../_functions/createConfirmDialog.function';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
  public packageService: PackageService = inject(PackageService);
  private dialog: MatDialog = inject(MatDialog);
  private accountService: AccountService = inject(AccountService);
  private router: Router = inject(Router);
  
  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.packageService.getAllPackages().pipe(take(1))
      .subscribe({
        next: packagesAll => this.packageService.setAllPackages(packagesAll)
      });
  }

  selectedPackageDialog(selectedPackage: Package) {
    const question: string = `Are you sure you want this package? Your previous will be lost!`;

    const dialogRef = this.dialog.open(ConfirmationsDialogComponent, createConfirmDialog(question));
    dialogRef.afterClosed().pipe(take(1))
      .subscribe({
        next: (response: boolean) =>{
          if (!response) return;
          this.selectedPackage(selectedPackage);
        }
      });
  }

  selectedPackage(selectedPackage: Package) {
    this.accountService.selectNewPackage(selectedPackage).pipe(take(1))
      .subscribe({
        next: (userWithNewPackage: User) => {
          // najbolje ga je na login poslati jer nemam jos rjesenje kako
          // update uraditi u nav-dropdown

          localStorage.removeItem('userToken');
          this.accountService.setUser(null);
          this.router.navigateByUrl('/login');
        }
      });
  }

}
