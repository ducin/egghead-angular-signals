import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersHTTPService {
  #http = inject(HttpClient);

  getUsers() {
    return this.#http.get<User[]>(`https://jsonplaceholder.typicode.com/users`);
  }
}
