import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private router: Router) {}

  @ViewChild(AddUserComponent) addUser!: AddUserComponent;

  searchQuery: string = '';
  newUserAdd: string = '';
  nextId = 200;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  users = [
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
    { id: 192, name: 'Rohit', mobile: '9875647854', email: 'rohit@gmail.com', address: 'Dadar' }
  ];

  ngOnInit() {
    this.searchQuery = '';
  }

  // Filter users by searchQuery (case insensitive)
  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Calculate total pages from filtered results
  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  // Return users for current page after filtering
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  // Change current page with bounds check
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Add a new user to the list
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
      this.currentPage = this.totalPages; // move to last page to show new user
    } else {
      alert('Please enter a user name.');
    }
  }

  // Delete user by id and adjust current page if necessary
  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  // Edit user name by id with prompt dialog
  editUser(id: number): void {
    const user = this.users.find(u => u.id === id);
    if (user) {
      const updated = prompt('Edit Name:', user.name);
      if (updated !== null && updated.trim() !== '') {
        user.name = updated.trim();
      }
    }
  }

  // Open modal from child AddUserComponent (needs implementation in AddUserComponent)
  openAddUserModal() {
    this.addUser.openModal();
  }

  // Search input changed - update searchQuery and reset page to 1
  onSearchChange(newSearch: string) {
    this.searchQuery = newSearch;
    this.currentPage = 1;
  }
}
