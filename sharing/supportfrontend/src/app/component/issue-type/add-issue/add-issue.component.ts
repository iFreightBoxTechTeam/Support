import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { IssueTypeService } from 'src/app/issue-type.service';

declare var bootstrap: any;

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent {
  @Output() issueAdded = new EventEmitter<any>();
  @Output() issueUpdated = new EventEmitter<any>();

  modalInstance: any;
  isEditMode: boolean = false;

 newIssue: {
  id?: number | string,
  issue_name: ''
} = { issue_name: '' };

   ngAfterViewInit() {
    const modalElement = document.getElementById('addIssueModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  constructor(private issueService: IssueTypeService) {}

  openModal(issue?: any) {
    if (issue) {
      this.isEditMode = true;
      this.newIssue = { id: issue.Id, issue_name: issue.Issue_Type };
    } else {
      this.isEditMode = false;
      this.newIssue = { issue_name: '' };
    }

    const modalElement = document.getElementById('addIssueModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  addIssue() {
    const trimmedName = this.newIssue.issue_name.trim();

    if (!trimmedName) {
      alert('Please enter an issue name.');
      return;
    }

    if (this.isEditMode && this.newIssue.id != null) {
      // Update issue
      this.issueService.updateIssue(Number(this.newIssue.id), { Issue_Type: trimmedName }).subscribe({
        next: (res) => {
          console.log('Issue updated successfully:', res);
          this.issueUpdated.emit(res);
          this.closeModal();
          this.newIssue = { issue_name: '' };
        },
        error: (err) => {
          console.error('Error updating issue:', err);
          alert('Failed to update issue.');
        }
      });
    } else {
      // Add new issue
      this.issueService.addIssue({ Issue_Type: trimmedName }).subscribe({
        next: (res) => {
          console.log('Issue added successfully:', res);
          this.issueAdded.emit(res);
          this.closeModal();
          this.newIssue = { issue_name: '' };
        },
        error: (err) => {
          console.error('Error adding issue:', err);
          alert('Failed to add issue.');
        }
      });
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }
}
