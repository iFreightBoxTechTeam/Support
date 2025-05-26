import { Component, OnInit } from '@angular/core';
import { StatusLogService } from 'src/app/services/status-log.service';


export interface StatusLog {
  id: string;
  statusId: string;
  statusName: string;
  matableId: string;
  matableName: string;
  logTime: string;
}

@Component({
  selector: 'app-status-logs',
  templateUrl: './status-logs.component.html',
  styleUrls: ['./status-logs.component.css']
})
export class StatusLogsComponent implements OnInit {
  logs: StatusLog[] = [];

  constructor(private statusLogService: StatusLogService) {}

  ngOnInit(): void {
    this.statusLogService.getStatusLogs().subscribe({
      next: (data: any[]) => {
        // Convert PascalCase keys from the API to camelCase for consistency
        this.logs = data.map(log => ({
          id: log.Id,
          statusId: log.StatusId,
          statusName: log.StatusName,
          matableId: log.MatableId,
          matableName: log.MatableName,
          logTime: log.LogTime
        }));

        console.log('Logs loaded:', this.logs); // Debug check
      },
      error: (err) => {
        console.error('Error fetching status logs:', err);
      }
    });
  }
  
  
}
