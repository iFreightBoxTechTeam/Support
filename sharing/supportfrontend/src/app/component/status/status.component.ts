import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddStatusComponent } from './add-status/add-status.component';
import { HttpClient } from '@angular/common/http';
import { Status } from 'src/app/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    constructor(private router: Router,private http: HttpClient) {}

    ngOnInit(): void {
      this.loadstatus();
     }

  @ViewChild('addStatusComponent') addStatus!: AddStatusComponent;

  statusTypes: any[] = [];

  newStatusType: string = '';
  searchTerm: string = '';
  nextId = 115;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  

  loadstatus() {

  const apiUrl ='https://localhost:44321/api/status';

  this.http.get<any[]>(apiUrl).subscribe(data => {
    // const issue = data.find(x => x.UserId === UserId);
    console.log('issue',  data)
    if (data) {
      this.statusTypes = data
        // { date: data.Raised_date, status: data.statusname, username: data.name }
        // You had a stray `console.log()` inside the array — move it outside
      ;
      console.log("API Response:", data);
    } else {
      console.warn('Issue not found');
    }
  }, error => {
    console.error('Error fetching from API:', error);
  });
}

  get filteredStatusTypes(): Status[] {
    if (!this.searchTerm.trim()) return this.statusTypes;
    return this.statusTypes.filter(status =>
      status.status_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStatusTypes.length / this.itemsPerPage);
  }

  get paginatedStatusTypes(): Status[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStatusTypes.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openAddStatusModal() {
    this.addStatus.openModal();
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
  
onStatusAdded(status: Status) {
  console.log('New status added:', status);
  this.statusTypes.push(status);
  console.log('Updated statusTypes:', this.statusTypes);
  this.currentPage = this.totalPages;
}

  onStatusUpdated(updatedStatus: Status) {
    const index = this.statusTypes.findIndex(s => s.id === updatedStatus.id);
    if (index > -1) {
      this.statusTypes[index] = updatedStatus;
    }
  }
deleteStatus(id: number) {
  if (!confirm('Are you sure you want to delete this status?')) return;

  this.http.delete(`https://localhost:44321/api/status/${id}`).subscribe({
    next: () => {
      this.statusTypes = this.statusTypes.filter(s => s.id !== id);
      console.log('Deleted successfully');
    },
    error: (error) => {
      console.error('Failed to delete:', error);
    }
  });
}



  editStatus(status: Status) {
    this.addStatus.openModal(status);
  }

}