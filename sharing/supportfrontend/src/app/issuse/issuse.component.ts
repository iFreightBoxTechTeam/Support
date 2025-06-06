import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewComponent } from '../component/view/view.component';

@Component({
  selector: 'app-issuse',
  templateUrl: './issuse.component.html',
  styleUrls: ['./issuse.component.css']
})
export class IssuseComponent implements OnInit {
  issues: any[] = [];             // Full list
  filteredIssues: any[] = [];     // Search filtered
  searchTerm: string = '';
  @ViewChild(ViewComponent) ViewComponent!: ViewComponent;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  tenant = {
    user: 'TenantCode123'
  };

  ngOnInit() {
    this.loadIssues();
  }

  loadIssues() {
    this.issues = [
      { id: 101, user: 'Alice', raisedDate: new Date('2025-06-01T14:30:00'), status: '', module: '' },
      { id: 102, user: 'Priya', raisedDate: new Date('1997-06-01'), status: '', module: '' },
      { id: 103, user: 'Aditya', raisedDate: new Date('2003-06-01'), status: '', module: '' },
      { id: 104, user: 'Shreya', raisedDate: new Date('2004-06-01'), status: '', module: '' },
      { id: 105, user: 'Fahim', raisedDate: new Date('2001-06-01'), status: '', module: '' },
      { id: 106, user: 'Vijaya', raisedDate: new Date('2005-06-01'), status: '', module: '' },
      { id: 107, user: 'laxmi', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 108, user: 'Riddhi', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 109, user: 'lokesh', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 110, user: 'Krishna', raisedDate: new Date('2005-06-01'), status: '', module: '' },
      { id: 111, user: 'Siddhart', raisedDate: new Date('2001-06-01'), status: '', module: '' },
      { id: 112, user: 'Bhavesh', raisedDate: new Date('1980-06-01'), status: '', module: '' },
      { id: 113, user: 'Kevin', raisedDate: new Date('1995-06-01'), status: '', module: '' },
      { id: 115, user: 'Palak', raisedDate: new Date('2010-06-01'), status: '', module: '' },
      { id: 120, user: 'Shreyas', raisedDate: new Date('1990-06-01'), status: '', module: '' },
      { id: 121, user: 'Rohit', raisedDate: new Date('1983-06-01'), status: '', module: '' },
      { id: 168, user: 'MS DHONI', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 162, user: 'Yuvraj', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 161, user: 'Gill', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 160, user: 'Rahul', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 154, user: 'Pant', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 155, user: 'Pandya', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 152, user: 'Hardik', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 151, user: 'Phil', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 150, user: 'Liam', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 149, user: 'Mayank', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 148, user: 'Jack', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 147, user: 'Ryan', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 146, user: 'Mitchal', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 145, user: 'Tim', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 144, user: 'David', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 143, user: 'Sai', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 142, user: 'Sky', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 141, user: 'Bumrah', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 140, user: 'Dravid', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 139, raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 138, user: 'Govind', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 137, user: 'Rakesh', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 136, user: 'Noor', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 135, user: 'Ali', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 134, user: 'khan', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 133, user: 'Ansari', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 132, user: 'Adi', raisedDate: new Date('2025-06-01'), status: '', module: '' },
      { id: 131, user: 'Prisha', raisedDate: new Date('2025-06-01'), status: '', module: '' }
    ];

    // Initialize filteredIssues with all
    this.filteredIssues = [...this.issues];
  }

  onSearch(term: string) {
    const lowerTerm = term.toLowerCase().trim();
    this.currentPage = 1;

    this.filteredIssues = this.issues.filter(issue =>
      issue.user?.toLowerCase().includes(lowerTerm)
    );
  }

  get paginatedIssues() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredIssues.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredIssues.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  editIssue(id: number) {
    console.log('Edit issue', id);
  }

  deleteIssue(id: number) {
    console.log('Delete issue', id);
  }

  viewLog(id: number) {
    console.log('View log for issue', id);
    this.ViewComponent.openModal();
  }
}
