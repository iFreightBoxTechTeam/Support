import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { HttpClient } from '@angular/common/http';
import { Issue} from 'src/app/issue-type.service';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

    ngOnInit(): void {
      this.loadIssueType();
    }

  @ViewChild('addIssueComponent') addIssue!: AddIssueComponent;

    issueTypes: any[] = [];

    newIssueType: string = '';
    searchTerm: string = '';
    nextId = 115;

    currentPage: number = 1;
    itemsPerPage: number = 5;

loadIssueType() {

    const apiUrl ='https://localhost:44321/api/issuetype';

    this.http.get<any[]>(apiUrl).subscribe(data => {
      console.log('issue', data);
      if (data) {
        this.issueTypes = data;
        console.log("API Response:", data);
      } else {
        console.warn('Issue not found');
      }
    }, error => {
      console.error('Error fetching from API:', error);
    });
  }

  get filteredIssueTypes(): Issue[] {
      if (!this.searchTerm.trim()) return this.issueTypes;
      return this.issueTypes.filter(issue =>
        issue.issue_type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredIssueTypes.length / this.itemsPerPage);
  }

  get paginatedIssueTypes(): Issue[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredIssueTypes.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openAddIssueModal() {
    this.addIssue.openModal();
  }

  addIssueBtn(): void {
    if (this.newIssueType.trim()) {
      this.issueTypes.push({ id: this.nextId++, status_name: this.newIssueType.trim() });
      this.newIssueType = '';
      this.currentPage = this.totalPages;
    } else {
      alert('Please enter a Issue type.');
    }
  }

  onIssueAdded(issue: Issue) {
    console.log('New issue added:', issue);
    this.issueTypes.push(issue);
    console.log('Updated statusTypes:', this.issueTypes);
    this.currentPage = this.totalPages;
  }

  onIssueUpdated(updatedIssue: Issue) {
    const index = this.issueTypes.findIndex(i => i.id === updatedIssue.id);
    if (index > -1) {
      this.issueTypes[index] = updatedIssue;
    }
  }

  deleteIssue(id: number) {
  if (confirm('Are you sure you want to delete this issue?')) return;

    this.http.delete(`https://localhost:44321/api/issuetype/${id}`).subscribe({
      next: () => {
        this.issueTypes = this.issueTypes.filter(i => i.id !== id);
        console.log('Issue deleted successfully.');
      },
      error: (error) => {
        console.error('Failed to delete:', error);
      }
    });
  } 
  
  editIssue(issue: Issue) {
    this.addIssue.openModal(issue);
  }
  
}
