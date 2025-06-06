import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']   
})
export class NavbarComponent {

  constructor(private router: Router) { }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToIssues() {
    this.router.navigate(['/issues']);
  }

  goToGear(){
   this.router.navigate(['/gear'])
  }

}
