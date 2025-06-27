import { Component, EventEmitter, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  @Output() remove_modal:EventEmitter<void> = new EventEmitter<void>();
  @Output() delete_user:EventEmitter<void> = new EventEmitter<void>();
  removeModal(){
    this.remove_modal.emit();
  }
  deleteUser(){
    this.delete_user.emit();
  }
}
