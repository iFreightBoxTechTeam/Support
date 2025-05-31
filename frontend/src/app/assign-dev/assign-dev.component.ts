import { Component, OnInit } from '@angular/core';
import { AssignDev } from '../models/assign-dev.model';
import { AssignDevService } from '../services/assign-dev.service';

@Component({
  selector: 'app-assign-dev',
  templateUrl: './assign-dev.component.html',
  styleUrls: ['./assign-dev.component.css']
})
export class AssignDevComponent implements OnInit {
  devs: AssignDev[] = [];
  newDev: AssignDev = { id: 0, devName: '' };
  selectedDev: AssignDev | null = null;

  constructor(private devService: AssignDevService) {}

  ngOnInit(): void {
    this.loadDevs();
  }

  loadDevs() {
    this.devService.getAll().subscribe(data => this.devs = data);
  }

  addDev() {
    this.devService.create(this.newDev).subscribe(() => {
      this.newDev = { id: 0, devName: '' };
      this.loadDevs();
    });
  }

  editDev(dev: AssignDev) {
    this.selectedDev = { ...dev };
  }

  updateDev() {
    if (!this.selectedDev) return;
    this.devService.update(this.selectedDev.id, this.selectedDev).subscribe(() => {
      this.selectedDev = null;
      this.loadDevs();
    });
  }

  deleteDev(id: number) {
    this.devService.delete(id).subscribe(() => this.loadDevs());
  }
}
