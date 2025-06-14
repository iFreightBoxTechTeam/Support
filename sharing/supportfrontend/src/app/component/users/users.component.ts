import { Component, ViewChild, OnInit } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { HttpClient } from '@angular/common/http';

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

  users: any[] = [] ;
   constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchQuery = '';
    this.loaduser();
  }
  loaduser() {

  const apiUrl ='https://localhost:44321/api/values/users';

  this.http.get<any[]>(apiUrl).subscribe(data => {

    console.log('issue',  data)
    if (data) {
      this.users = data

      ;
      console.log("API Response:", data);
    } else {
      console.warn('Issue not found');
    }
  }, error => {
    console.error('Error fetching from API:', error);
  });
}


  get filteredUsers(): User[] {
    return this.users.filter(user =>
  user.name?.toLowerCase().includes(this.searchQuery)


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

  

 editUser(id: number): void {
  const issue = this.users.find(i => i.Id === id);
  if (issue) {
    const updatedType = prompt('Edit Issue Type:', issue.Issue_Type);
    if (updatedType !== null && updatedType.trim() !== '') {
      const apiUrl = `https://localhost:44321/api/values/users/${id}`;
      const updatedData = { Issue_Type: updatedType.trim() };

      this.http.put(apiUrl, updatedData).subscribe({
        next: () => {
          issue.Issue_Type = updatedType.trim(); // update locally too
          console.log('Issue updated successfully.');
        },
        error: (err) => {
          console.error('Error updating issue:', err);
          alert('Failed to update issue.');
        }
      });
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
