import { Injectable, OnDestroy } from '@angular/core';
import { Client } from '../api/types/clients.types';
import { CLIENTS_KEY, LocalStorageService } from './local-storage.service';
import { ClientsService } from '../api/clients.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsStoreService implements OnDestroy {

  private _clients: Client[] = []

  private clients$: BehaviorSubject<Client[]> = new BehaviorSubject([] as Client[])

  private clientSub!: Subscription

  constructor(private localStorageService: LocalStorageService, private clientsService: ClientsService) {}
  
  initClients() {
    const clientsInLocalStorage = this.localStorageService.getData<Client[]>(CLIENTS_KEY)
    if (clientsInLocalStorage) {
      
      this.setClients(clientsInLocalStorage)
      return
    }
    
    this.clientSub =  this.clientsService.getClients()
      .subscribe((data) =>  {
        this.setClients(data)
      })
  }

  getClients() {
    return this.clients$
  }

  private setClients(clients: Client[]) {
    this._clients = clients
    this.clients$.next(clients)
    this.localStorageService.setData(CLIENTS_KEY, clients)
  }

  addClient(client: Client) {
    const newClient = [...this._clients, client]
    this.setClients(newClient)
  }

  editClient(email:string, newClient: Client) {
    const editableClientId = this._clients.findIndex((client) => client.email === email) 
    if (editableClientId >= 0) {
        const newClientsArr = [...this._clients.slice(0, editableClientId), newClient, ...this._clients.slice(editableClientId + 1)]
        this.setClients(newClientsArr)
    }
  }

  deleteClients(arr: Client[]) {
    arr.forEach((el, i) => {
      this._clients = this._clients.filter((client) => client.email !== el.email)
    })
    this.setClients(this._clients)
  }

  ngOnDestroy(): void {
    this.clientSub.unsubscribe()
  }
}
