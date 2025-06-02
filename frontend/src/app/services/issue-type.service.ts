import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IssueType {
  Id: number;
  Issue_Type: string;  // Match property names from your C# model or map accordingly
}

@Injectable({
  providedIn: 'root',
})
export class IssueTypeService {
  private apiUrl = 'https://localhost:44378/api/issuetype';  // Change base URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>(this.apiUrl);
  }

  getById(id: number): Observable<IssueType> {
    return this.http.get<IssueType>(`${this.apiUrl}/${id}`);
  }

  create(issue: { issue_Type: string }): Observable<any> {
    return this.http.post(this.apiUrl, issue);
  }

  update(id: number, issue: { issue_Type: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, issue);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
