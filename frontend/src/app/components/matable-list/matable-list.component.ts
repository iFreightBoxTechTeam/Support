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

  constructor(private matableService: MatableService) {}

  ngOnInit(): void {
    this.loadData();
  }

  
  // Method to toggle the visibility of the component
  showComponent() {
    this.isComponentVisible = !this.isComponentVisible;
  }

  // Method to handle form submission
  onFormSubmitted() {
    this.isComponentVisible = false;  // Hide the form after submission
    this.loadData();  // Refresh the data list
  }
  

  loadData() {
    this.matableService.getMatables(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe((data: Matable[]) => {
        this.matables = data;
      });
  }
   deleteMatable(userId: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.matableService.deleteMatable(userId).subscribe(
        () => {
          console.log('Matable deleted successfully');
          // Reload the data after deleting
          this.loadData();
        },
        (error) => console.error('Error deleting matable:', error)
      );
    }
  }

  // Method to update matable (you can trigger this on an "Edit" button, for example)
  updateMatable(userId: number, updatedMatable: Matable): void {
  console.log('Updating matable:', updatedMatable); // Log the data being sent
  this.matableService.updateMatable(userId, updatedMatable).subscribe(
    () => {
      console.log('Matable updated successfully');
      this.loadData();
    },
    (error) => console.error('Error updating matable:', error)
  );
}

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
    this.loadData();
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData();
    }
  }
}


