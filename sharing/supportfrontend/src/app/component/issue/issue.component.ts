import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,ElementRef,Input,OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueService } from 'src/app/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input() issueId!: number | string;

  overallStatus: string = 'Open';
  description: string = 'This is a hardcoded issue with pre-defined images.';
  assignTo: string = '';
  Status: string = 'Open';
  apiUrl: any;
   

  users: string[] = ['Vijay', 'Shreya', 'Riddhi'];
  selectedImageUrl: string | null = null;

  imageCounter: number = 0;
  showIssueModal: boolean = false;
  @ViewChild('issueModal') issueModal!: ElementRef;

  images: Array<{
    id: string;
    url: string;
    file: File | null;
    assignTo: string;
    status: string;
    overallStatus: string;
  }> = [
    {
      id: 'IMG-001',
      url: 'https://via.placeholder.com/150',
      file: null,
      assignTo: 'Vijaya',
      status: 'Open',
      overallStatus: 'Open'
    },
    {
      id: 'IMG-002',
      url: 'https://via.placeholder.com/160',
      file: null,
      assignTo: 'Shreya',
      status: 'In Progress',
      overallStatus: 'Open'
    },
    {
      id: 'IMG-003',
      url: 'https://via.placeholder.com/170',
      file: null,
      assignTo: 'Riddhi',
      status: 'Resolved',
      overallStatus: 'Open'
    }
  ];
issue: any;
constructor(private issueService: IssueService,private http: HttpClient) {}
private issueData: any; 
 ngOnInit() {
  this.issue = this.issueService.getIssue() || {}; 


 if (!this.issue || Object.keys(this.issue).length === 0) {
    console.error("Error: Issue is not set correctly in issue.component.ts");
  }

  console.log("Loaded Issue in issue.component.ts:", this.issue);
}
setIssue(issue: any) {
  if (!issue) {
    console.error("Error: Trying to set an undefined issue.");
    return;
  }
  this.issueData = issue;
  console.log("Issue stored in components:", this.issueData);
}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageCounter++; 
          const newImage = {
            id: `IMG-${this.imageCounter.toString().padStart(3, '0')}`,
            url: e.target.result,
            file,
            assignTo: '',
            status: 'Open',
            overallStatus: this.overallStatus
          };
          this.images.push(newImage);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
  }
 updateIssue(userId: number, issueData: any) {
  this.issueService.updateIssue(userId, issueData).subscribe(
    (response) => {
      console.log('Issue updated successfully:', response);
    },
    (error) => {
      console.error('Error updating issue:', error);
    }
  );
  
}

  openImageModal(url: string): void {
    this.selectedImageUrl = url;
  }

  closeImageModal(): void {
    this.selectedImageUrl = null;
  }

  saveIssue(): void {
  if (!this.issueId) {
    console.error("Error: issueId is missing");
    return;
  }

  const issueData = {
    StatusName: this.overallStatus,
    AssignTo: this.assignTo,
    ImagePaths: this.images.map(img => img.url)
  };

  console.log("Updating Issue:", this.issueId, issueData); 

  this.issueService.updateIssue(this.issueId as number, issueData).subscribe(
    response => {
      console.log("Issue updated:", response);
    },
    error => console.error("Error updating issue:", error)
  );
}


getIssue() {
  console.log("Fetching issue from service:", this.issueService.getIssue());
return this.issueService.getIssue() || null;
}
//   editIssue(issueId: number): void {
//   this.issueId = issueId;
// }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

    openIssueModal(UserId: any) {
    // this.loadHistory(UserId);
    console.log("Fetching history for user ID:", UserId);

    this.showIssueModal = true;
  }

  closeIssueModal(): void {
    this.showIssueModal = false;
    // this.history = []; 
  }

}
