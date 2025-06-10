import { Component, ViewChild } from '@angular/core';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { Router } from '@angular/router';

import { Issue, IssueTypeService} from '..//..//issue-type.service';




@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent {
  constructor(private router: Router, private issueTypeService: IssueTypeService) {}

  @ViewChild(AddIssueComponent) addIssue!: AddIssueComponent;


  newIssueType: string = '';
  nextId = 11;

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

issueTypes: Issue[] = [];

ngOnInit(): void {
  this.loadIssueTypes();
}

loadIssueTypes(): void {
  this.issueTypeService.getIssueTypes().
  subscribe({
    
    next: (data) => {
      console.log('API data:', data); 
      this.issueTypes = data.map(item => ({
        id: item.id,
        issue_type: item.issue_type // Mapping backend field to frontend model
      }));
    },
    
    error: (err) => {
      console.error('Failed to load issue types:', err);
    }
  });}

get filteredIssues(): Issue[] {
  return this.issueTypes;
}

  get totalPages(): number {
    return Math.ceil(this.filteredIssues.length / this.itemsPerPage);
  }

  get paginatedIssues(): Issue[] {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredIssues.slice(start, start + this.itemsPerPage);
}

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addIssueBtn(): void {
    if (this.newIssueType.trim()) {
      this.issueTypes.push({ id: this.nextId++, issue_type: this.newIssueType.trim() });
      this.newIssueType = '';
      this.currentPage = this.totalPages;
    } else {
      alert('Please enter an issue type.');
    }
  }

  onIssueAdded(issue: Omit<Issue, 'id'>) {
    if (issue.issue_type.trim()) {
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
      const updatedType = prompt('Edit Issue Type:', issue.issue_type);
      if (updatedType !== null && updatedType.trim() !== '') {
        issue.issue_type = updatedType.trim();
      }
    }
  }

  openAddIssueModal() {
    this.addIssue.openModal();
  }

  // 🔍 This method handles search term emitted by app-nav-main
  onSearchChange(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
  }
}
