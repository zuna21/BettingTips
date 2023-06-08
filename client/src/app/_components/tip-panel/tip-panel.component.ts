import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tip } from 'src/app/_interfaces/tip';

@Component({
  selector: 'app-tip-panel',
  templateUrl: './tip-panel.component.html',
  styleUrls: ['./tip-panel.component.css']
})
export class TipPanelComponent {
  @Input() tip: Tip | undefined;
  @Input() canEdit: boolean = false;
  @Output() deleteTip = new EventEmitter<Tip>();

  onDeleteTip() {
    this.deleteTip.emit(this.tip);
  }

}
