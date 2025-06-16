import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// status.model.ts
export interface Status {
  id: number;
  StatusName: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl = 'https://localhost:44321/api/status'; // change this to your API endpoint

  constructor(private http: HttpClient) { }

 addStatus(status: Status): Observable<Status> {
  return this.http.post<Status>(this.apiUrl, status);
}

  updateStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.apiUrl}/${status.id}`, status);
  }
}
