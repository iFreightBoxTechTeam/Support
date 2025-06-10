import { Component, OnInit, ViewChild } from '@angular/core';

import { ViewComponent } from '../component/view/view.component';
import { IssueService,} from '../issue.service';


@Component({
  selector: 'app-issuse',
  templateUrl: './issuse.component.html',
  styleUrls: ['./issuse.component.css']
})
export class IssuseComponent implements OnInit {
  issues: any[] = [];
  filteredIssues: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  @ViewChild(ViewComponent) ViewComponent!: ViewComponent;


  constructor(private issueService: IssueService) {}

  ngOnInit() {
    this.loadIssues();
  }

  loadIssues() {
    this.issueService.getIssues(this.searchTerm, this.currentPage, this.itemsPerPage).subscribe(data => {
      this.issues = data;
      this.filteredIssues = data;
      console.log("API Response:", data);

      // Assuming API always returns full list with pagination handled manually.
      this.totalPages = Math.ceil(this.filteredIssues.length / this.itemsPerPage);
    }); 
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
    this.loadIssues(); // Load data with search filter applied from API
  }

  get paginatedIssues() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredIssues.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadIssues(); // Load next page
    }
  }

  editIssue(id: number) {
    console.log('Edit issue', id);
  }

  deleteIssue(id: number) {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.issues = this.issues.filter(issue => issue.id !== id);
      this.filteredIssues = this.filteredIssues.filter(issue => issue.id !== id);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
      }
    }
  }
viewLog(id: string) {
  console.log('View log for issue', id);
  this.ViewComponent.openModal(id);  // 👈 pass issueId
}

}
