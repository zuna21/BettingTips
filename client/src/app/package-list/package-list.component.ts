import { Component, OnInit, inject } from '@angular/core';
import { PackageService } from '../_services/package.service';
import { BehaviorSubject, take } from 'rxjs';
import { Package } from '../_interfaces/package';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
  public packageService: PackageService = inject(PackageService);
  
  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.packageService.getAllPackages().pipe(take(1))
      .subscribe({
        next: packagesAll => this.packageService.setAllPackages(packagesAll)
      });
  }

}
