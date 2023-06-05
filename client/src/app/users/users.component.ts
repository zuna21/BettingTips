import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../_services/user.service';
import { BehaviorSubject, take } from 'rxjs';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private userService: UserService = inject(UserService);
 
  private unsubscriptionUsers = new BehaviorSubject<User[]>([]);
  unsubscriptionUsers$ = this.unsubscriptionUsers.asObservable();

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUnsubscriptionUsers().pipe(take(1))
      .subscribe({
        next: users => this.unsubscriptionUsers.next(users)
      });
  }

  upprovedUser(user: User) {
    this.userService.approveUser(user).pipe(take(1))
      .subscribe({
        next: successUser => {
          const currentUsers = this.unsubscriptionUsers.getValue();
          const updatedUsers = currentUsers.filter(x => x.id !== successUser.id);
          this.unsubscriptionUsers.next(updatedUsers);
        }
      });
  }
}
