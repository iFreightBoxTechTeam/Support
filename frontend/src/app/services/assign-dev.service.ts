import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignDev } from '../models/assign-dev.model';


@Injectable({
  providedIn: 'root'
})
export class AssignDevService {
  private baseUrl = 'https://localhost:44378/api/assigndev'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<AssignDev[]> {
    return this.http.get<AssignDev[]>(this.baseUrl);
  }

  getById(id: number): Observable<AssignDev> {
    return this.http.get<AssignDev>(`${this.baseUrl}/${id}`);
  }

  create(dev: AssignDev): Observable<any> {
    return this.http.post(this.baseUrl, dev);
  }

  update(id: number, dev: AssignDev): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, dev);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
