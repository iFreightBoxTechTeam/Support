import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// ✅ Matable interface
export interface Matable {
  Id: number;
  Name: string;
  Description: string;
  StatusName: string;
  TenantCode: string;
  UserId: number;
  ImagePath: string;
  ImagePaths?: string[];
  LogTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatableService {
  private apiUrl = 'https://localhost:44378/api/values';
  private exportUrl = 'https://localhost:44378/api/export/excel';

  constructor(private http: HttpClient) {}

  // ✅ Get matables with pagination and optional search term
  getMatables(page: number, pageSize: number, searchTerm: string = ''): Observable<{ data: Matable[], totalCount: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<{ TotalRecords: number, Page: number, PageSize: number, Data: Matable[]; data: Matable[], totalCount: number }>(`${this.apiUrl}/search`, { params })
      .pipe(
        map(response => ({
          data: response.Data,
          totalCount: response.TotalRecords
        }))
      );
  }
//   getMatables(page: number, pageSize: number, searchTerm: string=''): Observable<{ data: Matable[], totalCount: number }> {
//   let params = new HttpParams()
//     .set('page', page.toString())
//     .set('pageSize', pageSize.toString());

//   if (searchTerm) {
//     params = params.set('searchTerm', searchTerm);
//   }

//   return this.http.get<{ data: Matable[], totalCount: number }>(`${this.apiUrl}/search`, { params });
// }

  // Simplified search method, calls getMatables with fixed page/pageSize and returns only data array
  searchMatables(term: string): Observable<Matable[]> {
    return this.getMatables(1, 10, term).pipe(
      map(result => result.data)
    );
  }

  // ✅ Get all matables (optional, not used if paginated version is used)
  getAll(): Observable<Matable[]> {
    return this.http.get<Matable[]>(this.apiUrl);
  }

  createMatable(matable: Matable): Observable<any> {
    return this.http.post(this.apiUrl, matable);
  }

  getMatableById(userId: number): Observable<Matable> {
    return this.http.get<Matable>(`${this.apiUrl}/${userId}`);
  }

  deleteMatable(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

  updateMatable(userId: number, matable: Partial<Matable>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, matable);
  }

  exportExcel(): Observable<Blob> {
    return this.http.get(this.exportUrl, { responseType: 'blob' });
  }
}
