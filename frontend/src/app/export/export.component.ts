import { Component } from '@angular/core';
import { ExportService } from '../export.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

  constructor(private exportService: ExportService) {}

  // Method to call the service and download the Excel file
  downloadExcel() {
    this.exportService.exportExcel().subscribe((data: Blob) => {
      // Create a temporary link element
      const a = document.createElement('a');
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      
      // Set download attribute to specify the file name
      a.href = url;
      a.download = 'MatableExport.xlsx';
      
      // Programmatically trigger the download
      a.click();
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    });
  }
}
