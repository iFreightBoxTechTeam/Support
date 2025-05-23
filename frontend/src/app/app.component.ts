import { Component } from '@angular/core';
import { MatableService } from './services/matable.service'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matable-client';
  constructor(private matableService: MatableService) {}  // Inject the service

  // Method to download the Excel file
   downloadExcel() {
    this.matableService.exportExcel().subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'SampleData.xlsx';
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}