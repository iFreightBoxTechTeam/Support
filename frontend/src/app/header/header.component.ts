import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showAddButton: boolean = true;
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const hideOnRoutes = ['/statuslog', '/assign-dev'];

    // Subscribe to router events to react to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.showAddButton = !hideOnRoutes.includes(currentUrl);
        console.log('Current route:', currentUrl, 'Show button:', this.showAddButton);
      });

    // Initial check
    const currentUrl = this.router.url;
    this.showAddButton = !hideOnRoutes.includes(currentUrl);
  }

  onSearch(term: string): void {
    console.log('Search term:', term);
    // You can implement your actual search logic here if needed
  }

  showComponent(): void {
    // Placeholder method for navigation or logic on Add button click
  }
}
