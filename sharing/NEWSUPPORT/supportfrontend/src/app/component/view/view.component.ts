import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  showModal: boolean = false;
  history: any[] = [];
  @ViewChild('myModal') modal!: ElementRef;

  constructor(private http: HttpClient) {}
selectedIssue: any = null;


  ngOnInit(): void {
    this.showModal = false;
    
  }

openModal(userId: number, issue: any) {
  this.selectedIssue = issue;       //  Store the issue
  this.loadHistory(userId);         // Fetch the history
  this.showModal = true;
}


  closeModal(): void {
    this.showModal = false;
    this.history = []; 
  }

  
loadHistory(UserId: number) {
  const apiUrl = `https://localhost:44321/api/values/view/${UserId}`;

  this.http.get<any[]>(apiUrl).subscribe(data => {
    if (Array.isArray(data)) {
      this.history = data.map(entry => ({
        ...entry,
        user: this.selectedIssue?.Name || 'Unknown'
      }));
    } else {
      console.warn('Unexpected history format:', data);
      this.history = [];
    }
  }, error => {
    console.error('Error fetching history:', error);
    this.history = [];
  });
}





}