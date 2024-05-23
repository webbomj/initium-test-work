import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, NgIf],
})
export class InputComponent {
  @Input({required: true})
  control!: FormControl
  

  @Input({required: true})
  label!: string

  @Input({required: true})
  error!: string

}
