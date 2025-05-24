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
  totalPages: number = 1;
  isComponentVisible = false;  // Initially the form is hidden

  // Modal-related properties
  isEditModalVisible = false;
  selectedMatable: Matable | null = null;

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
      .subscribe((data: Matable[]) => {
        this.matables = data;
      });
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
