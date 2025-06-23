import { Component, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Status, StatusService } from 'src/app/status.service';
 // adjust path as needed

declare var bootstrap: any;

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent implements AfterViewInit {
  @Output() statusAdded = new EventEmitter<Status>();
  @Output() statusUpdated = new EventEmitter<Status>();

  modalInstance: any;
  isEditMode: boolean = false;

  newStatus: Status = {
    id: 0,
    StatusName: ''
  };

  constructor(private statusService: StatusService) {}

  ngAfterViewInit() {
    const modalElement = document.getElementById('addStatusModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  private nextId = 201;

openModal(status?: Status) {
  if (status) {
    this.isEditMode = true;
    this.newStatus = { ...status };  // ❗ CHECK HERE
  } else {
    this.isEditMode = false;
    this.newStatus = { id: this.nextId++, StatusName: '' };
  }
  this.modalInstance?.show();
}

addStatus() {
  console.log('Submitting new status:', this.newStatus);  // debug log
if (this.isEditMode) {
  if (!this.newStatus.id) {
    console.error('Missing status ID!');
    alert('Error: Status ID is missing for update.');
    return;
  }
      }
    }
//  addStatus() {

//     if (this.newUser.name.trim()) {

//       if (this.isEditMode) {

//         this.statusUpdated.emit({ ...this.newUser });

//       } else {

//         this.statusAdded.emit({ ...this.newUser });

//       }

//       this.modalInstance?.hide();

//     } else {

//       alert('Please enter a status name.');

//     }

//   }
  closeModal() {
    this.modalInstance?.hide();
  }
}
