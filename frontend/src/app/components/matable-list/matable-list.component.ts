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
        this.matables = response.data;
        this.totalRecords = response.totalCount;
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

  // setTimeout(() => {
  //       var divElements = document.getElementById("obv_Print_Pick_Slip");
  //       var $iframe: any = $("<iframe id='frame1'>").appendTo("body");
  //       var printDiv =
  //         "<style type='text/css' media='print'>body {zoom: 90%;} @page { size: A4;  margin: 0.635cm; }</style><html ><head><title></title></head><body>" +
  //         divElements.innerHTML +
  //         "</body></html>";
  //       var win = $iframe[0].contentWindow || $iframe[0];
  //       $(win.document).ready(function () {
  //         setTimeout(() => {
  //           win.window.print();
  //           setTimeout(() => {
  //             $iframe.remove();
  //           }, 1000);
  //         });
  //       });
  //       $iframe.contents().find("body").html(printDiv);
  //       Helpers.setLoading(false);
  //     }, 300);}
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
