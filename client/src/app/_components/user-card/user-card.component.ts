import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/_interfaces/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: User | undefined;
  @Output() approvedUser = new EventEmitter();

  onApproveUser() {
    this.approvedUser.next(this.user);  
  }
}
