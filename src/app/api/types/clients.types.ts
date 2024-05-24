export interface ClientServiceResponse  {
    users: Client[]
}

export interface Client {
    name: string;
    surname: string;
    email: string;
    phone: string;
}