import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Matable, MatableService } from '../services/matable.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  showAddButton: boolean = true;
 
  matables: Matable[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalRecords: any;

  constructor(private router: Router,  private matableService: MatableService,) {}

  ngOnInit(): void {
    const hideOnRoutes = ['/statuslog', '/assign-dev'];
    this.loadData

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.showAddButton = !hideOnRoutes.includes(currentUrl);
        console.log('Current route:', currentUrl, 'Show button:', this.showAddButton);
      });

    // Initial check on load
    const currentUrl = this.router.url;
    this.showAddButton = !hideOnRoutes.includes(currentUrl);
  }

onSearch(term: string): void {
  this.matableService.setSearchTerm(term);  // notify
}
 
  loadData() {
  this.matableService.getMatables(this.currentPage, this.pageSize, this.searchTerm)
    .subscribe({
      next: (response) => {
        this.matables = response.data;          // Use capital D for Data
        this.totalRecords = response.totalCount; // Use proper property name
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      },
      error: (error) => {
        console.error('Error loading matables:', error);
      }
    });
}


  showComponent(): void {
    // Implement your logic here if needed
  }

}