import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ViewComponent } from '../component/view/view.component';
import { IssueService } from '../issue.service';
import { IssueComponent } from '../component/issue/issue.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-issuse',
  templateUrl: './issuse.component.html',
  styleUrls: ['./issuse.component.css'],
})
export class IssuseComponent implements OnInit {
  issues: any[] = [];
  filteredIssues: any[] = [];
  searchTerm: string = '';

  currentPage = 1;
  itemsPerPage = 5;

  @ViewChild(ViewComponent) viewComponent!: ViewComponent;
  @ViewChild(IssueComponent) issueComponent!: IssueComponent;

  constructor(private issueService: IssueService, private http: HttpClient) {}

  ngOnInit() {
    this.loadIssues();
  }

 loadIssues() {
  this.issueService.getIssues(this.searchTerm, this.currentPage, this.itemsPerPage).subscribe(data => {
    if (Array.isArray(data)) {
      this.issues = data;
      this.filteredIssues = data;
    } else {
      console.error("API did not return an array:", data);
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

  get paginatedIssues() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredIssues.slice(startIndex, startIndex + this.itemsPerPage);
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
      console.error("Error: No issue found for ID:", issue.UserId);
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
          console.error('Error deleting issue:', err);
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

  const filteredIndex = this.filteredIssues.findIndex(i => i.UserId === updatedIssue.UserId);
  if (filteredIndex !== -1) {
    this.filteredIssues[filteredIndex] = updatedIssue;
  }

  console.log("Issue updated in parent list:", updatedIssue);
}

onPageChange(page: number) {
  this.currentPage = page;
  this.loadIssues();
}


}
