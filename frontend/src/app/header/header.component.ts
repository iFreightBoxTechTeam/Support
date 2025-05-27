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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // On route changes, check the URL
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showAddButton = !this.router.url.includes('/statuslog');
        console.log('Current route:', this.router.url, 'Show button:', this.showAddButton);
      });

    this.showAddButton = !this.router.url.includes('/statuslog');
  }

  showComponent() {
    
  }
}
