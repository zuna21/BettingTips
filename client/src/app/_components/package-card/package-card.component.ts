import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Package } from 'src/app/_interfaces/package';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.css']
})
export class PackageCardComponent {
  @Input() package: Package | undefined;
  @Input() canDelete: boolean = false;
  @Output() deletedPackage = new EventEmitter();
  @Output() selectedPackage = new EventEmitter();

  onDelete() {
    this.deletedPackage.emit(this.package);
  }

  onSelect() {
    this.selectedPackage.emit(this.package);
  }
}
