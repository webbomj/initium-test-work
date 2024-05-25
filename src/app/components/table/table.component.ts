import { Component } from '@angular/core';
import { ClientsStoreService } from 'src/app/store/clients-store.service';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {SelectionModel} from '@angular/cdk/collections';
import { Client } from 'src/app/api/types/clients.types';
import { PlusComponent } from '../buttons/icon-button/icon-button.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatButtonToggleModule, NgFor, MatTableModule,  MatCheckboxModule, PlusComponent, ],
  providers: [ClientsStoreService],
})
export class TableComponent {

  // constructor(private clientStoreService: ClientsStoreService) {}
  displayedColumns: string[] = ['select', 'name', 'surname', 'email', 'phone'];
  dataSource = new MatTableDataSource<Client>(CLIENTS);
  selection = new SelectionModel<Client>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
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

  addClient() {
    console.log('вызов модалки с добавлением клиента')
  }

  deleteClients() {
    console.log('вызов модалки с удалением выбранных клиентов')
    console.log(this.selection)
    console.log(this.selection.selected)
  }

  editClient(client: Client) {
    console.log('вызов модалки с редактированием клиента')
    console.log(this.selection)
    console.log(client)
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const CLIENTS: Client[] = [
  {email: 'petrov@mail.ru', name: "Александр", surname: "Петров", phone:"+79061856195"},
  {email: 'asdasd@Asdasd1.ru', name: "Алыфвыфвыфвфыв1", surname: "sadasdsadsadsadDsAD2", phone:"+7927624664"},
  {email: 'asdasd@Asdasd2.ru', name: "Алыфвыфвыфвфыв2", surname: "sadasdsadsadsadDsAD3", phone:"+7927624665"},
  {email: 'asdasd@Asdasd3.ru', name: "Алыфвыфвыфвфыв3", surname: "sadasdsadsadsadDsAD4", phone:"+7927624666"},
  {email: 'asdasd@Asdasd4.ru', name: "Алыфвыфвыфвфыв4", surname: "sadasdsadsadsadDsAD5", phone:"+7927624667"},
  {email: 'asdasd@Asdasd5.ru', name: "Алыфвыфвыфвфыв5", surname: "sadasdsadsadsadDsAD6", phone:"+7927624668"},
  {email: 'asdasd@Asdasd6.ru', name: "Алыфвыфвыфвфыв6", surname: "sadasdsadsadsadDsAD7", phone:"+7927624669"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd.ru', name: "Алыфвыфвыфвфыв", surname: "sadasdsadsadsadDsAD1", phone:"+7927624663"},
  {email: 'asdasd@Asdasd1.ru', name: "Алыфвыфвыфвфыв1", surname: "sadasdsadsadsadDsAD2", phone:"+7927624664"},
  {email: 'asdasd@Asdasd2.ru', name: "Алыфвыфвыфвфыв2", surname: "sadasdsadsadsadDsAD3", phone:"+7927624665"},
  {email: 'asdasd@Asdasd3.ru', name: "Алыфвыфвыфвфыв3", surname: "sadasdsadsadsadDsAD4", phone:"+7927624666"},
  {email: 'asdasd@Asdasd4.ru', name: "Алыфвыфвыфвфыв4", surname: "sadasdsadsadsadDsAD5", phone:"+7927624667"},
  {email: 'asdasd@Asdasd5.ru', name: "Алыфвыфвыфвфыв5", surname: "sadasdsadsadsadDsAD6", phone:"+7927624668"},
  {email: 'asdasd@Asdasd6.ru', name: "Алыфвыфвыфвфыв6", surname: "sadasdsadsadsadDsAD7", phone:"+7927624669"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"},
  {email: 'asdasd@Asdasd7.ru', name: "Алыфвыфвыфвфыв7", surname: "sadasdsadsadsadDsAD8", phone:"+7927624660"}
];
