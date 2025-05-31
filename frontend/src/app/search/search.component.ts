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

  
  // 🔍 Perform search (initial or paginated)
  //  Perform search (initial or paginated)
  onSearch(page: number = 1): void {
    this.isLoading = true;
    this.error = null;
    this.currentPage = page;

    this.matableService.getMatables(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (res) => {
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

  //  Handle page change
  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.onSearch(page);
  }

  // Calculate total pages
  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  // Generate page numbers for pagination buttons
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
