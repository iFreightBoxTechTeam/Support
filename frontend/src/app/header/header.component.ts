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
    // On route changes, check the URL and toggle the add button
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showAddButton = !this.router.url.includes('/statuslog');
        console.log('Current route:', this.router.url, 'Show button:', this.showAddButton);
      });

    // Initial check when component loads
    this.showAddButton = !this.router.url.includes('/statuslog');
  }

  onSearch(term: string): void {
    console.log('Search term:', term);
    // Implement your search logic here
  }

  showComponent(): void {
    // Implement your logic here if needed
  }
}
