import { MatDialogConfig } from "@angular/material/dialog";

export function createConfirmDialog(question: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      question: question
    };

    return dialogConfig;
}