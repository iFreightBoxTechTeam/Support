import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ViewComponent } from '../component/view/view.component';
import { IssueComponent } from '../component/issue/issue.component';
import { IssueService } from '../issue.service';
import { HttpClient } from '@angular/common/http';
import { Status,StatusService } from '../status.service';


declare var bootstrap: any;
@Component({
  selector: 'app-issuse',
  templateUrl: './issuse.component.html',
  styleUrls: ['./issuse.component.css'],
})
export class IssuseComponent implements OnInit, AfterViewInit {

    issues: any[] = [];
  filteredIssues: any[] = [];
  searchTerm: string = '';
 private offcanvasInstance: any;
currentPage = 1;
itemsPerPage = 5;


showDeleteModal = false;
issueToDelete: any = null;

statuses: Status[] = [];

filter = {
  userId: '',
  tenantCode: '',
  startDate: '',
  endDate: '',
  status: '',
  assignTo: ''
};
tempFilter = { ...this.filter }




  @ViewChild(ViewComponent) viewComponent!: ViewComponent;
  @ViewChild(IssueComponent) issueComponent!: IssueComponent;
  

  constructor(
  private issueService: IssueService,
  private http: HttpClient,
  private statusService: StatusService
) {}


  ngOnInit() {
    this.loadIssues();
    this.loadStatuses();
  }


loadIssues() {
  this.issueService.getIssues(this.searchTerm, this.currentPage, this.itemsPerPage).subscribe(data => {
    if (Array.isArray(data)) {
      this.issues = data;
      this.applyFilters();  // apply filters after fetching issues
    } else {
      console.error("API did not return an array:", data);
    }
  });
}

// loadIssues() {
//   this.issueService.getIssues(this.searchTerm, this.currentPage, this.itemsPerPage).subscribe(data => {
//     if (Array.isArray(data)) {
//       this.issues = data;
//       this.applyFilters(); // Apply filters after fetching
//     } else {
//       console.error("API did not return an array:", data);
//     }
//   });
// }




loadStatuses() {
  this.statusService.getAllStatuses().subscribe({
    next: (data) => {
      this.statuses = data;
    },
    error: (err) => {
      // console.error('Error fetching statuses:', err);
    }
  });
}



  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
    this.loadIssues();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredIssues.length / this.itemsPerPage);
  }

  get pagesArray() {
    return Array(this.totalPages).fill(0);
  }

  // get paginatedIssues() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.filteredIssues.slice(startIndex, startIndex + this.itemsPerPage);
  // }

get paginatedIssues() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const paginated = this.filteredIssues.slice(startIndex, startIndex + this.itemsPerPage);
  console.log("Paginated Issues:", paginated);
  return paginated;
}


changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

  editIssue(issue: any) {
    const selectedIssue = this.paginatedIssues.find(i => i.UserId === issue.UserId);

    console.log("Selected Issue Before Setting in Service:", selectedIssue);

    if (!selectedIssue) {
      // console.error("Error: No issue found for ID:", issue.UserId);
      return;
    }
    
    this.issueComponent.openIssueModal(issue?.UserId);
  }

  deleteIssue(id: number) {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.http.delete(`https://localhost:44321/api/values/${id}`).subscribe({
        next: () => {
          this.issues = this.issues.filter(issue => issue.Id !== id);
          console.log('Issue deleted successfully.');
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages || 1;
          }
          this.loadIssues();
        },
        error: (err) => {
          // console.error('Error deleting issue:', err);
          alert('Failed to delete issue.');
        }
      });
    }
  }

  viewLog(issue: any) {
    console.log("Issue object:", issue);
    console.log("Issue.userid:", issue?.UserId);
    this.viewComponent.openModal(issue?.UserId);
  }

 handleIssueUpdated(updatedIssue: any) {
  const index = this.issues.findIndex(i => i.UserId === updatedIssue.UserId);
  if (index !== -1) {
    this.issues[index] = updatedIssue;
  }

}

 
openDeleteConfirmation(issue: any): void {
  this.issueToDelete = issue;
  this.showDeleteModal = true;
}

  undoDelete(): void {
  this.showDeleteModal = false;
  this.issueToDelete = null;
}

confirmDeleteIssuse(): void {
  if (!this.issueToDelete) return;

  const id = this.issueToDelete.UserId;  // ✅ use Id instead of UserId

  this.http.delete(`https://localhost:44321/api/values/${id}`).subscribe({
    next: () => {
      this.issues = this.issues.filter(issue => issue.Id !== id);  // ✅ filter by Id
      this.filteredIssues = this.filteredIssues.filter(issue => issue.Id !== id);
      this.undoDelete(); // Close modal
      this.loadIssues(); // Reload if needed
    },
    error: (err) => {
      console.log('Failed to delete issue.');
      this.undoDelete();
    }
  });
}


  changePer(event: any) {
    this.itemsPerPage = +event;
    this.currentPage = 1; 
      // this.loadIssues();  
  }


applyFilters() {
  this.filteredIssues = this.issues.filter(issue => {
    const issueDate = new Date(issue.Raised_date);
    const issueDate2 = new Date(issue.ResolveDate);
    const start = this.filter.startDate ? new Date(this.filter.startDate) : null;
    const end = this.filter.endDate ? new Date(this.filter.endDate) : null;

    if (this.filter.userId && issue.UserId != +this.filter.userId) {
      console.log(`Filtered out by userId: issue.UserId=${issue.UserId}, filter=${this.filter.userId}`);
      return false;
    }
    if (this.filter.tenantCode && !issue.TenantCode?.toLowerCase().includes(this.filter.tenantCode.toLowerCase())) {
      console.log(`Filtered out by tenantCode: issue.TenantCode=${issue.TenantCode}, filter=${this.filter.tenantCode}`);
      return false;
    }
    if (start && issueDate < start) {
    
      console.log(`Filtered out by startDate: issueDate=${issueDate}, start=${start}`);
      return false;
    }
    if (end && issueDate > end) {
     
      console.log(`Filtered out by endDate: issueDate=${issueDate2}, end=${end}`);
      return false;
    }
    if (this.filter.status && issue.StatusId != +this.filter.status) {
      console.log(`Filtered out by status: issue.StatusId=${issue.StatusId}, filter=${this.filter.status}`);
      return false;
    }
    if (this.filter.assignTo && issue.AssignTo?.toLowerCase() !== this.filter.assignTo.toLowerCase()) {
      console.log(`Filtered out by assignTo: issue.AssignTo=${issue.AssignTo}, filter=${this.filter.assignTo}`);
      return false;
    }

    return true;
  });

  
  this.currentPage = 1;
  if (this.offcanvasInstance) this.offcanvasInstance.hide();
  console.log("Filtered issues count:", this.filteredIssues.length);
}
applyFilterChanges() {
  this.filter = { ...this.tempFilter };
  this.applyFilters();
  if (this.offcanvasInstance) {
    this.offcanvasInstance.hide();
  }
}




clearFilters() {
  this.filter = {
    userId: '',
    tenantCode: '',
    startDate: '',
    endDate: '',
    status: '',
    assignTo: ''
  };
  this.filteredIssues = [...this.issues];
  this.currentPage = 1;
  if (this.offcanvasInstance) {
    this.offcanvasInstance.hide();
  }
}

getUniqueUserIds(): number[] {
  const ids = this.issues.map(issue => issue.UserId);
  return Array.from(new Set(ids));
}


ngAfterViewInit() {
  const element = document.getElementById('offcanvasRight');
  if (element) {
    this.offcanvasInstance = new bootstrap.Offcanvas(element);
  }
}

openOffcanvas() {
  this.clearFilters();   // Reset filter inputs on opening
  this.offcanvasInstance.show();
   this.tempFilter = {
    userId: '',
    tenantCode: '',
    startDate: '',
    endDate: '',
    status: '',
    assignTo: ''
  };
  this.offcanvasInstance.show();
}
}




