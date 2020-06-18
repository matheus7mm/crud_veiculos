import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html'
})
export class MessageDialogComponent {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogModel) {
    // Para atualizar a view com as variáveis recebidas
    this.title = data.title;
    this.message = data.message;
  }

  onDismiss(): void {
    // Para fechar a mensagem
    this.dialogRef.close(false);
  }
}

export class MessageDialogModel {
  constructor(public title: string, public message: string) { }
}
