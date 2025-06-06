import { Component } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {

  statusTypes = [
    { id: 101, type: 'Open' },
    { id: 102, type: 'Work in Progress' },
    { id: 103, type: 'Pending' }
  ];

  newStatusType: string = '';
  nextId = 104;

  addStatusBtn(): void {
    console.log('User typed:', this.newStatusType);
     
    if (this.newStatusType.trim()) {
      this.statusTypes.push({ id: this.nextId++, type: this.newStatusType.trim() });
      this.newStatusType = '';
    } else {
      alert('Please enter an Status type.');
    }
  }

  deleteStatus(id: number): void {
    this.statusTypes = this.statusTypes.filter(item => item.id !== id);
  }

  editStatus(id: number): void {
    const existing = this.statusTypes.find(i => i.id === id);
    if (existing) {
      const updated = prompt('Edit Status Type:', existing.type);
      if (updated !== null && updated.trim() !== '') {
        existing.type = updated.trim();
      }
    }
  }
}
