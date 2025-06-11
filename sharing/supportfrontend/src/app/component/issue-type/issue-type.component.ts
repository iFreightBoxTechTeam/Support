import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
<<<<<<< Updated upstream
  constructor(private router: Router, private issueTypeService: IssueTypeService,private http: HttpClient) {}
=======
  constructor(private router: Router, private issueTypeService: IssueTypeService, private cd: ChangeDetectorRef) {}

>>>>>>> Stashed changes

  @ViewChild(AddIssueComponent) addIssue!: AddIssueComponent;
selectedIssueId: number | null = null;
Issue:any[]=[];


  newIssueType: string = '';
  nextId = 11;

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

issueTypes: Issue[] = [];

ngOnInit(): void {
  console.log('ngOnInit triggered');
  this.loadIssueTypes();
}

// loadIssueTypes(): void {
//   this.issueTypeService.getIssueTypes().
//   subscribe({

<<<<<<< Updated upstream
//     next: (data) => {
//       console.log('API data:', data); 
//       this.issueTypes = data.map(item => ({
//         id: item.id,
//         issue_type: item.issue_type 
        
//       }));
//     },
    
//     error: (err) => {
//       console.error('Failed to load issue types:', err);
//     }
//   });}
  loadIssueTypes() {

  const apiUrl ='https://localhost:44321/api/issuetype';

  this.http.get<any[]>(apiUrl).subscribe(data => {
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
=======
    next: (data) => {
  console.log('Raw API Response:', data);
  console.log('Total Pages:', this.totalPages);
  this.issueTypes = data.map(item => ({
    id: item.id,
    issue_type: item.issue_type 
  }));
  console.log('Mapped Issues:', this.issueTypes);
},
     
    error: (err) => {
      console.error('Failed to load issue types:', err);
>>>>>>> Stashed changes
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

//   get paginatedIssues(): Issue[] {
//   const start = (this.currentPage - 1) * this.itemsPerPage;
//   return this.filteredIssues.slice(start, start + this.itemsPerPage);
// }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addIssueBtn(): void {
    if (this.newIssueType.trim()) {
      this.issueTypes.push({ id: this.nextId++, issue_type: this.newIssueType.trim() });
      this.newIssueType = '';
      this.currentPage = this.totalPages;
    } else {
      alert('Please enter an issue type.');
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
    this.issueTypes = this.issueTypes.filter(issue => issue.id !== id);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  editIssue(id: number): void {
    const issue = this.issueTypes.find(i => i.id === id);
    if (issue) {
      const updatedType = prompt('Edit Issue Type:', issue.issue_type);
      if (updatedType !== null && updatedType.trim() !== '') {
        issue.issue_type = updatedType.trim();
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

