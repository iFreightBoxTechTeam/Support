import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// status.model.ts
export interface Status {
  StatusId: string;
  StatusName: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl = 'https://localhost:44321/api/status';

  // private apiUrl = 'https://localhost:44321/api/status/{statusId}';

  constructor(private http: HttpClient) { }

  statusAdded(status: Status): Observable<Status> {
    return this.http.post<Status>(this.apiUrl, status);
  }

// updateIssue(userId: number, data: any): Observable<any> {
//   return this.http.put(`https://localhost:44321/api/values/${userId}`, data);
// }

  statusUpdated(statusId: string, status: Status): Observable<any> {
    return this.http.put(`${this.apiUrl}/${statusId}`, status);
  }

  getStatusById(id: string): Observable<Status> {
    return this.http.get<Status>(`${this.apiUrl}/${id}`);
  }

}
