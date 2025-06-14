import { Component, EventEmitter, Output } from '@angular/core';
import { IssueTypeService } from 'src/app/issue-type.service';


declare var bootstrap: any;

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent {
 @Output() issueAdded = new EventEmitter<any>();
  modalInstance: any; 

  newIssue = {
    issue_name: ''
  };
    constructor(private issueService: IssueTypeService) {}

 
  // addIssue() {
  //   if (this.newIssue.issue_name.trim()) {
  //     const apiIssue = { Issue_Type: this.newIssue.issue_name };

  //     this.issueService.addIssue(apiIssue).subscribe({
  //       next: (res) => {
  //         console.log('Issue added successfully:', res);
  //         this.issueAdded.emit({...this.newIssue});
  //         this.newIssue = { issue_name: '' };
  //         this.closeModal();
  //       },
  //       error: (err) => {
  //         console.error('Error adding issue:', err);
  //         alert('Failed to add issue.');
  //       }
  //     });
  //   } else {
  //     alert('Please enter an issue name.');
  //   }
  // }
        
addIssue() {
  const trimmedName = this.newIssue.issue_name.trim();

  if (!trimmedName) {
    alert('Please enter an issue name.');
    return;
  }

  const apiIssue = { Issue_Type: trimmedName };

  this.issueService.addIssue(apiIssue).subscribe({
    next: (res) => {
      console.log('Issue added successfully:', res);

      // Emit the actual issue returned from backend
      this.issueAdded.emit(res);

      // Clear the form
      this.newIssue = { issue_name: '' };

      // Close modal or UI
      this.closeModal();
    },
    error: (err) => {
      console.error('Error adding issue:', err);
      alert('Failed to add issue.');
    }
  });
}

  openModal() {
    const modalElement = document.getElementById('addIssueModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
closeModal() {
    const modalElement = document.getElementById('addIssueModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      
      }}}
}



