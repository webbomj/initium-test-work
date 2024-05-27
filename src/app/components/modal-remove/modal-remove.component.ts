import { Component, inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ButtonComponent } from '../buttons/primary-button/button.component';


@Component({
  selector: 'app-modal-remove',
  templateUrl: './modal-remove.component.html',
  styleUrls: ['./modal-remove.component.scss'],
  standalone: true,
  imports: [ModalComponent, MatDialogModule, ButtonComponent],
})
export class ModalRemoveComponent {

  data: {count: number} = inject(MAT_DIALOG_DATA)
  
  constructor(public dialogRef: MatDialogRef<ModalRemoveComponent>) {}

  protected removeClients() {
    this.dialogRef.close(true)
  }
}
