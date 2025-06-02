import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

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
  IssueDescription?: string;
  AssignTo?: string;
  Module?: string;
  ResolveDate:String;
  TakenTime?: string;
  data: Matable[];
  totalCount: number;
  IssueTypeId?: number;  

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
    .set('pageSize', pageSize.toString())
    .set('searchTerm', searchTerm);

  return this.http.get<{ TotalRecords: number, Page: number, PageSize: number, data: Matable[], Data: Matable[] }>(`${this.apiUrl}/search`, { params })
    .pipe(
      map(response => ({
        data: response.Data,         // Your data array
        totalCount: response.TotalRecords
          // Total count mapped properly
      }))
    );
}


  GetMatableByCustomerId(userId: number) {
    return this.http.get<Matable>(`https://localhost:44378/api/values/${userId}`);
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

  updateMatable(userid: number, matable: any): Observable<any> {
  return this.http.put(`https://localhost:44378/api/values/${userid}`, matable);
}


  exportExcel(): Observable<Blob> {
    return this.http.get(this.exportUrl, { responseType: 'blob' });
  }
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();  // for subscribing

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);  // for updating
  }

  
}
