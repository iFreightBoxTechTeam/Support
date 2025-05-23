import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-logs',
  templateUrl: './status-logs.component.html',
  styleUrls: ['./status-logs.component.css']
})
export class StatusLogsComponent implements OnInit {

  // 🔧 This is what the error is about — 'logs' is missing
  logs: any[] = []; // Or use proper interface: StatusLog[]

  constructor() {}

  ngOnInit(): void {
    // You can fetch the logs from your API here
    // this.logs = fetchedLogs;
  }
}
