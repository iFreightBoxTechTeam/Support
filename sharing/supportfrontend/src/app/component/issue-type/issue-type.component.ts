// import { Component, ViewChild } from '@angular/core';
// import { AddIssueComponent } from './add-issue/add-issue.component';
// import { Router } from '@angular/router';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Issue, IssueTypeService} from '..//..//issue-type.service';

// interface Issue_Type {
//   id: number;
//   issue_type: string;
// }


// @Component({
//   selector: 'app-issue-type',
//   templateUrl: './issue-type.component.html',
//   styleUrls: ['./issue-type.component.css']
// })
// export class IssueTypeComponent {
//   constructor(private router: Router, private issueTypeService: IssueTypeService,private http: HttpClient) {}

//   @ViewChild(AddIssueComponent) addIssue!: AddIssueComponent;
// selectedIssueId: number | null = null;
// Issue:any[]=[];
//  apiUrl ='https://localhost:44321/api/issuetype';

//   newIssueType: string = '';
//   nextId = 11;

//   searchTerm: string = '';
//   currentPage: number = 1;
//   itemsPerPage: number = 5;

// issueTypes: Issue_Type[] = [];

// ngOnInit(): void {
//   this.loadIssueTypes();
// }

// loadIssueTypes() {
//     this.http.get<any[]>(this.apiUrl).subscribe(data => {
//       console.log('issue', data);
//       if (data) {
//         this.Issue = data;
//         console.log("API Response:", data);
//       } else {
//         console.warn('Issue not found');
//       }
//     }, error => {
//       console.error('Error fetching from API:', error);
//     });
//   }

//   loadIssueTypes() {

  

//   this.http.get<any[]>(this.apiUrl).subscribe(data => {
//     // const issue = data.find(x => x.UserId === UserId);
//     console.log('issue',  data)
//     if (data) {
//       this.Issue = data
//         // { date: data.Raised_date, status: data.statusname, username: data.name }
//         // You had a stray `console.log()` inside the array — move it outside
//       ;
//       console.log("API Response:", data);
//     } else {
//       console.warn('Issue not found');
//     }
//   }, error => {
//     console.error('Error fetching from API:', error);
//   });
// }

// get filteredIssues(): Issue_Type[] {
//     if (!this.searchTerm.trim()) return this.issueTypes;
//     return this.issueTypes.filter(issue =>
//       issue.issue_type.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
// }

//   get totalPages(): number {
//     return Math.ceil(this.filteredIssues.length / this.itemsPerPage);
//   }

//   get paginatedIssueTypes(): Issue_Type[] {
//     const start = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredIssues.slice(start, start + this.itemsPerPage);
//   }

//   changePage(page: number): void {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//     }
//   }

//   onIssueAdded(issue: Omit<Issue_Type, 'id'>) {
//     if (issue.issue_type.trim()) {
//       this.issueTypes.push({
//         id: this.nextId++,
//         ...issue,
//       });
//       this.currentPage = this.totalPages;
//     }
//   }

//   onIssueUpdated(updatedIssue: Issue_Type) {
//     const index = this.issueTypes.findIndex(i => i.id === updatedIssue.id);
//     if (index > -1) {
//       this.issueTypes[index] = updatedIssue;
//     }
//   }

//   deleteIssue(id: number): void {
  
// this.http.delete(`https://localhost:44321/api/issuetype/${id}`)
//   .subscribe({
//     next: () => console.log('Deleted'),
//     error: err => console.error('Error deleting issue:', err)
//   });

//   if (confirm('Are you sure you want to delete this issue?')) {
//     this.http.delete(`https://localhost:44321/api/issuetype/${id}`).subscribe({
//       next: () => {
//         this.Issue = this.Issue.filter(issue => issue.Id !== id);
//         console.log('Issue deleted successfully.');
//         if (this.currentPage > this.totalPages) {
//           this.currentPage = this.totalPages || 1;
//         }
//       },
//       error: (err) => {
//         console.error('Error deleting issue:', err);
//         alert('Failed to delete issue.');
//       }
//     });
//   }
  
// }


//  editIssue(id: number): void {
//   const issue = this.Issue.find(i => i.Id === id);
//   if (issue) {
//     const updatedType = prompt('Edit Issue Type:', issue.Issue_Type);
//     if (updatedType !== null && updatedType.trim() !== '') {
//       const apiUrl = `https://localhost:44321/api/issuetype/${id}`;
//       const updatedData = { Issue_Type: updatedType.trim() };

//       this.http.put(apiUrl, updatedData).subscribe({
//         next: () => {
//           issue.Issue_Type = updatedType.trim(); // update locally too
//           console.log('Issue updated successfully.');
//         },
//         error: (err) => {
//           console.error('Error updating issue:', err);
//           alert('Failed to update issue.');
//         }
//       });
//     }
//   }
// }


//   openAddIssueModal() {
//     this.addIssue.openModal();
//   }

  // 🔍 This method handles search term emitted by app-nav-main
//   onSearchChange(term: string) {
//     this.searchTerm = term;
//     this.currentPage = 1;
//   }

//     openIssueModal(issueId: number) {
//     this.selectedIssueId = issueId;
//   }
  
// }


import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { HttpClient } from '@angular/common/http';
import { Issue} from 'src/app/issue-type.service';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

    ngOnInit(): void {
      this.loadIssueTypes();
    }

  @ViewChild('addIssueComponent') addIssue!: AddIssueComponent;

    issueTypes: any[] = [];

    newIssueType: string = '';
    searchTerm: string = '';
    nextId = 115;

    currentPage: number = 1;
    itemsPerPage: number = 5;

loadIssueTypes() {

    const apiUrl ='https://localhost:44321/api/issuetype';

    this.http.get<any[]>(apiUrl).subscribe(data => {
      console.log('issue', data);
      if (data) {
        this.issueTypes = data;
        console.log("API Response:", data);
      } else {
        console.warn('Issue not found');
      }
    }, error => {
      console.error('Error fetching from API:', error);
    });
  }

  get filteredIssueTypes(): Issue[] {
      if (!this.searchTerm.trim()) return this.issueTypes;
      return this.issueTypes.filter(issue =>
        issue.issue_type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredIssueTypes.length / this.itemsPerPage);
  }

  get paginatedIssueTypes(): Issue[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredIssueTypes.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openAddIssueModal() {
    this.addIssue.openModal();
  }

  addIssueBtn(): void {
    if (this.newIssueType.trim()) {
      this.issueTypes.push({ id: this.nextId++, status_name: this.newIssueType.trim() });
      this.newIssueType = '';
      this.currentPage = this.totalPages;
    } else {
      alert('Please enter a Issue type.');
    }
  }

  onIssueAdded(issue: Issue) {
    console.log('New issue added:', issue);
    this.issueTypes.push(issue);
    console.log('Updated statusTypes:', this.issueTypes);
    this.currentPage = this.totalPages;
  }

  onIssueUpdated(updatedIssue: Issue) {
    const index = this.issueTypes.findIndex(i => i.id === updatedIssue.id);
    if (index > -1) {
      this.issueTypes[index] = updatedIssue;
    }
  }

  deleteIssue(id: number) {
  if (confirm('Are you sure you want to delete this issue?')) return;

    this.http.delete(`https://localhost:44321/api/issuetype/${id}`).subscribe({
      next: () => {
        this.issueTypes = this.issueTypes.filter(i => i.id !== id);
        console.log('Issue deleted successfully.');
      },
      error: (error) => {
        console.error('Failed to delete:', error);
      }
    });
  } 
  
  editIssue(issue: Issue) {
    this.addIssue.openModal(issue);
  }
  
}
