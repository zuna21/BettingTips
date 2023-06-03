import { Component, Input, OnInit } from '@angular/core';
import { Tip } from 'src/app/_interfaces/tip';

@Component({
  selector: 'app-tip-panel',
  templateUrl: './tip-panel.component.html',
  styleUrls: ['./tip-panel.component.css']
})
export class TipPanelComponent implements OnInit {
  @Input() tip: Tip | undefined;


  ngOnInit(): void {
    console.log(this.tip);
  }
}
