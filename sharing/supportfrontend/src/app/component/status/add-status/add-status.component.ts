import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})

export class AddStatusComponent{
  @Output() statusAdded = new EventEmitter<any>();
  // @ViewChild('addStatusModal') addStatusModalRef!: ElementRef;
  modalInstance: any;

  newStatus = {
    status_name: ''
  };

  ngAfterViewInit() {
    const modalElement = document.getElementById('addStatusModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  addStatus() {
    console.log('Add Status clicked:', this.newStatus);
    if(this.newStatus.status_name.trim()){
      this.statusAdded.emit({...this.newStatus});

      this.newStatus = {status_name: ''};

      const modalElement = document.getElementById('addStatusModal');
      if(modalElement){
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if(modalInstance){
          modalInstance.hide();
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
      }
    } else {
      alert('Please enter a status name.');
    }
  }
        
  // openModal() {
  //   const modalElement = document.getElementById('addStatusModal');
  //   if (modalElement) {
  //     const modalInstance = new bootstrap.Modal(modalElement); 
  //     modalInstance.show();
  //   }
  // }

  openModal() {
    this.modalInstance?.show();
  }

  closeModal() {
    this.modalInstance?.hide();
  }
}
