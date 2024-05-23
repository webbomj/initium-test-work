import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { InputComponent } from 'src/app/components/input/input.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  standalone: true,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class ClientsComponent implements OnInit {

  myForm! : FormGroup;

  userName: FormControl = new FormControl('', [ Validators.email, Validators.required])

    ngOnInit() {
      this.myForm = new FormGroup({
        "userName": this.userName
      })
     }


    submit() {
      console.log(this.myForm)
    }

}
