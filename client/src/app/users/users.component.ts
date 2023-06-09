import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../_services/user.service';
import { BehaviorSubject, map, take } from 'rxjs';
import { User } from '../_interfaces/user';
import { AccountService } from '../_services/account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../_components/edit-user-dialog/edit-user-dialog.component';
import { UserEdit } from '../_interfaces/userEdit';
import { ConfirmationsDialogComponent } from '../_components/confirmations-dialog/confirmations-dialog.component';
import { createConfirmDialog } from '../_functions/createConfirmDialog.function';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private accountService: AccountService = inject(AccountService);
  private dialog: MatDialog = inject(MatDialog);
 
  private allUsers = new BehaviorSubject<User[]>([]);
  private selectedUsers = new BehaviorSubject<User[]>([]);

  allUsers$ = this.allUsers.asObservable();
  selectedUsers$ = this.selectedUsers.asObservable();

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().pipe(
      take(1),
      map(users => {
        const currentUser = this.accountService.getUser();
        return users.filter(x => x.id !== currentUser.id)     // da ne vidimo sami sebe (current user)
      })
      )
      .subscribe({
        next: allUsers => {
          this.allUsers.next(allUsers);
          this.selectedUsers.next(allUsers);
        }
      });
  }

  onAllUsers() {
    const allCurrentUsers = this.allUsers.getValue();
    this.selectedUsers.next(allCurrentUsers);
  }

  onSubscribedUsers() {
    const allCurrentUsers = this.allUsers.getValue();
    const allSubscibedUsers = allCurrentUsers.filter(x => x.hasSubscription === true);
    this.selectedUsers.next(allSubscibedUsers);
  }

  onUnsubscribedUsers() {
    const allCurrentUsers = this.allUsers.getValue();
    const allUnsubscribedUsers = allCurrentUsers.filter(x => x.hasSubscription === false);
    this.selectedUsers.next(allUnsubscribedUsers);
  }

  upprovedUser(user: User) {
    this.userService.approveUser(user).pipe(take(1))
      .subscribe({
        next: _ => {
          this.loadUsers()
        }
      });
  }

  deleteUserDialog(user: User) {
    const question: string = `Are you sure you want to delete user: ${user.username}?`;

    const dialogRef = this.dialog.open(ConfirmationsDialogComponent, createConfirmDialog(question));
    dialogRef.afterClosed().pipe(take(1))
      .subscribe({
        next: (response: boolean) => {
          if (!response) return;
          this.deleteUser(user.id);
        }
      });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).pipe(take(1))
      .subscribe({
        next: _ => {
          const allUsersCurrentValue = this.allUsers.getValue();
          const allUsersCurrentValueUpdated = allUsersCurrentValue.filter(x => x.id !== userId);
          this.allUsers.next(allUsersCurrentValueUpdated);

          const selectedUsersCurrentValue = this.selectedUsers.getValue();
          const selectedUsersCurrentValueUpdated = selectedUsersCurrentValue.filter(x => x.id !== userId);
          this.selectedUsers.next(selectedUsersCurrentValueUpdated);
        }
      });
  }

  editUserDialog(user: User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      user: user
    };

    const dialogRef = this.dialog.open(EditUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe({
      next: newPassword => {
        if (!newPassword) return;

        const newUserValeu: UserEdit = {
          username: user.username,
          email: user.email,
          password: newPassword.password
        };
        this.editUser(user, newUserValeu);
      }
    });
  }

  editUser(user: User, newUserValue: UserEdit) {
    this.userService.editUser(user, newUserValue).pipe(take(1))
      .subscribe({
        next: (user: User) => {
          const allUsersCurrentValue = this.allUsers.getValue();
          let allUsersCurrentValueUpdated = allUsersCurrentValue.filter(x => x.id !== user.id);
          allUsersCurrentValueUpdated = [...allUsersCurrentValueUpdated, user];
          this.allUsers.next(allUsersCurrentValueUpdated);

        }
      });
  }
}
