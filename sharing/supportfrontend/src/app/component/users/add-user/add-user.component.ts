import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';


declare var bootstrap: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements AfterViewInit {

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

openModal(user?: any) {
  if (user) {
    this.isEditMode = true;
    this.newUser = { ...user };
  } else {
    this.isEditMode = false;
    this.newUser = { id: this.nextId++, name: '', mobile: '', email: '', address: '' };
  }

  // Show the modal
  this.modalInstance?.show();
}
addUser() {
  if (this.newUser.name && this.newUser.name.trim()) {
    if (this.isEditMode) {
      this.userUpdated.emit({ ...this.newUser });
    } else {
      // Don't emit undefined or incomplete object
      this.userAdded.emit({ ...this.newUser });
    }
    this.modalInstance?.hide();
  } else {
    alert('Please enter a name.');
  }
}

  editUser(){
    this.isEditMode = true;
  }


  closeModal() {
    this.modalInstance?.hide();
 

} }

