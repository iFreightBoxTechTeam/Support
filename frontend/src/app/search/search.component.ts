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

  constructor(private matableService: MatableService) {}

  onSearch() {
    this.isLoading = true;
    this.error = null;

    this.matableService.searchMatables(this.searchTerm).subscribe({
      next: (data) => {
        this.results = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error fetching results';
        this.isLoading = false;
      }
    });
  }
}
