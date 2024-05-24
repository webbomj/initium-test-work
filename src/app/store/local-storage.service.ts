import { Injectable } from '@angular/core';

export const CLIENTS_KEY = 'clients-key'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    constructor() {}

    getData<T>(key: string) {
        const data = localStorage.getItem(key)

        if (data) {
            return JSON.parse(data) as T
        }

        return null
    }

    setData<T>(key: string, data: T) {
        const stingifyData = JSON.stringify(data)

        localStorage.setItem(key, stingifyData)
    }

}
