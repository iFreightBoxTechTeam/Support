
import { Component, EventEmitter, Output } from '@angular/core';
import { User, UserService } from 'src/app/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<User>();
  @Output() userUpdated = new EventEmitter<User>();

  isEditMode: boolean = false;
  showModal: boolean = false;

  newUser = {

    name: '',
    mobile: '',
    email: '',
   
    addresh: '',
    issuesid: 0,
  };


  constructor(private userService: UserService) {}

  openModal(): void {
    this.resetForm();
    this.isEditMode = false;
    this.showModal = true;
  }
  resetForm() {
    throw new Error('Method not implemented.');
  }

  closeModal(): void {
    this.showModal = false;
  }


  editExistingUser(user: User): void {
    this.isEditMode = true;

    this.newUser = {
      name: user.Name,
      mobile: user.Mobile_number,
      email: user.Email,
      addresh: user.Addresh,
      issuesid: user.issuesid,
    };
    this.showModal = true;
  }

  addUser(): void {
    console.log('Payload to send:', this.newUser);

    const payload = {
      Name: this.newUser.name,
      Mobile_number: this.newUser.mobile,
      Email: this.newUser.email,
      Addresh: this.newUser.addresh,
    };

    if (this.isEditMode) {
      const updatePayload: User = {
        issuesid: this.newUser.issuesid,
        ...payload,
      };

      this.userService.updateUser(updatePayload).subscribe((updatedUser) => {
        this.userUpdated.emit(updatedUser);
        this.closeModal();
      });
    } else {

      this.userService.addUser(payload).subscribe((createdUser) => {
        this.userAdded.emit(createdUser);
        this.closeModal();
      });
    }
  }

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
//  @Input()  editVal: any;

//   ngOnInit(){
//     if(this.isEditMode){
//       this.newUser.name = this.editVal.name;
//       this.newUser.mobile = this.editVal.mobile;
//       this.newUser.email = this.editVal.email;
//       this.newUser.address = this.editVal.address;
//     }
//   }

//   @Output() removeModal:EventEmitter<boolean> = new EventEmitter<boolean>()

//   modalInstance: any;
//   @Input() isEditMode:any;

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

//     this.modalInstance?.show();
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
 
 
}
