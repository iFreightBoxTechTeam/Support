import { Component, OnInit, ViewChild,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { AddStatusComponent } from './add-status/add-status.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit{
  constructor(private router: Router) {}
  ngOnInit(): void {
  }
  
  @ViewChild(AddStatusComponent) addStatus!: AddStatusComponent;
  @Output() userAdded = new EventEmitter<any>();

  statusTypes = [
    { id: 101, type: 'Open' },
    { id: 102, type: 'Work in Progress' },
    { id: 103, type: 'Pending'},
    { id: 104, type: 'Completed' },
    { id: 105, type: 'Work in Progress'},
    { id: 106, type: 'Pending'},
    { id: 107, type: 'Completed'},
    { id: 109, type: 'Work in Progress'},
    { id: 110, type: 'Pending'},
    { id: 111, type: 'Completed'},
    { id: 112, type: 'Work in Progress'},
    { id: 113, type: 'Pending'},
    { id: 114, type: 'Completed'},
  ];

  newStatusType: string = '';
  nextId = 115;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.statusTypes.length / this.itemsPerPage);
  }

  get paginatedStatusTypes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.statusTypes.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addStatusBtn(): void {
    if (this.newStatusType.trim()) {
      this.statusTypes.push({ id: this.nextId++, type: this.newStatusType.trim() });
      this.newStatusType = '';
      this.currentPage = this.totalPages;
    } else {
      alert('Please enter a Status type.');
    }
  }

  deleteStatus(id: number): void {
    this.statusTypes = this.statusTypes.filter(item => item.id !== id);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  editStatus(id: number): void {
    const existing = this.statusTypes.find(i => i.id === id);
    if (existing) {
      const updated = prompt('Edit Status Type:', existing.type);
      if (updated !== null && updated.trim() !== '') {
        existing.type = updated.trim();
      }
    }
  }

  openAddStatusModal() {
    this.addStatus.openModal();
  }
}
