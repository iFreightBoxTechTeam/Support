import { Component } from '@angular/core';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent {
  showIssueModal = true; // Set to true for initial testing (set false to hide initially)

  issueTypes = [
    { id: 101, type: 'Bug' },
    { id: 102, type: 'New Development' },
    { id: 103, type: 'Doubt' }
  ];

  newIssueType: string = '';
  nextId = 104;

  openModal(): void {
    this.showIssueModal = true;
  }

  closeIssueModal(): void {
    this.showIssueModal = false;
  }

  addIssueBtn(): void {
    console.log('User typed:', this.newIssueType);
     
    if (this.newIssueType.trim()) {
      this.issueTypes.push({ id: this.nextId++, type: this.newIssueType.trim() });
      this.newIssueType = '';
    } else {
      alert('Please enter an issue type.');
    }
  }

  deleteIssue(id: number): void {
    this.issueTypes = this.issueTypes.filter(item => item.id !== id);
  }

  editIssue(id: number): void {
    const existing = this.issueTypes.find(i => i.id === id);
    if (existing) {
      const updated = prompt('Edit Issue Type:', existing.type);
      if (updated !== null && updated.trim() !== '') {
        existing.type = updated.trim();
      }
    }
  }
}