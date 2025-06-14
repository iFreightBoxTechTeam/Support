import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AddIssueComponent } from './add-issue/add-issue.component';

interface Issue {
  Id: number;
  Issue_Type: string;
}

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent implements AfterViewInit {
  @ViewChild('addIssue') addIssue!: AddIssueComponent;

  Issue: Issue[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  nextId = 11;

  pages: number[] = [];

  ngOnInit(): void {
    this.Issue = [
      { Id: 1, Issue_Type: 'UI Bug' },
      { Id: 2, Issue_Type: 'Backend Issue' },
      { Id: 3, Issue_Type: 'Performance' },
      { Id: 4, Issue_Type: 'Security' },
      { Id: 5, Issue_Type: 'Database' },
      { Id: 6, Issue_Type: 'API Error' },
      { Id: 7, Issue_Type: 'Crash' },
      { Id: 8, Issue_Type: 'Feature Request' },
      { Id: 9, Issue_Type: 'Other' },
      { Id: 10, Issue_Type: 'Documentation' },
    ];
    this.updatePages();
  }

  ngAfterViewInit() {
    // If you want to do something after the child component is ready
  }

  get filteredIssues(): Issue[] {
    if (!this.searchTerm) return this.Issue;
    const term = this.searchTerm.toLowerCase();
    return this.Issue.filter(i => i.Issue_Type.toLowerCase().includes(term));
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredIssues.length / this.itemsPerPage));
  }

  get Issues(): Issue[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredIssues.slice(start, start + this.itemsPerPage);
  }

  updatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePages();
  }

  onIssueAdded(issue: any) {
    // Assuming issue object with Id and Issue_Type returned from AddIssueComponent
    if (issue && issue.Issue_Type?.trim()) {
      this.Issue.push({ Id: this.nextId++, Issue_Type: issue.Issue_Type.trim() });
      this.currentPage = this.totalPages;
      this.updatePages();
    }
  }

  onIssueUpdated(updatedIssue: Issue) {
    const idx = this.Issue.findIndex(i => i.Id === updatedIssue.Id);
    if (idx !== -1) {
      this.Issue[idx] = { ...updatedIssue };
    }
  }

  deleteIssue(id: number) {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.Issue = this.Issue.filter(i => i.Id !== id);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      this.updatePages();
    }
  }

  editIssue(issue: Issue) {
    if (this.addIssue) {
      this.addIssue.openModal(issue); // Pass issue to open in edit mode
    }
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
    this.updatePages();
  }

  openAddIssueModal() {
    this.addIssue.openModal();
  }
}
