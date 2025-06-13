import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddStatusComponent } from './add-status/add-status.component';
import { HttpClient } from '@angular/common/http';

interface Status {
  id: number;
  status_name: string;
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  constructor(private router: Router,private http: HttpClient) {}
  
  @ViewChild('addStatusComponent') addStatus!: AddStatusComponent;

  statusTypes: any[] = [];

  newStatusType: string = '';
  searchTerm: string = '';
  nextId = 115;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit(): void {
  this.loadstatus();
}


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

editStatus(status: any): void {
  if (!status || !status.StatusId) {
    console.error('Invalid status object:', status);
    return;
  }

  const updatedType = prompt('Edit Status Name:', status.StatusName);
  if (updatedType !== null && updatedType.trim() !== '') {
    const apiUrl = `https://localhost:44321/api/status/${status.StatusId}`;
    const updatedData = { StatusName: updatedType.trim() };

    this.http.put(apiUrl, updatedData).subscribe({
      next: () => {
        status.StatusName = updatedType.trim(); // update locally
        console.log('Status updated successfully.');
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update status.');
      }
    });
  }
}

  openAddStatusModal() {
    if (this.addStatus) {
      this.addStatus.openModal();
    } else {
      console.error('AddStatusComponent is NOT yet initialized!');
    }
  }

}