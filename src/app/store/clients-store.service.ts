import { Injectable, OnDestroy } from '@angular/core';
import { Client } from '../api/types/clients.types';
import { CLIENTS_KEY, LocalStorageService } from './local-storage.service';
import { ClientsService } from '../api/clients.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsStoreService implements OnDestroy {
  
  private clients$: BehaviorSubject<Client[]>  = new BehaviorSubject([] as Client[])

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
    this.clients$.next(clients)
    this.localStorageService.setData(CLIENTS_KEY, clients)
  }

  ngOnDestroy(): void {
    this.clientSub.unsubscribe()
  }
  
}
