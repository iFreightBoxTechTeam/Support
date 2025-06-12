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

  ngOnInit(): void {
    this.showModal = false;
  }

  openModal(issueId: number) {
    this.loadHistory(issueId);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.history = []; 
  }

  loadHistory(issueId: number) {
  const apiUrl = `https://localhost:44321/api/values/view/{issues_id}`;

  this.http.get<any[]>(apiUrl).subscribe(data => {
    const issue = data.find(x => x.issues_id === issueId);
    if (issue) {
      
      this.history = [
        { date: issue.Raised_date, status: issue.statusname, username: issue.name },
        console.log("API Response:", data)
        // optionally more steps from issue object if present
      ];
    } else {
      console.warn('Issue not found');
    }
  }, error => {
    console.error('Error fetching from API:', error);
  });}
}
