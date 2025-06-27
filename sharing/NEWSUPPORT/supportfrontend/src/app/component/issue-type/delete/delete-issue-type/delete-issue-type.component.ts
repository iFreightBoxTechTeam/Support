import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'delete-issue-type',
  templateUrl: './delete-issue-type.component.html',
  styleUrls: ['./delete-issue-type.component.css']
})
export class DeleteIssueTypeComponent {
  @Output() remove_modal:EventEmitter<void> = new EventEmitter<void>();
  @Output() delete_user:EventEmitter<void> = new EventEmitter<void>();
  removeModal(){
    this.remove_modal.emit();
  }
  deleteIssueType(){
    this.delete_user.emit();
  }
}
