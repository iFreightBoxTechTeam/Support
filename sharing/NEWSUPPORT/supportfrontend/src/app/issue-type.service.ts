import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from './issue.model'; // adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class IssueTypeService {
  private apiUrl = 'https://localhost:44321/api/issuetype';

  constructor(private http: HttpClient) {}

  getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`);
  }

  addIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue);
  }

  updateIssue(issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/${issue.id}`, issue);
  }

  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
export { Issue };

