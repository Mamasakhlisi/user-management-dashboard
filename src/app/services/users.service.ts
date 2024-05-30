import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<IUser[]>(`${this.baseUrl}/users`);
  }
  updateDetails(data: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/users/${data.id}`, data);
  }
}
