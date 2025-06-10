import { Component, ViewChild } from '@angular/core';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { Router } from '@angular/router';

interface Issue {
  id: number;
  issue_name: string;
}

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
  }

  @ViewChild(AddIssueComponent) addIssue!: AddIssueComponent;
  

  issueTypes = [
    { id: 1, issue_name:'Bug' },
    { id: 2, issue_name:'Feature Request' },
    { id: 3, issue_name:'Improvement' },
    { id: 4, issue_name:'Task' },
    { id: 5, issue_name:'Support' },
    { id: 6, issue_name:'Documentation' },
    { id: 7, issue_name:'Maintenance' },
    { id: 8, issue_name:'Performance' },
    { id: 9, issue_name:'Security' },
    { id: 10, issue_name:'Other' }
  ];

  newIssueType: string = '';
  nextId = 11;

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

  addIssueBtn(): void {
    if (this.newIssueType.trim()) {
      this.issueTypes.push({ id: this.nextId++, issue_name: this.newIssueType.trim() });
      this.newIssueType = '';
      this.currentPage = this.totalPages;
    } else {
      alert('Please enter a Status type.');
    }
  }

  onIssueAdded(issue: Omit<Issue, 'id'>) {
    if (issue.issue_name.trim()) {
      this.issueTypes.push({
        id: this.nextId++,
        ...issue,
      });
      this.currentPage = this.totalPages;
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
      const updatedType = prompt('Edit Issue Type:', issue.issue_name);
      if (updatedType !== null && updatedType.trim() !== '') {
        issue.issue_name = updatedType.trim();
      }
    }
  }

   openAddIssueModal() {
    this.addIssue.openModal();
  }

}
