import { Component, OnInit, ViewChild,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { AddStatusComponent } from './add-status/add-status.component';

interface Status {
  id: number;
  status_name: string;
}

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
  // @Output() userAdded = new EventEmitter<any>();

  statusTypes : Status[] = [
    { id: 101, status_name: 'Open' },
    { id: 102, status_name: 'Work in Progress' },
    { id: 103, status_name: 'Pending'},
    { id: 104, status_name: 'Completed' },
    { id: 105, status_name: 'Work in Progress'},
    { id: 106, status_name: 'Pending'},
    { id: 107, status_name: 'Completed'},
    { id: 109, status_name: 'Work in Progress'},
    { id: 110, status_name: 'Pending'},
    { id: 111, status_name: 'Completed'},
    { id: 112, status_name: 'Work in Progress'},
    { id: 113, status_name: 'Pending'},
    { id: 114, status_name: 'Completed'},
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
      this.statusTypes.push({ id: this.nextId++, status_name: this.newStatusType.trim() });
      this.newStatusType = '';
      this.currentPage = this.totalPages;
    } else {
      alert('Please enter a Status type.');
    }
  }

  onStatusAdded(status: Omit<Status, 'id'>) {
    if (status.status_name.trim()) {
      this.statusTypes.push({
        id: this.nextId++,
        ...status,
      });
      this.currentPage = this.totalPages;
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
      const updated = prompt('Edit Status Type:', existing.status_name);
      if (updated !== null && updated.trim() !== '') {
        existing.status_name = updated.trim();
      }
    }
  }

  openAddStatusModal() {
    this.addStatus.openModal();
  }
}
