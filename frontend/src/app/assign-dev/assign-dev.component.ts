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
  // devs:any=[];
  newDev: AssignDev = { Id: 0, DevName: '' };
  selectedDev: AssignDev | null = null;

  constructor(private devService: AssignDevService) {}

  ngOnInit(): void {
    this.loadDevs();
    
  }

  loadDevs() {
    this.devService.getAll().subscribe((data )=> {
      this.devs = data
      console.log(this.devs,data)
    })
  
    // )}
    // ;
  }

  addDev() {
    this.devService.create(this.newDev).subscribe(() => {
      this.newDev = { Id: 0, DevName: '' };
      this.loadDevs();
    });
  }

  editDev(dev: AssignDev) {
    this.selectedDev = { ...dev };
  }

  updateDev() {
    if (!this.selectedDev) return;
    this.devService.update(this.selectedDev.Id, this.selectedDev).subscribe(() => {
      this.selectedDev = null;
      this.loadDevs();
    });
  }

  deleteDev(id: number) {
    this.devService.delete(id).subscribe(() => this.loadDevs());
  }
}
