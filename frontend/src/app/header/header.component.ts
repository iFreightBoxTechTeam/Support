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
    console.log('Search term:', term);
    // Implement your search logic here
  }
 

  showComponent(): void {
    // Implement your logic here if needed
  }

}