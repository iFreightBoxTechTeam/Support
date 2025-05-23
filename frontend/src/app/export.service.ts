import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private apiUrl2 = 'https://localhost:44378/api/export/excel';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Method to download the Excel file
  exportExcel(): Observable<Blob> {
    return this.http.get(this.apiUrl2, {
      responseType: 'blob',
    });
  }
}
