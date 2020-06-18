import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Para atualizar a view com as variáveis recebidas
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
    // Para fechar a mensagem e retornar true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Para fechar a mensagem e retornar false
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
  constructor(public title: string, public message: string) { }
}
