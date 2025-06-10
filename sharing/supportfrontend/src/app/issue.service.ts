import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
 
  private apiUrl = 'https://localhost:44321/api/values'; // Replace xxxx with your API port

  constructor(private http: HttpClient) {}
private issueData: any;

 setIssue(issue: any) {
  if (!issue) {
    console.error("Error: Trying to set an undefined issue.");
    return;
  }
  this.issueData = issue;
  console.log("Issue stored in service:", this.issueData);}

  getIssue() {
  console.log("Fetching issue from service:", this.issueData);
  return this.issueData || null;
}
  getIssues(searchTerm: string = '', pageNumber: number = 1, pageSize: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<any>(this.apiUrl, { params });
  }
  updateIssue(userId: number, issueData: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put(`${this.apiUrl}/${userId}`, issueData, { headers });
}
  getIssueById(issueId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}//issues_id/${issueId}`);
}

}
