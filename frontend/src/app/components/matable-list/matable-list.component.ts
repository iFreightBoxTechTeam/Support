import { Component, OnInit } from '@angular/core';
import { AssignDev } from 'src/app/models/assign-dev.model';
import { AssignDevService } from 'src/app/services/assign-dev.service';
import { Matable, MatableService } from 'src/app/services/matable.service';
import { IssueType, IssueTypeService } from 'src/app/services/issue-type.service';

@Component({
  selector: 'app-matable-list',
  templateUrl: './matable-list.component.html',
  styleUrls: ['./matable-list.component.css']
})
export class MatableListComponent implements OnInit {
  matables: Matable[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  imageUrl: string |null =null;
  isComponentVisible = false; 
   // Initially the form is hidden
   assignDevs: AssignDev[] = [];
   issueTypes: IssueType[] = [];
   


  // Modal-related properties
  isEditModalVisible = false;
  selectedMatable: Matable | null = null;
  totalRecords: any;

  constructor(
  private matableService: MatableService,
  private issueTypeService: IssueTypeService ,
  private assignDevService: AssignDevService
) {}

  ngOnInit(): void {
    
    this.loadData();
    this.assignDevService.getAll().subscribe({
  next: (devs) => {
    this.assignDevs = devs;
    console.log('Developers loaded:', this.assignDevs);
  },
  error: (err) => {
    console.error('Error loading developers:', err);
  }
});
this.issueTypeService.getAll().subscribe({
      next: (issues) => {
        this.issueTypes = issues;
      },
      error: (err) => console.error('Error loading issue types:', err)
    });

  this.matableService.searchTerm$.subscribe((term: string) => {
    console.log('Received search term:', term); // ✅ debug point
    this.currentPage = 1;
    this.loadMatables(term);
  });

  // initial load



  }
  loadMatables(term: string = this.searchTerm): void {
    this.searchTerm = term;  // ✅ update local searchTerm

    this.matableService.getMatables(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.matables = response.data;
        this.totalRecords = response.totalCount;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      },
      error: (error) => {
        console.error('Failed to load matables:', error);
      }
    });
  }
  // Toggle the visibility of the form component
  showComponent() {
    this.isComponentVisible = !this.isComponentVisible;
  }

  // Form submission handler
  onFormSubmitted() {
    this.isComponentVisible = false;
    this.loadData();
    
  }
  // Load data from the API
loadData() {
  this.matableService.getMatables(this.currentPage, this.pageSize, this.searchTerm)
    .subscribe({
      next: (response) => {
        this.matables = response.data;          // Use capital D for Data
        this.totalRecords = response.totalCount; // Use proper property name
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      },
      error: (error) => {
        console.error('Error loading matables:', error);
      }
    });
}


 // Initially, the form is visible
    onImageSelected(url: string | null) {
    this.imageUrl = url;
  }
  

  // Delete a matable
  deleteMatable(userId: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.matableService.deleteMatable(userId).subscribe(
        () => {
          console.log('Matable deleted successfully');
          this.loadData();
        },
        (error) => console.error('Error deleting matable:', error)
      );
    }
  }
  printMatableData: Matable | null = null;

onPrintMatable(userId: number): void {
  this.matableService.GetMatableByCustomerId(userId).subscribe({
    next: (matable) => {
      this.printMatableData = matable;

      // Wait for Angular to render the DOM
      setTimeout(() => {
        this.printContentById("obv_Print_Pick_Slip");
      }, 100);
    },
    error: (err) => console.error('Error fetching matable:', err)
  });
}
printContentById(elementId: string): void {
  const contentElement = document.getElementById(elementId);
  if (!contentElement) return;

  const printHtml = `
    <style>
      @media print {
        body { zoom: 90%; }
        @page { size: A4; margin: 0.635cm; }
      }
      body { font-family: Arial, sans-serif; padding: 20px; }
      img { max-width: 100px; margin: 5px; }
    </style>
    <html>
      <head><title>Print</title></head>
      <body>${contentElement.innerHTML}</body>
    </html>`;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(printHtml);
  doc.close();

  iframe.onload = () => {
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 300);
  };
}





  // Search handler
onSearch(term: string) {
  this.searchTerm = term;
  this.currentPage = 1;
  this.loadData();  // This fetches filtered data from the API and sets it to this.matables
}

  // Pagination
  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData();
    }
  }

  // Modal controls and update logic

  // Open the edit modal and populate with clicked matable data
  openEditModal(matable: Matable) {
    this.selectedMatable = { ...matable }; // clone to avoid direct mutation
    this.isEditModalVisible = true;
  }

  // Close the modal and reset
  closeEditModal() {
    this.isEditModalVisible = false;
    this.selectedMatable = null;
  }

  // Save updated matable info
 saveChanges() {
  if (!this.selectedMatable) return;

  // Prepare payload according to API spec
  const updatePayload = {
    ...this.selectedMatable,
    issue_type_id: this.selectedMatable.IssueTypeId,  // rename if needed
  };

  
}

}
