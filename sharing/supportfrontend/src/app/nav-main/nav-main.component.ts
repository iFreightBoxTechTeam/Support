import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent {
  @Input() showAddButton: boolean = true;

  searchTerm: string = '';

  @Output() openAddModal = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  constructor(private router: Router) {}

  goToMasters() {
    this.router.navigate(['/mastercompo']);
  }

  onAddClick() {
    this.openAddModal.emit();
  }

onSearch(searchText: string) {
  console.log(searchText);
this.searchChange.emit(this.searchTerm);

}
}
  