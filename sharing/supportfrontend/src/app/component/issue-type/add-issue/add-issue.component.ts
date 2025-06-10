import { Component, EventEmitter, Output } from '@angular/core';

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

  addIssue() {
    console.log('Add Issue clicked:', this.newIssue);
    if(this.newIssue.issue_name.trim()){
      this.issueAdded.emit({...this.newIssue});

      this.newIssue = {issue_name: ''};

      const modalElement = document.getElementById('addIssueModal');
      if(modalElement){
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if(modalInstance){
          modalInstance.hide();
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
      }
    } else {
      alert('Please enter a issue name.');
    }
  }
        
  openModal() {
    const modalElement = document.getElementById('addIssueModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement); 
      modalInstance.show();
    }
  }
}
