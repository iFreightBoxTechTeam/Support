import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private router: Router) {}

  goToMasters() {
    this.router.navigate(['/mastercompo']);
  }

  newUserAdd: string = '';
  nextId = 106; // 106 because you already used up to 105

  users = [  // <-- Fix: remove `const` and make it a class property
    {
      id: 101,
      name: 'Riddhi Gonji',
      mobile: '7896457896',
      email: 'riddhi2gmail.com',
      address: 'Panvel'
    },
    {
      id: 102,
      name: 'Vijaya Chikane',
      mobile: '9875647854',
      email: 'vijaya@gmail.com',
      address: 'Thane'
    },
    {
      id: 103,
      name: 'Parul Mishra',
      mobile: '7854698754',
      email: 'shreya@gmail.com',
      address: 'Nala Sopara'
    },
    {
      id: 104,
      name: 'Aaditya',
      mobile: '9654789444',
      email: 'aaditya@gmail.com',
      address: 'Borivali'
    },
    {
      id: 105,
      name: 'Vijaya Lakshmi',
      mobile: '7896845325',
      email: 'Vijayalakshmi@gmail.com',
      address: 'Goregaon'
    },
    {
      id: 106,
      name: 'Priya',
      mobile: '9785412236',
      email: 'priya@gmail.com',
      address: 'Mira Road'
    }
  ];

  addUserBtn(): void {
    console.log('User typed:', this.newUserAdd);

    if (this.newUserAdd.trim()) {
      this.users.push({
        id: this.nextId++,
        name: this.newUserAdd.trim(),
        mobile: '',
        email: '',
        address: ''
      });
      this.newUserAdd = '';
    } else {
      alert('Please enter a user name.');
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }

  editUser(id: number): void {
    const user = this.users.find(u => u.id === id);
    if (user) {
      const updated = prompt('Edit Name:', user.name);
      if (updated !== null && updated.trim() !== '') {
        user.name = updated.trim();
      }
    }
  }
}
