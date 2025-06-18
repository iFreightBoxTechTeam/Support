import { Component, ViewChild, OnInit, DoCheck } from '@angular/core';
import { AddUserComponent } from './add-user/add-user.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';

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
export class UsersComponent implements OnInit , DoCheck {
  @ViewChild('addUserComponent') addUserComponent!: AddUserComponent;

  searchQuery: string = '';
  nextId = 200;

  currentPage: number = 1;
  itemsPerPage: number = 5;

  AddModal: boolean = false;
  onEditMode:boolean = false;



  Users: any[] = this.user_serve.users;

 
  constructor(private http: HttpClient , private user_serve: UserService) { }

  ngOnInit() {
    this.searchQuery = '';
    this.loaduser();
  }

   ngDoCheck(){
    // this.Users = this.user_serve.users;
    // console.log(this.Users);
  }

  loaduser() {

    const apiUrl = 'https://localhost:44321/api/values/users';

    this.http.get<any[]>(apiUrl).subscribe(data => {

      console.log('issue', data)
      if (data) {
        this.Users = data

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
    return this.Users.filter(user =>
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

  openAddUserModal(value: boolean) {
    this.AddModal = value;

    // this.addUserComponent.openModal();

  }

  edit_user:any ;

  editUser(user: any) {
    this.AddModal = true;
    this.onEditMode = true;
    this.edit_user = user

  }



  onUserUpdated(updatedUser: any) {

    const index = this.Users.findIndex(u => u.id === updatedUser.id);

    if (index > -1) {

      this.user_serve.users[index] = updatedUser;

    }

    console.log(updatedUser);

  }

  onSearchChange(newSearch: string) {
    this.searchQuery = newSearch;
    this.currentPage = 1;
  }

  onUserAdded(user: any) {
    if (user.name.trim()) {
      this.user_serve.users.push(user);
      this.currentPage = this.totalPages;
    }
    console.log(user);
  }


  deleteUser(user_obj:any) {
    this.user_serve.users = this.user_serve.users.filter((x)=>x!==user_obj)
    this.Users = this.user_serve.users;
  //   if (this.currentPage > this.totalPages) {
  //     this.currentPage = this.totalPages || 1;
  //   }
  console.log(this.Users);
  }
}


