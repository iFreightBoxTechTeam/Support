import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  showModal: boolean = false;
  @ViewChild('myModal') modal!: ElementRef;

  history = [
    { date: new Date('2025-06-01'), status: 'Open', username: 'Vijaya' },
    { date: new Date('2025-06-02'), status: 'In Progress', username: 'Shreya' },
    { date: new Date('2025-06-03'), status: 'Resolved', username: 'Riddhi' }
  ];

  ngOnInit(): void {
    this.showModal = false; // 👈 Modal will show automatically
  }

  openModal(){
    // this.history = historyData;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
