import { Component, OnInit } from '@angular/core';
import { Matable, MatableService } from 'src/app/services/matable.service';

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
  isComponentVisible = false;  // Initially the form is hidden

  // Modal-related properties
  isEditModalVisible = false;
  selectedMatable: Matable | null = null;
  totalRecords: any;

  constructor(private matableService: MatableService) {}

  ngOnInit(): void {
    this.loadData();
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

  console.log('UserId:', this.selectedMatable.UserId);
   // Debug UserId

  if (!this.selectedMatable.UserId) {
    console.error('UserId is missing!');
    return;
  }

  this.matableService.updateMatable(this.selectedMatable.UserId, this.selectedMatable).subscribe(
    () => {
      console.log('Matable updated successfully');
      this.loadData();
      this.closeEditModal();
    },
    error => {
      console.error('Error updating matable:', error);
    }
  );
}

}
