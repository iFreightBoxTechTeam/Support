import { Component, OnInit } from '@angular/core';
import { IssueType, IssueTypeService } from '../services/issue-type.service';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent implements OnInit {
  issueTypes: IssueType[] = [];
  newIssueType: string = '';
  selectedIssueType: IssueType | null = null;
  editIssueType: string = '';
  

  constructor(private issueTypeService: IssueTypeService) {}

  ngOnInit(): void {
    this.loadIssueTypes();
  }

  loadIssueTypes(): void {
    this.issueTypeService.getAll().subscribe(data => {
      this.issueTypes = data;
    });
  }

  addIssueType(): void {
    if (!this.newIssueType.trim()) return;

    this.issueTypeService.create({ issue_Type: this.newIssueType }).subscribe(() => {
      this.newIssueType = '';
      this.loadIssueTypes();
    });
  }

  edit(issue: IssueType): void {
    this.selectedIssueType = issue;
    this.editIssueType = issue.Issue_Type;
  }

  updateIssueType(): void {
    if (!this.selectedIssueType || !this.editIssueType.trim()) return;

    this.issueTypeService.update(this.selectedIssueType.Id, { issue_Type: this.editIssueType }).subscribe(() => {
      this.selectedIssueType = null;
      this.editIssueType = '';
      this.loadIssueTypes();
    });
  }

  cancelEdit(): void {
    this.selectedIssueType = null;
    this.editIssueType = '';
  }

  deleteIssueType(id: number): void {
    if (confirm('Are you sure you want to delete this issue type?')) {
      this.issueTypeService.delete(id).subscribe(() => {
        this.loadIssueTypes();
      });
    }
  }
}
