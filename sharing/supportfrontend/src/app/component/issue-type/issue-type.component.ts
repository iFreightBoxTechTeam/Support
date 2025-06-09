import { Component } from '@angular/core';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent {
  issueTypes = [
    { id: 1, type: 'Bug' },
    { id: 2, type: 'Feature Request' },
    { id: 3, type: 'Improvement' },
    { id: 4, type: 'Task' },
    { id: 5, type: 'Support' },
    { id: 6, type: 'Documentation' },
    { id: 7, type: 'Maintenance' },
    { id: 8, type: 'Performance' },
    { id: 9, type: 'Security' },
    { id: 10, type: 'Other' }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.issueTypes.length / this.itemsPerPage);
  }

  get paginatedIssues() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.issueTypes.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  deleteIssue(id: number): void {
    this.issueTypes = this.issueTypes.filter(issue => issue.id !== id);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  editIssue(id: number): void {
    const issue = this.issueTypes.find(i => i.id === id);
    if (issue) {
      const updatedType = prompt('Edit Issue Type:', issue.type);
      if (updatedType !== null && updatedType.trim() !== '') {
        issue.type = updatedType.trim();
      }
    }
  }
}
