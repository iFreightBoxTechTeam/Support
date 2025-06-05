import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent {
searchTerm: any;
onSearch(arg0: any) {  
  
throw new Error('Method not implemented.');
}
  constructor(private router: Router){}

  goToMasters(){
    this.router.navigate(['/mastercompo']); 
  }
}
