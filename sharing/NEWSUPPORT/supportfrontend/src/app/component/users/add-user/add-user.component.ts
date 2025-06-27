
import { Component, EventEmitter, Output } from '@angular/core';
import { User, UserService } from 'src/app/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
[x: string]: any;
  @Output() userAdded = new EventEmitter<any>();
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

  onAddUser(){
    this.newUser = {

    name: '',
    mobile: '',
    email: '',
   
    addresh: '',
    issuesid: 0,
  };
    this.showModal = true
  }



  addUser(): void {
    // console.log('Payload to send:', this.newUser);
    this.closeModal();
    const payload = {
      Name: this.newUser.name,
      Mobile_number: this.newUser.mobile,
      Email: this.newUser.email,
      Addresh: this.newUser.addresh,
    };
//     const payload = {
//   "Name": "Pratish",
//   "Email": "pra@gmail.com",
//   "Addresh": "Delhi",
//   "Mobile_number": "9876543210"
// }
    // const jsonString = JSON.stringify(payload);
    console.log(payload);
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
        console.log("hi");
        this.closeModal();
      });
    }
  }


 
 
}
