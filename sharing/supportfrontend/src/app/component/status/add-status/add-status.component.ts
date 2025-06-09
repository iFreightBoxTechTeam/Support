import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})

export class AddStatusComponent implements AfterViewInit {
  @ViewChild('addStatusModal') modalRef!: ElementRef;
  modalInstance: any;

  newStatus = {
    status_name: ''
  };

  ngAfterViewInit() {
    this.modalInstance = new bootstrap.Modal(this.modalRef.nativeElement);
  }

  addStatus() {
    console.log('Add Status clicked:', this.newStatus);
    this.hideModal();
  }

  openModal() {
    this.modalInstance.show();
  }

  hideModal() {
    this.modalInstance.hide();
  }
}