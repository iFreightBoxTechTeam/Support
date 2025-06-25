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

  // newStatus: Status = {
  //   StatusId: 0,
  //   StatusName: ''
  // };

   newStatus: Status = {
    StatusId: '',
    StatusName: ''
  };

  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  constructor(private statusService: StatusService) {}

  // ngAfterViewInit() {
  //   const modalElement = document.getElementById('addStatusModal');
  //   if (modalElement) {
  //     this.modalInstance = new bootstrap.Modal(modalElement);
  //   }
  // }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     const modalElement = document.getElementById('addStatusModal');
  //     if (modalElement) {
  //       this.modalInstance = new bootstrap.Modal(modalElement);
  //     }
  //   });
  // }

  ngAfterViewInit() {
    setTimeout(() => {
      const modalElement = document.getElementById('addStatusModal');
      if (modalElement) {
        this.modalInstance = new (window as any).bootstrap.Modal(modalElement, {
          backdrop: 'static',
          keyboard: false
        });
      } else {
        console.error('Modal element not found.');
      }
    });
  }

  openModal(status?: Status) {
    if (status) {
      this.isEditMode = true;
      this.newStatus = { ...status };  
    } else {
      this.isEditMode = false;
      // this.newStatus = { StatusId: this.nextId++, StatusName: '' };
      this.newStatus = { StatusId: '', StatusName: '' };
    }
    this.modalInstance?.show();
  }


//  addStatus() {
//     if (this.newStatus.StatusName.trim()) {
//       if (this.isEditMode) {
//         this.statusUpdated.emit({ ...this.newStatus });
//       } else {
//         this.statusAdded.emit({ ...this.newStatus });
//       }
//       this.modalInstance?.hide();
//     } else {
//       alert('Please enter a status name.');
//     }
//   }

 addStatus() {
  const trimmedName = this.newStatus.StatusName?.trim();

  if (!trimmedName) {
    alert('Please enter a status name.');
    return;
  }
  this.newStatus.StatusName = trimmedName;
  if (this.isEditMode && this.newStatus.StatusId) {
    this.statusUpdated.emit({ ...this.newStatus });
  } else {
    // Emit with empty GUID (backend will generate one)
    this.statusAdded.emit({ StatusId: '', StatusName: this.newStatus.StatusName });
  }
  this.modalInstance?.hide();
}

  closeModal() {
    this.modalInstance?.hide();
  }

}
