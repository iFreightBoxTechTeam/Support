import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// ✅ Matable interface
export interface Matable {
  Id:number;
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
  private exportUrl = 'https://localhost:44378/api/excel/export';

  constructor(private http: HttpClient) {}

  // ✅ Get matables with pagination and optional search term
  getMatables(page: number = 1, pageSize: number = 10, searchTerm: string = ''): Observable<Matable[]> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());

  if (searchTerm && searchTerm.trim() !== '') {
    params = params.set('searchTerm', searchTerm.trim());
  }

  return this.http.get<Matable[]>(`${this.apiUrl}/search`, { params });
}
// 🔍 Search-specific method (reuses the API but for clarity in code)
searchMatables(term: string): Observable<Matable[]> {
  const params = new HttpParams()
    .set('searchTerm', term)
    .set('page', '1')
    .set('pageSize', '10');

  return this.http.get<Matable[]>(`${this.apiUrl}/search`, { params });
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
