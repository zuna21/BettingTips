import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmations-dialog',
  templateUrl: './confirmations-dialog.component.html',
  styleUrls: ['./confirmations-dialog.component.css']
})
export class ConfirmationsDialogComponent {
  question: string = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.question = data.question;
  }


  onYes() {
    this.dialogRef.close(true);
  }

  onNo() {
    this.dialogRef.close(false);
  }
  
}
