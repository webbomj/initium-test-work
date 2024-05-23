import { ChangeDetectionStrategy, Component,  Input, } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

type buttonType = 'primary' | 'secondary'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
})
export class ButtonComponent {

  @Input() color: buttonType = 'primary'
  @Input() disable: boolean = false
  
}
