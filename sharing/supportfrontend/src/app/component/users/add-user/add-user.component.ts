import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements AfterViewInit {
  @Output() userAdded = new EventEmitter<any>();

  newUser = {
    name: '',
    mobile: '',
    email: '',
    address: ''
  };

  modalInstance: any;

  ngAfterViewInit() {
    const modalElement = document.getElementById('addUserModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  addUser() {
    if (this.newUser.name.trim()) {
      this.userAdded.emit({ ...this.newUser });
      this.newUser = { name: '', mobile: '', email: '', address: '' };
      this.modalInstance?.hide();

      // Optional: Remove backdrop manually if it still lingers
      setTimeout(() => {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
      }, 300);
    } else {
      alert('Please enter a name.');
    }
  }

  openModal() {
    this.modalInstance?.show();
  }

  closeModal() {
    this.modalInstance?.hide();
  }
}
