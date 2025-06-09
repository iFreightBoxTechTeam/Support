import { Component, Output, EventEmitter } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<any>();

  newUser = {
    name: '',
    mobile: '',
    email: '',
    address: ''
  };

  addUser() {
    if (this.newUser.name.trim()) {
      this.userAdded.emit({ ...this.newUser });

      this.newUser = { name: '', mobile: '', email: '', address: '' };

      const modalElement = document.getElementById('addUserModal');
      if (modalElement) {
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
      }
    } else {
      alert('Please enter a name.');
    }
  }

  openModal() {
    const modalElement = document.getElementById('addUserModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
}
