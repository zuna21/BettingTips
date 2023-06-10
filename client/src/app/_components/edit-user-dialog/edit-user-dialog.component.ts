import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/_interfaces/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  user: User
  editUserForm: FormGroup;

  constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.user = data.user;
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.editUserForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.required],
      password: ['', Validators.required]
    });

    this.editUserForm.controls['username'].disable();
    this.editUserForm.controls['email'].disable();
  }

  save() {
    if (!this.editUserForm.valid) return;
    this.dialogRef.close(this.editUserForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
