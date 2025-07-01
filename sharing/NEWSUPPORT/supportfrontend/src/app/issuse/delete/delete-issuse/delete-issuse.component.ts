import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-issuse',
  templateUrl: './delete-issuse.component.html',
  styleUrls: ['./delete-issuse.component.css']
})
export class DeleteIssuseComponent {
  @Output() remove_modal:EventEmitter<void> = new EventEmitter<void>();
  @Output() delete_issuse:EventEmitter<void> = new EventEmitter<void>();
  removeModal(){
    this.remove_modal.emit();
  }
  deleteIssuse(){
    this.delete_issuse.emit();
  }
}

