import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface StatusLog {
  id: string;
  statusId: string;
  statusName: string;
  matableId: string;
  matableName: string;
  logTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatusLogService {
  private apiUrl = 'https://localhost:44378/api/values/logs'; // Update if your API URL is different

  constructor(private http: HttpClient) {}

  getStatusLogs(): Observable<StatusLog[]> {
    return this.http.get<StatusLog[]>(this.apiUrl);

  }
  
}
