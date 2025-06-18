// import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


// declare var bootstrap: any;

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.css']
// })
// export class AddUserComponent implements AfterViewInit {

//   @Output() userAdded = new EventEmitter<any>();

//   @Output() userUpdated = new EventEmitter<any>();

//   newUser = {
//     id: 0,
//     name: '',
//     mobile: '',
//     email: '',
//     address: ''
//   };

//   modalInstance: any;
//   isEditMode: boolean = false;

//   ngAfterViewInit() {
//     const modalElement = document.getElementById('addUserModal');
//     if (modalElement) {
//       this.modalInstance = new bootstrap.Modal(modalElement);
//     }
//   }

//  private nextId = 201;

// openModal(user?: any) {
//   if (user) {
//     this.isEditMode = true;
//     this.newUser = { ...user };
//   } else {
//     this.isEditMode = false;
//     this.newUser = { id: this.nextId++, name: '', mobile: '', email: '', address: '' };
//   }

  // Show the modal
//   this.modalInstance?.show();
// }
//   addUser() {
//     if (this.newUser.name.trim()) {
//       if (this.isEditMode) {
//         this.userUpdated.emit({ ...this.newUser });
//       } else {
//         this.userAdded.emit({ ...this.newUser });
//       }
//       this.modalInstance?.hide();
//     } else {
//       alert('Please enter a name.');
//     }
//   }


//   closeModal() {
//     this.modalInstance?.hide();
 

// } }



import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


declare var bootstrap: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements AfterViewInit {

  @Output() userAdded = new EventEmitter<any>();

  @Output() userUpdated = new EventEmitter<any>();

  newUser = {
    id: 0,
    name: '',
    mobile: '',
    email: '',
    address: ''
  };

  modalInstance: any;
  isEditMode: boolean = false;

  ngAfterViewInit() {
    const modalElement = document.getElementById('addUserModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

 private nextId = 201;

openModal(user?: any) {
  if (user) {
    this.isEditMode = true;
    this.newUser = { ...user };
  } else {
    this.isEditMode = false;
    this.newUser = { id: this.nextId++, name: '', mobile: '', email: '', address: '' };
  }

    this.modalInstance?.show();
}
  addUser() {
    if (this.newUser.name.trim()) {
      if (this.isEditMode) {
        this.userUpdated.emit({ ...this.newUser });
      } else {
        this.userAdded.emit({ ...this.newUser });
      }
      this.modalInstance?.hide();
    } else {
      alert('Please enter a name.');
    }
  }


  closeModal() {
    this.modalInstance?.hide();
 

} }