import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';

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
  nextId = 200; // Make sure this is greater than the current max ID

  // Full list of users
  users = [
    {
      id: 101, name: 'Riddhi Gonji', mobile: '7896457896', email: 'riddhi2gmail.com', address: 'Panvel'
    },
    {
      id: 102, name: 'Vijaya Chikane', mobile: '9875647854', email: 'vijaya@gmail.com', address: 'Thane'
    },
    {
      id: 103, name: 'Parul Mishra', mobile: '7854698754', email: 'shreya@gmail.com', address: 'Nala Sopara'
    },
    {
      id: 104, name: 'Aaditya', mobile: '9654789444', email: 'aaditya@gmail.com', address: 'Borivali'
    },
    {
      id: 105, name: 'Vijaya Lakshmi', mobile: '7896845325', email: 'Vijayalakshmi@gmail.com', address: 'Goregaon'
    },
    {
      id: 106, name: 'Priya', mobile: '9785412236', email: 'priya@gmail.com', address: 'Mira Road'
    },
    {
      id: 122, name: 'Fahim', mobile: '9875647854', email: 'Fahim@gmail.com', address: 'Dashir'
    },
    {
      id: 134, name: 'Siddhart', mobile: '9875647854', email: 'sidhu@gmail.com', address: 'Mira road'
    },
    {
      id: 152, name: 'Krishna', mobile: '9875647854', email: 'krishna@gmail.com', address: 'Mira road'
    },
    {
      id: 144, name: 'Vijaya Chikane', mobile: '9875647854', email: 'vijaya@gmail.com', address: 'Thane'
    },
    {
      id: 155, name: 'Kevin', mobile: '9875647854', email: 'kevin@gmail.com', address: 'Gujarat'
    },
    {
      id: 162, name: 'Bhavesh', mobile: '9875647854', email: 'bhavesha@gmail.com', address: 'Thane'
    },
    {
      id: 172, name: 'Virat', mobile: '9875647854', email: 'virat@gmail.com', address: 'Delhi'
    },
    {
      id: 182, name: 'Mahindra', mobile: '9875647854', email: 'mahi@gmail.com', address: 'Ranchi'
    },
    {
      id: 192, name: 'Rohit', mobile: '9875647854', email: 'rohit@gmail.com', address: 'Dadar'
    },
  ];

  // Pagination settings
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addUserBtn(): void {
    if (this.newUserAdd.trim()) {
      this.users.push({
        id: this.nextId++,
        name: this.newUserAdd.trim(),
        mobile: '',
        email: '',
        address: ''
      });
      this.newUserAdd = '';

    // Move to last page automatically after adding
      this.currentPage = this.totalPages;
    } else {
      alert('Please enter a user name.');
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);

    // Prevent staying on empty page after deletion
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
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

  @ViewChild(AddUserComponent) addUser!: AddUserComponent;

  openAddUserModal() {
    this.addUser.openModal();
  }
}
