import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Package } from 'src/app/_interfaces/package';
import { PackageCreate } from 'src/app/_interfaces/packageCreate';
import { PackageService } from 'src/app/_services/package.service';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {
  packageForm: FormGroup;

  constructor(
    public packageService: PackageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPackages();
  }

  initializeForm() {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators. required],
      price: ['', Validators.required]
    });
  }

  loadPackages() {
    this.packageService.getAllPackages().pipe(take(1))
      .subscribe({
        next: packages => this.packageService.setPackages(packages)
      });
  }

  onAddNewPackage() {
    if (this.packageForm.invalid) return;
    const newPackage: PackageCreate = this.packageForm.value;
    this.packageService.addNewPackage(newPackage).pipe(take(1))
      .subscribe({
        next: createdPackage => this.updatePackages(createdPackage)
      });

    this.packageForm.reset();
  }

  updatePackages(currentPackage: Package) {
    const currentPackages = this.packageService.getPackagesStore();
    const updatedPackages = [...currentPackages, currentPackage];
    this.packageService.setPackages(updatedPackages);
  }

  deletedPackage(packageToDelete: Package) {
    this.packageService.deletePackage(packageToDelete.id).pipe(take(1)).subscribe();
    const currentPackages = this.packageService.getPackagesStore();
    const updatedPackages = currentPackages.filter(x => x.id !== packageToDelete.id);
    this.packageService.setPackages(updatedPackages);
  }

}
