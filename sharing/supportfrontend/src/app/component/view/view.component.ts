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

  openModal(issueId: string) {
    this.loadHistory(issueId);
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.history = []; // reset on close
  }

  loadHistory(issueId: string) {
  const apiUrl = `https://localhost:44321/api/values`;

  this.http.get<any[]>(apiUrl).subscribe(data => {
    const issue = data.find(x => x.issues_id === issueId);
    if (issue) {
      this.history = [
        { date: issue.LogTime, status: issue.StatusName, username: issue.Name },
        // optionally more steps from issue object if present
      ];
    } else {
      console.warn('Issue not found');
    }
  }, error => {
    console.error('Error fetching from API:', error);
  });}
}
