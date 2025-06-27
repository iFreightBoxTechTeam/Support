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










import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { User, UserService } from 'src/app/user.service';

import { AddUserComponent } from './add-user/add-user.component';

@Component({

  selector: 'app-user',
  templateUrl: './users.component.html', // Make sure the file name matches!
  styleUrls: ['./users.component.css']  
})


export class UserComponent implements OnInit , DoCheck {
  users: User[] = [];
  users_permanent:User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pageSize: number = 5;
  // totalPages: number = 1;
  searchQuery:string = '';
  confirm_delete:boolean = false;
  id_to_delete:any;


  @ViewChild('addUserComponent') addUserComponent!: AddUserComponent;

  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.fetchUsers();
    
  }

  ngDoCheck(): void {
     
  }



  fetchUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.users_permanent = data;
      // this.calculatePagination();
      console.log(data);
      
    });
    
  }

  get filteredUsers(): User[] {
    return this.users_permanent.filter((x)=>x.Name?.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()));
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  // calculatePagination(): void {
  //   this.totalPages = Math.ceil(this.users.length / this.pageSize);
  // }

  changePage(page: number): void {
    
    this.currentPage = page;
  }

  openAddUserModal(): void {
    this.addUserComponent.onAddUser();
  }


  onUserAdded(newUser: User): void {
    this.fetchUsers();
  }

  
  onUserUpdated(updatedUser: User): void {
    this.fetchUsers();
  }

 
  editUser(user: User): void {
    this.addUserComponent.editExistingUser(user);
  }

  undo_delete(){
    this.confirm_delete = false;

  }

  user_deleted(){
    this.confirm_delete=false;
    this.userService.deleteUser(this.id_to_delete).subscribe(() => {
        this.fetchUsers();
      });
    
  }
  deleteUser(id: number): void {
    // if (confirm('Are you sure you want to delete this user?')) {
    //   this.userService.deleteUser(id).subscribe(() => {
    //     this.fetchUsers()
    //   });
    // }
    this.confirm_delete = true;
    this.id_to_delete = id;
  }




  
  onSearchChange(searchValue: string): void {
    // Optional search handling logic here
    this.searchQuery = searchValue;
    this.currentPage = 1;
    this.users = this.filteredUsers;
  }
}
