import { Component, ViewChild } from '@angular/core';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Issue, IssueTypeService} from '..//..//issue-type.service';




@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent {
  constructor(private router: Router, private issueTypeService: IssueTypeService,private http: HttpClient) {}

  @ViewChild(AddIssueComponent) addIssue!: AddIssueComponent;
selectedIssueId: number | null = null;
Issue:any[]=[];
 apiUrl ='https://localhost:44321/api/issuetype';

  newIssueType: string = '';
  nextId = 11;

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

issueTypes: Issue[] = [];

ngOnInit(): void {
  this.loadIssueTypes();
}


  loadIssueTypes() {

  

  this.http.get<any[]>(this.apiUrl).subscribe(data => {
    // const issue = data.find(x => x.UserId === UserId);
    console.log('issue',  data)
    if (data) {
      this.Issue = data
        // { date: data.Raised_date, status: data.statusname, username: data.name }
        // You had a stray `console.log()` inside the array — move it outside
      ;
      console.log("API Response:", data);
    } else {
      console.warn('Issue not found');
    }
  }, error => {
    console.error('Error fetching from API:', error);
  });
}

get filteredIssues(): Issue[] {
  return this.issueTypes;
}

  get totalPages(): number {
    return Math.ceil(this.filteredIssues.length / this.itemsPerPage);
  }

  get Issues(): Issue[] {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredIssues.slice(start, start + this.itemsPerPage);
}

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onIssueAdded(issue: Omit<Issue, 'id'>) {
    if (issue.issue_type.trim()) {
      this.issueTypes.push({
        id: this.nextId++,
        ...issue,
      });
      this.currentPage = this.totalPages;
    }
  }

  deleteIssue(id: number): void {
  

  if (confirm('Are you sure you want to delete this issue?')) {
    this.http.delete(this.apiUrl).subscribe({
      next: () => {
        this.Issue = this.Issue.filter(issue => issue.Id !== id);
        console.log('Issue deleted successfully.');
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages || 1;
        }
      },
      error: (err) => {
        console.error('Error deleting issue:', err);
        alert('Failed to delete issue.');
      }
    });
  }
  
}


 editIssue(id: number): void {
  const issue = this.Issue.find(i => i.Id === id);
  if (issue) {
    const updatedType = prompt('Edit Issue Type:', issue.Issue_Type);
    if (updatedType !== null && updatedType.trim() !== '') {
      const apiUrl = `https://localhost:44321/api/issuetype/${id}`;
      const updatedData = { Issue_Type: updatedType.trim() };

      this.http.put(apiUrl, updatedData).subscribe({
        next: () => {
          issue.Issue_Type = updatedType.trim(); // update locally too
          console.log('Issue updated successfully.');
        },
        error: (err) => {
          console.error('Error updating issue:', err);
          alert('Failed to update issue.');
        }
      });
    }
  }
}


  openAddIssueModal() {
    this.addIssue.openModal();
  }

  // 🔍 This method handles search term emitted by app-nav-main
  onSearchChange(term: string) {
    this.searchTerm = term;
    this.currentPage = 1;
  }

    openIssueModal(issueId: number) {
    this.selectedIssueId = issueId;
  }
  
}

