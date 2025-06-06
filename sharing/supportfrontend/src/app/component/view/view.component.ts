import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  showModal: boolean = false;

  history = [
    { date: new Date('2025-06-01'), status: 'Open', username: 'Vijaya' },
    { date: new Date('2025-06-02'), status: 'In Progress', username: 'Shreya' },
    { date: new Date('2025-06-03'), status: 'Resolved', username: 'Riddhi' }
  ];

  ngOnInit(): void {
    this.showModal = true; // 👈 Modal will show automatically
  }

  closeModal(): void {
    this.showModal = false;

  }
  
}
