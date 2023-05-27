import { Component, Input } from '@angular/core';
import { Package } from 'src/app/_interfaces/package';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.css']
})
export class PackageCardComponent {
  @Input() package: Package | undefined;

}
