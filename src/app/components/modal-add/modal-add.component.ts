import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../buttons/primary-button/button.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
  standalone: true,
  imports: [ModalComponent, MatDialogModule, ButtonComponent, InputComponent, ReactiveFormsModule, NgIf, CommonModule],
})
export class ModalAddComponent {

  data: { form: FormGroup, title: string} = inject(MAT_DIALOG_DATA)
  
  constructor(public dialogRef: MatDialogRef<ModalAddComponent>) {}

  protected addClient() {
    if (this.data.form.invalid) {
      return
    }
    this.dialogRef.close(true)
  }

  getControl(name: string) {
    return this.data.form.controls?.[name] as FormControl
  }
}
