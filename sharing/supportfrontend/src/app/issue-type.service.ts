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
  private apiUrl = 'https://localhost:44321/api/issuetype'; // Update this if needed

  constructor(private http: HttpClient) {}

  getIssueTypes(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }
}
