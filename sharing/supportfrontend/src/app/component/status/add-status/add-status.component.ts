import {Component, EventEmitter, Output, AfterViewInit} from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})

export class AddStatusComponent implements AfterViewInit {
  @Output() statusAdded = new EventEmitter<any>();

   @Output() statusUpdated = new EventEmitter<any>();

  modalInstance: any;
  isEditMode: boolean = false;

  newStatus = {
    id: 0,
    status_name: ''
  };

  ngAfterViewInit() {
    const modalElement = document.getElementById('addStatusModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  openModal(status?: any) {
    if (status) {
      this.isEditMode = true;
      this.newStatus = { ...status };
    } else {
      this.isEditMode = false;
      this.newStatus = { id: 0, status_name: '' };
    }
    this.modalInstance?.show();
  }


addStatus() {

    if (this.newStatus.status_name.trim()) {
      if (this.isEditMode) {
        this.statusUpdated.emit({ ...this.newStatus });
      } else {
        this.statusAdded.emit({ ...this.newStatus });
      }
      this.modalInstance?.hide();
    } else {
      alert('Please enter a Status Name.');
    }
  }

  closeModal() {
    this.modalInstance?.hide();
  }

}
