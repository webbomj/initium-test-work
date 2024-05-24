import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {  ClientServiceResponse } from './types/clients.types';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private BASE_URL = 'https://test-data.directorix.cloud/task1'

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<ClientServiceResponse>(this.BASE_URL).pipe(
      map((response) => this.serialize(response))
    )
  }

  private serialize(data: ClientServiceResponse) {
    return data.users
  }

}
