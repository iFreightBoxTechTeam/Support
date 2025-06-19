// import { Component, ViewChild, OnInit } from '@angular/core';
// import { AddUserComponent } from './add-user/add-user.component';
// import { HttpClient } from '@angular/common/http';

// interface User {
//   id: number;
//   name: string;
//   mobile: string;
//   email: string;
//   address: string;
// }

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css'],
// })
// export class UsersComponent implements OnInit {
  
//  @ViewChild('addUserComponent') addUserComponent!: AddUserComponent;

//   searchQuery: string = '';
//   nextId = 200;

//   currentPage: number = 1;
//   itemsPerPage: number = 5;

//   users: any[] = [] ;
//    constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.searchQuery = '';
//     this.loaduser();
//   }
//   loaduser() {

//   const apiUrl ='https://localhost:44321/api/values/users';

//   this.http.get<any[]>(apiUrl).subscribe(data => {

//     console.log('issue',  data)
//     if (data) {
//       this.users = data

//       ;
//       console.log("API Response:", data);
//     } else {
//       console.warn('Issue not found');
//     }
//   }, error => {
//     console.error('Error fetching from API:', error);
//   });
// }


//   get filteredUsers(): User[] {
//     return this.users.filter(user =>
//   user.name?.toLowerCase().includes(this.searchQuery)


//     );
//   }

//   get totalPages(): number {
//     return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
//   }

//   get paginatedUsers(): User[] {
//     const start = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredUsers.slice(start, start + this.itemsPerPage);
//   }

//   changePage(page: number): void {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//     }
//   }

//    openAddUserModal() {

//      this.addUserComponent.openModal(); 

//   }

//    editUser(user: any) {

//     this.addUserComponent.openModal(user);

//   }



//   onUserUpdated(updatedUser: any) {

//     const index = this.users.findIndex(u => u.id === updatedUser.id);

//     if (index > -1) {

//       this.users[index] = updatedUser;

//     }

//   }

//   onSearchChange(newSearch: string) {
//     this.searchQuery = newSearch;
//     this.currentPage = 1;
//   }

//   onUserAdded(user: Omit<User, 'id'>) {
//     if (user.name.trim()) {
//       this.users.push({
//         id: this.nextId++,
//         ...user,
//       });
//       this.currentPage = this.totalPages;
//     }
//   }

//   deleteUser(id: number) {
//     this.users = this.users.filter((user) => user.id !== id);
//     if (this.currentPage > this.totalPages) {
//       this.currentPage = this.totalPages || 1;
//     }
//   }
// }


import { Component, ViewChild, OnInit } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { User, UserService } from 'src/app/user.service';


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
  itemsPerPage: number = 10;

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.searchQuery = '';
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log("API Response:", data);
        this.users = data;
          
  console.log("API Response:", data);
        
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  get filteredUsers(): User[] {
    return this.users.filter(user =>
      user.Name?.toLowerCase().includes(this.searchQuery.toLowerCase())
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
  closeAddUserModal(value: boolean) {
  }
  editUser(user: User) {
    this.addUserComponent.openModal(user);
  }

  onUserUpdated(updatedUser: User) {
    this.userService.updateUser(updatedUser).subscribe({
      next: (user) => {
        const index = this.users.findIndex(u => u.issuesid === user.issuesid);
        if (index > -1) {
          this.users[index] = user;
        }
      },
      error: (err) => console.error('Error updating user:', err)
    });
  }

 onUserAdded(user: Omit<User, 'id'>) {
  if (user.Name.trim()) {
    this.userService.addUser(user).subscribe({
      next: (newUser) => {
        this.users.push(newUser);
        this.currentPage = this.totalPages;
      },
      error: (err) => console.error('Error adding user:', err)
    });
  }
}

deleteUser(id: number) {
  this.userService.deleteUser(id).subscribe({
    next: () => {
      this.users = this.users.filter(user => user.issuesid !== id);
    },
    error: err => console.error('Error deleting user:', err)
  });
}

  onSearchChange(newSearch: string) {
    this.searchQuery = newSearch;
    this.currentPage = 1;
    this.users = this.filteredUsers;
  }
}


