import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-status',
  templateUrl: './delete-status.component.html',
  styleUrls: ['./delete-status.component.css']
})
export class DeleteStatusComponent {
  @Output() remove_modal:EventEmitter<void> = new EventEmitter<void>();
  @Output() delete_user:EventEmitter<void> = new EventEmitter<void>();
  removeModal(){
    this.remove_modal.emit();
  }
  deleteStatus(){
    this.delete_user.emit();
  }
}
