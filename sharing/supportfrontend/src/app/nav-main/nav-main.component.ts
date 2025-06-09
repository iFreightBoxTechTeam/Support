import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent {
   @Input() showAddButton: boolean = true;

  searchTerm: any;
  onSearch(arg0: any) {  
    
throw new Error('Method not implemented.');
}
  constructor(private router: Router){}

  goToMasters(){
    this.router.navigate(['/mastercompo']); 
  }

  @Output() openAddUser = new EventEmitter<void>();

  onAddClick() {
    this.openAddUser.emit();
  }
}
