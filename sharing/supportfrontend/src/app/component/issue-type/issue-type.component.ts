import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent implements AfterViewInit {
  @ViewChild('addUserModal') addUserModalRef!: ElementRef;
  @ViewChild('addIssueModal') addIssueModalRef!: ElementRef;

  addUserModal: any;
  addIssueModal: any;

  // Change this based on the page — could come from router
  currentPage = 'issue';

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

  selectedIssueType: string = '';
  userName: string = '';

  ngAfterViewInit() {
    this.addUserModal = new bootstrap.Modal(this.addUserModalRef.nativeElement);
    this.addIssueModal = new bootstrap.Modal(this.addIssueModalRef.nativeElement);
  }

  openModal() {
    if (this.currentPage === 'user') {
      this.addUserModal.show();
    } else if (this.currentPage === 'issue') {
      this.addIssueModal.show();
    }
  }

  saveUser() {
    console.log('User saved:', this.userName);
    this.userName = '';
    this.addUserModal.hide();
  }

  saveIssueType() {
    if (this.selectedIssueType.trim()) {
      console.log('Issue type saved:', this.selectedIssueType);
      this.selectedIssueType = '';
      this.addIssueModal.hide();
    } else {
      alert('Please select or enter an issue type.');
    }
  }
}
