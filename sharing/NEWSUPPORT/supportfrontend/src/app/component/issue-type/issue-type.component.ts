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

import { AddIssueComponent } from './add-issue/add-issue.component';
import { Issue, IssueTypeService } from 'src/app/issue-type.service';

@Component({
  selector: 'app-issue-type',
  templateUrl: 'issue-type.component.html',
  styleUrls: ['./issue-type.component.css']
})
export class IssueTypeComponent implements OnInit {
  isEditModalVisible = false;
  
  showDeleteModal: boolean = false;
  issueToDelete: Issue | null = null;

  editIssueData: Issue = { issuesid: 0, Issue_Type: '' };

    @ViewChild('addIssueComponent') addIssue!: AddIssueComponent;

  issueTypes: Issue[] = [];
  newIssueType: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  confirm_delete:boolean = false;
  id_to_delete:any;

  constructor(private issueService: IssueTypeService) {}


  // close modal
  closeEditModal() {
    this.isEditModalVisible = false;
  }

  // on submit modal form
  submitEdit() {
    if (!this.editIssueData.Issue_Type.trim()) {
      alert('Issue Type is required');
      return;
    }

    this.issueService.updateIssue(this.editIssueData).subscribe({
      next: () => {
        // update local array
        const index = this.issueTypes.findIndex(i => i.issuesid === this.editIssueData.issuesid);
        if (index > -1) {
          this.issueTypes[index] = { ...this.editIssueData };
        }
        this.closeEditModal();
      },
      error: err => {
        console.error('Update failed', err);
        alert('Failed to update issue');
      }
    });
  }


  ngOnInit(): void {
    this.loadIssueTypes();
  }

  loadIssueTypes(): void {
    this.issueService.getAllIssues().subscribe({
      next: (data) => {
        console.log("zsdb jvlf",data)
        this.issueTypes = data;
      },
      error: (err) => {
        console.error('Error loading issues:', err);
      }
    });
  }

  get filteredIssueTypes(): Issue[] {
    if (!this.searchTerm.trim()) return this.issueTypes;
    return this.issueTypes.filter(issue =>
      issue.Issue_Type.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  openAddIssueModal(): void {
    this.addIssue.openModal();
  }

  addIssueBtn(): void {
    const trimmed = this.newIssueType.trim();
    if (trimmed) {
      const newIssue: Issue = { issuesid: 0, Issue_Type: trimmed }; // id = 0 for backend to assign
      this.issueService.addIssue(newIssue).subscribe({
        next: (created) => {
          this.issueTypes.push(created);
          this.newIssueType = '';
          this.currentPage = this.totalPages;
        },
        error: (err) => {
          console.error('Error adding issue:', err);
        }
      });
    } else {
      alert('Please enter an Issue type.');
    }
  }

  // onIssueAdded(issue: Issue): void {
  //   // this.issueTypes.push(issue);
  //   this.issueTypes = [...this.issueTypes, issue];
  //   this.currentPage = this.totalPages;
  // }
onIssueAdded(issue: Issue) {
  console.log('Received new issue:', issue);

  this.issueTypes = [...this.issueTypes, issue];
    this.loadIssueTypes(); // Important: use spread!
}
  onIssueUpdated(updatedIssue: Issue): void {
    const index = this.issueTypes.findIndex(i => i.issuesid === updatedIssue.issuesid);
    this.loadIssueTypes();
   if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
      
      this.issueTypes[index] = updatedIssue;
      
       
    }
  }

  deleteIssue(issue:Issue): void {
    console.log('skdvb kszjv b', issue.issuesid);
    if (!confirm('Are you sure you want to delete this issues?')) return;
      this.issueService.deleteIssue(issue.issuesid).subscribe({
        next: () => {
          this.issueTypes = this.issueTypes.filter(issue => issue.issuesid !== issue.issuesid);
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages || 1;
            
            this.loadIssueTypes();
          }
        },
        error: (err) => {
          console.error('Error deleting issue:', err);
          alert('Failed to delete issue.');
        }
      });
      
    
  }

  editIssue(issue: Issue): void {
  this.addIssue.openModal(issue); // Pass the issue to modal for editing
}


  undo_delete(){
    this.confirm_delete = false;

  }

 issue_type_deleted() {
  this.confirm_delete = false;

  this.issueService.deleteIssue(this.id_to_delete).subscribe({
    next: () => {
      this.issueTypes = this.issueTypes.filter(issue => issue.issuesid !== this.id_to_delete);
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


  deleteIssueType(id: number): void {
    // if (confirm('Are you sure you want to delete this user?')) {
    //   this.userService.deleteUser(id).subscribe(() => {
    //     this.fetchUsers()
    //   });
    // }
    this.confirm_delete = true;
    this.id_to_delete = id;
  }

}

  // editIssue(issue: Issue): void {
 

  //   const newName =  this.addIssue.openModal(issue); ;
  //   if (newName && newName.trim()) {
  //     const updatedIssue: Issue = { ...issue, Issue_Type: newName.trim() };
  //     this.issueService.updateIssue(updatedIssue).subscribe({
  //       next: () => {
  //         issue.Issue_Type = updatedIssue.Issue_Type;
  //       },
  //       error: (err) => {
  //         console.error('Error updating issue:', err);
  //         alert('Failed to update issue.');
  //       }
  //     });
  //       this.editIssueData = { ...issue };
    
  //   }
  // }


