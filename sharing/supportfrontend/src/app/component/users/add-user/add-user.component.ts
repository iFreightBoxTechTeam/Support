import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';


declare var bootstrap: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements AfterViewInit ,OnInit{
  constructor(private user : UserService){};

  @Output() userAdded = new EventEmitter<any>();

  @Output() userUpdated = new EventEmitter<any>();

  @Input() editVal:any;

  newUser = {
    id: 0,
    name: '',
    mobile: '',
    email: '',
    address: ''
  };

  ngOnInit(){
    if(this.isEditMode){
      this.newUser.name = this.editVal.name;
      this.newUser.mobile = this.editVal.mobile;
      this.newUser.email = this.editVal.email;
      this.newUser.address = this.editVal.address;
    }
  }

  @Output() removeModal:EventEmitter<boolean> = new EventEmitter<boolean>()

  // modalInstance: any;
  @Input() isEditMode: boolean = false;

  ngAfterViewInit() {
    
  }

 private nextId = 201;

  addUser() {
    if (this.newUser.name.trim()) {
      if (this.isEditMode) {
        
        this.newUser ={ id: this.editVal.id,  name: this.newUser.name, mobile: this.newUser.mobile, email: this.newUser.email, address: this.newUser.address };
        this.userUpdated.emit({ ...this.newUser });
      } else {
        this.newUser ={ id: this.user.currentId+1,  name: this.newUser.name, mobile: this.newUser.mobile, email: this.newUser.email, address: this.newUser.address };
        this.user.currentId++;
        this.userAdded.emit({ ...this.newUser });
      }
      this.closeModal();
    } else {
      alert('Please enter a name.');
    }
  }

  editUser(){
    this.isEditMode = true;
  }


  closeModal() {
    this.removeModal.emit(false);
  }
}
