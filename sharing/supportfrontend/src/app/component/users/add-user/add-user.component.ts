import { Component, EventEmitter, Output } from '@angular/core';
import { User, UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
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

  private resetForm() {
    this.newUser = {
      name: '',
      mobile: '',
      email: '',
      addresh: '',
      issuesid: 0,
    };
  }
}
