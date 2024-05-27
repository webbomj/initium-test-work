import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {SelectionModel} from '@angular/cdk/collections';
import { Client } from 'src/app/api/types/clients.types';
import { PlusComponent } from '../buttons/icon-button/icon-button.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatButtonToggleModule, NgFor, MatTableModule,  MatCheckboxModule, PlusComponent ]
})
export class TableComponent implements OnInit, OnDestroy {

  @Input({required: true}) clients!: BehaviorSubject<Client[]>

  displayedColumns: string[] = ['select', 'name', 'surname', 'email', 'phone'];
  dataSource = new MatTableDataSource<Client>()
  selection = new SelectionModel<Client>(true, []);

  subscribeClientsId!: Subscription

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscribeClientsId = this.clients.subscribe((data) => {
      this.dataSource.data = data
    })
  }

  @Output() onEditClient: EventEmitter<Client> = new EventEmitter()

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  editClient(client: Client) {
    this.onEditClient.emit(client)
  }
  
  ngOnDestroy(): void {
    this.subscribeClientsId.unsubscribe()
  }
}