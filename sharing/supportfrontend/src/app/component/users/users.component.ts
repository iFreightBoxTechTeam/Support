import { Component, ViewChild, OnInit } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';

interface User {
  id: number;
  name: string;
  mobile: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @ViewChild('addUserComponent') addUserComponent!: AddUserComponent;

  searchQuery: string = '';
  nextId = 200;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  users: User[] = [
    { id: 101, name: 'Riddhi Gonji', mobile: '7896457896', email: 'riddhi2gmail.com', address: 'Panvel' },
    { id: 102, name: 'Vijaya Chikane', mobile: '9875647854', email: 'vijaya@gmail.com', address: 'Thane' },
    { id: 103, name: 'Parul Mishra', mobile: '7854698754', email: 'shreya@gmail.com', address: 'Nala Sopara' },
    { id: 104, name: 'Aaditya', mobile: '9654789444', email: 'aaditya@gmail.com', address: 'Borivali' },
    { id: 105, name: 'Vijaya Lakshmi', mobile: '7896845325', email: 'Vijayalakshmi@gmail.com', address: 'Goregaon' },
    { id: 106, name: 'Priya', mobile: '9785412236', email: 'priya@gmail.com', address: 'Mira Road' },
    { id: 122, name: 'Fahim', mobile: '9875647854', email: 'Fahim@gmail.com', address: 'Dashir' },
    { id: 134, name: 'Siddhart', mobile: '9875647854', email: 'sidhu@gmail.com', address: 'Mira road' },
    { id: 152, name: 'Krishna', mobile: '9875647854', email: 'krishna@gmail.com', address: 'Mira road' },
    { id: 144, name: 'Vijaya Chikane', mobile: '9875647854', email: 'vijaya@gmail.com', address: 'Thane' },
    { id: 155, name: 'Kevin', mobile: '9875647854', email: 'kevin@gmail.com', address: 'Gujarat' },
    { id: 162, name: 'Bhavesh', mobile: '9875647854', email: 'bhavesha@gmail.com', address: 'Thane' },
    { id: 172, name: 'Virat', mobile: '9875647854', email: 'virat@gmail.com', address: 'Delhi' },
    { id: 182, name: 'Mahindra', mobile: '9875647854', email: 'mahi@gmail.com', address: 'Ranchi' },
    { id: 192, name: 'Rohit', mobile: '9875647854', email: 'rohit@gmail.com', address: 'Dadar' },
  ];

  ngOnInit() {
    this.searchQuery = '';
  }

  get filteredUsers(): User[] {
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openAddUserModal() {
    this.addUserComponent.openModal();
  }

  onSearchChange(newSearch: string) {
    this.searchQuery = newSearch;
    this.currentPage = 1;
  }

  onUserAdded(user: Omit<User, 'id'>) {
    if (user.name.trim()) {
      this.users.push({
        id: this.nextId++,
        ...user,
      });
      this.currentPage = this.totalPages;
    }
  }

  editUser(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      const updated = prompt('Edit Name:', user.name);
      if (updated !== null && updated.trim() !== '') {
        user.name = updated.trim();
      }
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }
}
