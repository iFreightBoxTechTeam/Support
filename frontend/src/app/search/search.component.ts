import { Component } from '@angular/core';
import { MatableService, Matable } from '../services/matable.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  results: Matable[] = [];
  isLoading = false;
  error: string | null = null;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  constructor(private matableService: MatableService) {}

  onSearch(page: number = 1): void {
    this.isLoading = true;
    this.error = null;
    this.currentPage = page;

   console.log('Searching:', this.searchTerm);

this.matableService.getMatables(this.currentPage, this.pageSize, this.searchTerm).subscribe({
  next: (res) => {
    console.log('API result:', res);
    this.results = res.data;
    this.totalRecords = res.totalCount;
    this.isLoading = false;
  },
  error: (err) => {
    console.error('API error:', err);
    this.error = 'Error fetching results';
    this.isLoading = false;
  }
});
  }

  onPageChange(page: number): void {
    this.onSearch(page);
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }
}
