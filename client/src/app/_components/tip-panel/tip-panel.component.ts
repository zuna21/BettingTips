import { Component, Input } from '@angular/core';
import { Tip } from 'src/app/_interfaces/tip';

@Component({
  selector: 'app-tip-panel',
  templateUrl: './tip-panel.component.html',
  styleUrls: ['./tip-panel.component.css']
})
export class TipPanelComponent {
  @Input() tip: Tip | undefined;

}
