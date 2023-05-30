import { Component } from '@angular/core';
import { PackageService } from '../_services/package.service';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent {

  constructor(
    public packageService: PackageService
  ) {}

}
