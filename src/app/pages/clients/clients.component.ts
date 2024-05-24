import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from 'src/app/components/buttons/primary-button/button.component';
import { PlusComponent } from 'src/app/components/buttons/icon-button/icon-button.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ClientsService } from 'src/app/api/clients.service';
import { ClientsStoreService } from 'src/app/store/clients-store.service';
import { BehaviorSubject } from 'rxjs';
import { Client } from 'src/app/api/types/clients.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, PlusComponent],
  providers: [ClientsService]
})
export class ClientsComponent implements OnInit {

  myForm! : FormGroup;

  userName: FormControl = new FormControl('', [ Validators.email, Validators.required])

  clients$!: BehaviorSubject<Client[]>

  constructor(private clientStore: ClientsStoreService){}

    ngOnInit() {
      this.myForm = new FormGroup({
        "userName": this.userName
      })

      this.clientStore.initClients()

      this.clients$ = this.clientStore.getClients()
     }


    submit() {
      console.log(this.myForm)
    }

    getPlusSVG() {
      return  `
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 26V10H10V26H26ZM25.7778 8C26.3671 8 26.9324 8.23413 27.3491 8.65087C27.7659 9.06762 28 9.63285 28 10.2222V25.7778C28 26.3671 27.7659 26.9324 27.3491 27.3491C26.9324 27.7659 26.3671 28 25.7778 28H10.2222C9.63285 28 9.06762 27.7659 8.65087 27.3491C8.23413 26.9324 8 26.3671 8 25.7778V10.2222C8 8.98889 9 8 10.2222 8H25.7778ZM16.8889 13.5556C16.8889 12.9419 17.3864 12.4444 18 12.4444C18.6137 12.4444 19.1111 12.9419 19.1111 13.5556V16.8889H22.4444C23.0581 16.8889 23.5556 17.3864 23.5556 18C23.5556 18.6137 23.0581 19.1111 22.4444 19.1111H19.1111V22.4444C19.1111 23.0581 18.6137 23.5556 18 23.5556C17.3864 23.5556 16.8889 23.0581 16.8889 22.4444V19.1111H13.5556C12.9419 19.1111 12.4444 18.6137 12.4444 18C12.4444 17.3864 12.9419 16.8889 13.5556 16.8889H16.8889V13.5556Z" fill="#304879"/>
      </svg>
      `;
    }

    getTrashSVG() {
      return  `
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.8406 28C10.3766 28 9.9793 27.8368 9.64883 27.5104C9.31836 27.184 9 26.7917 9 26.3333V11H8.5C7.94772 11 7.5 10.5523 7.5 10C7.5 9.44772 7.94772 9 8.5 9H14.2875C14.2875 8.44772 14.7352 8 15.2875 8H20.7125C21.2648 8 21.7125 8.44772 21.7125 9H27.5C28.0523 9 28.5 9.44772 28.5 10C28.5 10.5523 28.0523 11 27.5 11H27V26.3333C27 26.7778 26.6781 27.1667 26.3406 27.5C26.0031 27.8333 25.6094 28 25.1594 28H10.8406ZM25 11H11V26H25V11ZM14 22.9618C14 23.5073 14.4371 23.9521 14.9825 23.9617C15.5415 23.9715 16 23.521 16 22.9618V13.9621C16 13.4167 15.5629 12.9719 15.0175 12.9623C14.4585 12.9525 14 13.403 14 13.9621V22.9618ZM20 22.9072C20 23.4668 20.4591 23.9174 21.0185 23.9071C21.5635 23.897 22 23.4523 22 22.9072V13.9631C22 13.4036 21.5409 12.9529 20.9815 12.9633C20.4365 12.9734 20 13.4181 20 13.9631V22.9072Z" fill="#304879"/>
      </svg>
      `;
    }
}
