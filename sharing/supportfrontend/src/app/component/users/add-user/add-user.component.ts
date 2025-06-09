import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newUser = {
    name: '',
    mobile: '',
    email: '',
    address: ''
  };

  addUser() {
    console.log('Add user clicked:', this.newUser);
    // Add save logic here
  }

  openModal() {
    console.log('Opening modal...');
    // implement modal logic if needed
  }
}
