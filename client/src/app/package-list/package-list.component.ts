import { Component, OnInit, inject } from '@angular/core';
import { PackageService } from '../_services/package.service';
import { take } from 'rxjs';
import { Package } from '../_interfaces/package';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationsDialogComponent } from '../_components/confirmations-dialog/confirmations-dialog.component';
import { AccountService } from '../_services/account.service';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
  public packageService: PackageService = inject(PackageService);
  private dialog: MatDialog = inject(MatDialog);
  private accountService: AccountService = inject(AccountService);
  
  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.packageService.getAllPackages().pipe(take(1))
      .subscribe({
        next: packagesAll => this.packageService.setAllPackages(packagesAll)
      });
  }

  selectedPackage(selectedPackage: Package) {
    const dialogConfig = new MatDialogConfig();
    const question: string = `Are you sure you want this package? Your previous will be lost!`;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      question: question
    };

    const dialogRef = this.dialog.open(ConfirmationsDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(take(1))
      .subscribe({
        next: (response: boolean) =>{
          if (!response) return;
          this.accountService.selectNewPackage(selectedPackage).pipe(take(1))
            .subscribe({
              next: (userWithNewPackage: User) => {
                localStorage.removeItem('userToken');
                localStorage.setItem('userToken', JSON.stringify(userWithNewPackage.token));
                this.accountService.setUser(userWithNewPackage);
              }
            });
        }
      });
  }

}
