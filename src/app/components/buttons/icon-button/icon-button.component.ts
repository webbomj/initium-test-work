import { Component, Input, OnInit } from '@angular/core';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
})
export class PlusComponent implements OnInit {

  @Input({required: true})
  iconName!: string

  @Input({required: true})
  svgString!: string

  @Input()
  disabled: boolean = false

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.iconRegistry.addSvgIconLiteral(this.iconName, this.sanitizer.bypassSecurityTrustHtml(this.svgString));
  }
}
