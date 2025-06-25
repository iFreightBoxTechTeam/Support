import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddStatusComponent } from './add-status/add-status.component';
import { HttpClient } from '@angular/common/http';
import { Status, StatusService } from 'src/app/status.service';
import { IssueService } from 'src/app/issue.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    constructor(
      private router: Router,
      private http: HttpClient,
      private issueService: IssueService,
      private statusService: StatusService  
    ) {}

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
    const apiUrl = 'https://localhost:44321/api/status';

    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        console.log('API Response:', data);
        if (data) {
          // Sort by created date (most recent at bottom)
            // this.statusTypes = data.sort((a, b) =>
            //   new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()
            // );
           this.statusTypes = data.sort((a, b) =>
              a.StatusName.localeCompare(b.StatusName)
            );
        } else {
          console.warn('No data received');
        }
      },
      error => {
        console.error('Error fetching from API:', error);
      }
    );
  }
  
  get filteredStatusTypes(): Status[] {
    if (!this.searchTerm.trim()) return this.statusTypes;
    return this.statusTypes.filter(status =>
      (status.StatusName || '').toLowerCase().includes(this.searchTerm.toLowerCase())
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
  
  // onStatusAdded(status: Status) {
  //   if (!status.StatusName.trim()) {
  //     console.warn('Empty status name, not saving.');
  //     return;
  //   }

  //   this.statusService.statusAdded(status).subscribe({
  //     next: (savedStatus) => {
  //       this.statusTypes.push(savedStatus);
  //       this.currentPage = this.totalPages;
  //       console.log('Status saved and added:', savedStatus);
  //     },
  //     error: (err) => {
  //       console.error('Error saving status:', err);
  //     }
  //   });
  // }

  onStatusAdded(status: Status) {
    this.statusService.statusAdded(status).subscribe({
      next: (savedStatus) => {
        // this.statusTypes.push(savedStatus);  
        console.log('New status added:', status);
        this.statusTypes.push(status); // Appends to the end
        this.currentPage = this.totalPages;
      },
      error: (err) => {
        console.error('Error saving status:', err);
      }
    });
  }

  onStatusUpdated(updatedStatus: Status) {
    this.statusService.statusUpdated(updatedStatus.StatusId, updatedStatus).subscribe(
      () => {
        const index = this.statusTypes.findIndex(s => s.StatusId === updatedStatus.StatusId);
        if (index > -1) this.statusTypes[index] = updatedStatus;
      },
      (error: any) => console.error('Error updating status:', error)
    );
  }

  deleteStatus(StatusId: string) {
    if (!confirm('Are you sure you want to delete this status?')) return;

    this.http.delete(`https://localhost:44321/api/status/${StatusId}`).subscribe({
      next: () => {
        this.statusTypes = this.statusTypes.filter(s => s.StatusId !== StatusId);
        console.log('Deleted successfully');
      },
      error: (error) => {
        console.error('Failed to delete:', error);
      }
    });
  }

  updateStatus(statusId: string, status: Status) {
    console.log('Sending status update:', status);
    this.statusService.statusUpdated(statusId, status).subscribe(
      (response: Status) => {
        console.log('Status updated successfully:', response);

        const index = this.statusTypes.findIndex(s => s.StatusId === statusId);
        if (index > -1) {
          this.statusTypes[index] = status;
        }
      },
      (error: any) => {
        console.error('Error updating status:', error);
      }
    );
  }
    
  editStatus(status: Status) {
    this.addStatus.openModal(status);
  }

}
