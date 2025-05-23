// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   standalone: true,
//   imports: [],
//   templateUrl: './user.component.html',
//   styleUrl: './user.component.css'
// })
// export class UserComponent {

// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']  // Corrected property: `styleUrls` instead of `styleUrl`
})
export class UserComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Form Submitted', {
      name: this.name,
      email: this.email,
      password: this.password
    });
  }

  
}
