import { Component } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})


export class MasterComponent {
  showIssueModal = false;

  openIssueModal(event: Event): void {
    event.preventDefault(); // Prevent actual navigation
    this.showIssueModal = true;
  }

  closeIssueModal(): void {
    this.showIssueModal = false;
  }
}
  