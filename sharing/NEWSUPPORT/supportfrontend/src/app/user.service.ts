
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  issuesid: number;
  Name: string;
  Mobile_number: string;
  Email: string;
  Addresh: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44321/api/values/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }


addUser(user: Omit<User, 'issuesid'>): Observable<User> {
  return this.http.post<User>(this.apiUrl, user);
}

updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/${user.issuesid}`, user);
}

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}