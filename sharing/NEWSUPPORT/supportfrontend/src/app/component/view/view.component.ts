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

  openModal(UserId: number) {
    this.loadHistory(UserId);
    console.log("Fetching history for user ID:", UserId);

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.history = []; 
  }
loadHistory(UserId: number) {

  const apiUrl = `https://localhost:44321/api/values/view/${UserId}`;

  this.http.get<any[]>(apiUrl).subscribe(data => {
    // const issue = data.find(x => x.UserId === UserId);
    console.log('issue',  data)
    if (data) {
      this.history = data
        // { date: data.Raised_date, status: data.statusname, username: data.name }
        // You had a stray `console.log()` inside the array — move it outside
      ;
      console.log("API Response:", data);
    } else {
      console.warn('Issue not found');
    }
  }, error => {
    console.error('Error fetching from API:', error);
  });
}

}