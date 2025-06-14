import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Issue {
 id: number;
  issue_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class IssueTypeService {
  getIssues(searchTerm: string, currentPage: number, itemsPerPage: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:44321/api/issuetype'; 

  constructor(private http: HttpClient) {}

  getIssueTypes(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  addIssue(issue: { Issue_Type: string }): Observable<any> {
    return this.http.post(this.apiUrl, issue);
  }
  updateIssue(id: number, issue: { Issue_Type: string }): Observable<any> {
  return this.http.put(`http://localhost:your-port/api/issuetype/${id}`, issue);
}

deleteIssue(id: number): Observable<any> {
  return this.http.delete(`http://localhost:your-port/api/issuetype/${id}`);
}

}
